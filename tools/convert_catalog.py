#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Chuyển 2 file Excel danh mục Đạt Hiển -> mockups/assets/catalog.js (window.CATALOG).
- Thiết bị: GIỮ NGUYÊN từ catalog.js hiện tại (đã tinh chỉnh, giàu hơn Excel).
- Hóa chất / Chất chuẩn (CRM) / Tiêu hao: sinh từ D038 EMAL (Parts by Instrument), có LẤY MẪU cho nhẹ.
Cấu trúc: categories[ {name, manufacturers[ {name(OEM), deviceBrand, lines[ {name(Category), products[]} ], count} ], count} ]
Chạy lại mỗi khi feed cập nhật.
"""
import openpyxl, json, re, os
from collections import defaultdict

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REQ  = os.path.join(BASE, "requirements")
OUT  = os.path.join(BASE, "mockups", "assets", "catalog.js")
D038 = os.path.join(REQ, "D038 - EMAL - Parts by Instrument Feed_3062026.xlsx")

# ---- caps để mockup nhẹ (production bỏ cap, nạp full) ----
OEM_CAP       = 8    # số OEM tối đa / danh mục
PROD_PER_OEM  = 10   # sản phẩm tối đa / OEM
PROD_PER_LINE = 5    # sản phẩm tối đa / (OEM, Category)

CHEM_CATS = {"Chemical Reagents", "Pure Chemical Standards"}
CRM_CATS  = {"Inorganic Reference Materials", "Natural Reference Materials",
             "Isotope Reference Materials", "Reference Materials", "Synthetic Soil Standards"}

def site_category(cat):
    if cat in CHEM_CATS: return "Hóa chất"
    if cat in CRM_CATS:  return "Chất chuẩn (CRM)"
    return "Tiêu hao"

def clean_oem(s):
    return (s or "").strip().replace("®", "").strip()

def extract_pack(desc):
    m = re.search(r'(\d[\d.,]*\s?(?:kg|g|mg|ml|l|mm|mesh|pcs|pack|box)\b)', desc or "", re.I)
    return m.group(1).strip() if m else ""

# ---------- 1. giữ Thiết bị từ catalog.js hiện tại ----------
cur = open(OUT, encoding="utf-8").read()
cur_json = cur[cur.find("{"): cur.rfind("}") + 1]
equip = [c for c in json.loads(cur_json)["categories"] if c["name"] == "Thiết bị"]

# ---------- 2. đọc D038, gom cây: site_cat -> OEM -> Category(line) -> [products] ----------
wb = openpyxl.load_workbook(D038, read_only=True, data_only=True)
ws = wb["EMAL - All Parts by Instrument"]

tree = defaultdict(lambda: defaultdict(lambda: defaultdict(list)))  # sc -> oem -> line -> products
per_oem = defaultdict(lambda: defaultdict(int))                     # (sc,oem) -> count

hdr = None
for r in ws.iter_rows(values_only=True):
    if hdr is None:
        if any(c not in (None, "") for c in r): hdr = r
        continue
    if not any(c not in (None, "") for c in r): continue
    g = lambda i: (str(r[i]).strip() if i < len(r) and r[i] not in (None, "") else "")
    itype, iname, man, cat, oempart, pn, desc = g(0), g(1), g(2), g(3), g(4), g(5), g(6)
    oem = clean_oem(man)
    if oem.lower() == "all": oem = "Đa hãng (All)"
    if not oem or not desc: continue
    sc = site_category(cat)
    if per_oem[sc][oem] >= PROD_PER_OEM: continue
    line = (cat or "Khác").lstrip("~").strip() or "Khác"
    if len(tree[sc][oem][line]) >= PROD_PER_LINE: continue
    tree[sc][oem][line].append({
        "model": desc, "name": desc, "deviceLine": iname, "standards": [],
        "sku": pn, "oemPart": oempart, "instrumentType": itype,
        "instrumentName": iname, "deviceBrand": oem, "pack": extract_pack(desc),
    })
    per_oem[sc][oem] += 1

def build(sc):
    oem_map = tree.get(sc, {})
    oems = sorted(oem_map.items(), key=lambda kv: -sum(len(v) for v in kv[1].values()))[:OEM_CAP]
    mans, total = [], 0
    for oem, lines in oems:
        lns = [{"name": ln, "products": ps} for ln, ps in lines.items()]
        cnt = sum(len(ps) for ps in lines.values())
        mans.append({"name": oem, "deviceBrand": "", "lines": lns, "count": cnt})
        total += cnt
    return {"name": sc, "manufacturers": mans, "count": total}

consumable_cats = [build("Hóa chất"), build("Chất chuẩn (CRM)"), build("Tiêu hao")]
catalog = {"categories": equip + consumable_cats}

js = "window.CATALOG = " + json.dumps(catalog, ensure_ascii=False, indent=1) + ";\n"
open(OUT, "w", encoding="utf-8").write(js)

# ---------- report ----------
for c in catalog["categories"]:
    print(f"  {c['name']}: {c['count']} sp / {len(c['manufacturers'])} hãng")
print("  -> wrote", OUT, f"({os.path.getsize(OUT)//1024} KB)")
