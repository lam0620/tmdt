# Đưa dữ liệu sản phẩm vào Odoo — Mapping & Hướng dẫn import

Tài liệu này mô tả cách nạp dữ liệu danh mục Đạt Hiển (đang dùng ở mockup, nguồn `mockups/assets/catalog.js` + file Excel `requirements/DanhMuc_DatHien_ThuongmaiDientu.xlsx`) vào **Odoo** (eCommerce / Inventory). Target: **Odoo 19 Community** (`website_sale` + `stock`).

> **Lưu ý Odoo 18/19 (quan trọng):** field `type` **không còn giá trị `'product'`**. Hàng lưu kho = `type='consu'` **+** `is_storable=True`. `type` chỉ còn `'consu'` (hàng hóa) và `'service'` (dịch vụ). Tài liệu này đã dùng quy ước 19; nếu chạy 16/17 thì thay bằng `type='product'`.

---

## 1. Mô hình dữ liệu Odoo liên quan

| Model Odoo | Vai trò |
|---|---|
| `product.template` | Sản phẩm (mẫu) — bản ghi chính |
| `product.product` | Biến thể (variant) sinh từ thuộc tính |
| `product.category` | Danh mục nội bộ (kế toán/kho) — **bắt buộc** |
| `product.public.category` | Danh mục website (hiển thị/điều hướng trên eShop) |
| `product.attribute` / `product.attribute.value` / `product.template.attribute.line` | Thuộc tính & biến thể (vd "Phiên bản": VP/VPS/VPL Vision) |
| `product.tag` | Tag sản phẩm (dùng cho **Tiêu chuẩn**, **OEM tương thích**…) |
| `res.partner` | Đối tác — dùng cho **Hãng SX / nhà cung cấp** (vendor) |
| `product.supplierinfo` | Thông tin nhà cung cấp (giá mua, **mã vendor/OEM**) |
| `product.packaging` | Quy cách đóng gói (tùy chọn cho `pack`) |

> Odoo mặc định **không có** trường "Manufacturer" và "OEM tương thích" trên sản phẩm. Cần **tạo trường tùy biến** (Studio hoặc module nhỏ) — xem §5.

---

## 2. Bảng mapping field

Dữ liệu nguồn (theo `flatProducts()` trong mockup + cột Excel) → Odoo:

| Field nguồn | Ý nghĩa | Odoo `model.field` | Kiểu / Ghi chú |
|---|---|---|---|
| `category` (Thiết bị / Hóa chất / Tiêu hao) | Nhóm chính | `product.template.categ_id` **+** `public_categ_ids` | Internal categ (bắt buộc) + Website categ |
| `line` (Chemical Reagents, Áp suất hơi…) | Phân nhóm/ngành hàng | `product.public.category` (con của `category`) | Danh mục website cấp 2 |
| `title` / `model` | Tên sản phẩm | `product.template.name` | Char, bắt buộc |
| `desc` / `name` | Mô tả | `description_sale` (ngắn) / mô tả website | Field website: `website_description` (v14–16) hoặc `description_ecommerce` (bản mới) — kiểm tra theo version |
| `sku` (Part Number, vd `B1316`) | Mã nội bộ | `product.template.default_code` | **Internal Reference**, nên là duy nhất |
| `oemPart` (vd `90200`) | Mã phụ tùng OEM | `product.supplierinfo.product_code` **hoặc** `x_oem_part` | Xem §5 |
| `manufacturer` (Hãng SX, vd ELEMENTAL MICROANALYSIS) | Nhà cung cấp/sản xuất | `res.partner` (vendor) qua `product.supplierinfo.partner_id`; hoặc `product.brand` | |
| `deviceBrand` / OEM (vd ELTRA) | Hãng thiết bị **tương thích** | `x_oem_brand` (custom) **hoặc** `product_tag_ids` | m2m/tag khuyến nghị |
| `instrumentType` (Carbon Sulphur) | Loại máy | `x_instrument_type` (custom) hoặc tag | |
| `instrumentName` (CHS580) | Model máy tương thích | `x_instrument_model` (custom, Char) hoặc tag | |
| `pack` (454 g, hộp 1000…) | Quy cách | `x_pack` (custom Char) hoặc `product.packaging` | |
| `standards` (ASTM D5191…) | Tiêu chuẩn tuân thủ | `product_tag_ids` (`product.tag`) | m2m |
| `variant` (VP/VPS/VPL/VPXpert Vision) | Phiên bản | `product.attribute` + `attribute_line_ids` | Sinh `product.product` |
| Giá (nếu có) | Giá bán | `list_price` | B2C có giá; B2B để `0` + RFQ |
| Loại khách (B2B/B2C) | Luồng mua | `sale_ok`, `is_published`, `x_is_rfq` (custom) | Xem §4 |
| Ảnh sản phẩm | Ảnh | `image_1920` | base64 |
| Loại lưu kho | — | `type='consu'` + `is_storable` (bool) | **Odoo 19:** hàng lưu kho = `type='consu'` + `is_storable=True`; dịch vụ = `type='service'`. Thiết bị/Hóa chất/Tiêu hao đều là hàng vật lý — **KHÔNG dùng `service`** |
| Đơn vị tính | — | `uom_id`, `uom_po_id` | `uom.uom` |

> ⚠️ **Cảnh báo ngữ nghĩa cột "Manufacturer" trong Excel.** Trong file nguồn, cột *Manufacturer* (vd `ELTRA®`) thường là **OEM/hãng thiết bị mà vật tư tương thích** → map vào **`x_oem_brand`** (compat), **KHÔNG** phải nhà cung cấp bạn nhập hàng. **Vendor thật** (vd ELEMENTAL MICROANALYSIS — người bán/sản xuất vật tư) là thực thể riêng → map vào `res.partner` + `product.supplierinfo`. Xác nhận rõ ngữ nghĩa từng cột trước khi import, vì map nhầm vendor ↔ OEM sẽ sai toàn bộ.

---

## 3. Xử lý quan hệ & External ID

Khi import bằng file, **quan hệ (Many2one/Many2many) nên dùng External ID** (cột `<field>/id`) để idempotent và tránh trùng tên.

### 3.1 Danh mục
- `category` → tạo trước 3 `product.category` (Thiết bị, Hóa chất, Tiêu hao) và `product.public.category` tương ứng.
- `line` → `product.public.category` con, `parent_id` = category cha.
- Cột import: `categ_id/id`, `public_categ_ids/id` (m2m: nhiều external id cách nhau bởi dấu `,` trong 1 ô).

### 3.2 Tiêu chuẩn & OEM tương thích → Tag hay Attribute?
- **Tag (`product.tag`)** — nhanh, gắn nhãn, `product_tag_ids/id` (external id phân tách bởi `,`). Nhưng **khả năng lọc theo tag trên eShop khác nhau tùy phiên bản** — đừng coi tag là facet mặc định.
- **Facet lọc chuẩn của Odoo eShop là `product.attribute`.** Để lọc theo **Tiêu chuẩn / OEM / Model máy** ở cột filter website, nên tạo `product.attribute` với `create_variant='no_variant'` (không sinh biến thể), gán value cho sản phẩm — Odoo hiển thị nhóm filter tự động. Danh mục (`product.public.category`) và giá là 2 facet còn lại.
- **Khuyến nghị:** dùng **attribute (no_variant)** cho các trục cần *lọc*; dùng **tag** cho nhãn phụ; custom field `x_*` (§5) khi cần *tìm kiếm/hiển thị* (SKU, OEM Part, model máy).

### 3.3 OEM (hãng thiết bị) vs Vendor (nhà cung cấp) — KHÔNG nhầm

Đây là hai thực thể khác nhau, dù đôi khi trùng tên:

| | `x_oem_brand` — Hãng thiết bị (OEM) | Vendor — `res.partner` + `product.supplierinfo` |
|---|---|---|
| Bản chất | **Nhãn phân loại**: vật tư *tương thích với máy hãng nào* | **Đối tác kinh doanh**: nơi Đạt Hiển *thực sự mua hàng* |
| Dùng cho | Duyệt / lọc / tìm kiếm web | Mua hàng (PO), giá nhập, công nợ, nhập kho |
| Có giao dịch | Không | Có (Purchase + Accounting) |
| Nguồn dữ liệu | **cột "Manufacturer"** (ELTRA®…) | Thông tin mua hàng riêng (chưa có trong Excel) |
| Ví dụ vật tư ELTRA | `ELTRA` | ELEMENTAL MICROANALYSIS *hoặc* ELTRA (nếu mua trực tiếp) |
| Ví dụ thiết bị GRABNER | `AMETEK GRABNER` | AMETEK GRABNER (trùng tên, vẫn là bản ghi khác vai trò) |

- **`x_oem_brand`**: luôn lấy từ cột *Manufacturer*. (Tùy chọn: thêm `product.attribute` "Hãng thiết bị" để làm facet lọc — §3.2.)
- **Vendor**: **không bắt buộc** để web chạy — phục vụ mua hàng/kho. Tạo `res.partner` (is_company=true, supplier_rank≥1) cho NCC thật, liên kết qua `product.supplierinfo` (`partner_id`, `product_tmpl_id`, `product_code` = `oemPart`, `price`, `min_qty`); import ở **pass riêng** (§6), link qua `default_code`. Chưa có dữ liệu NCC thì để trống, bổ sung sau. **Tuyệt đối không nhét OEM vào ô vendor.**

### 3.4 Biến thể (variant)
Ví dụ dòng MINIVAP Vision có phiên bản VP / VPS / VPL / VPXpert:
1. `product.attribute`: `name = "Phiên bản"`, `create_variant = "always"`, `display_type = "radio"`.
2. `product.attribute.value`: VP Vision, VPS Vision, VPL Vision, VPXpert Vision (`attribute_id` = Phiên bản).
3. `product.template.attribute.line`: `product_tmpl_id`, `attribute_id`, `value_ids` (m2m các value).
4. Odoo tự sinh `product.product` cho mỗi tổ hợp; đặt `default_code`/giá riêng cho từng biến thể nếu cần.

> Import variant qua CSV khá rối; nếu nhiều → nên tạo bằng **API** (§7) hoặc nhập attribute line thủ công cho vài dòng chủ lực.

---

## 4. B2B (RFQ) vs B2C (mua trực tiếp)

| Nhóm | Hành vi website | Cấu hình Odoo |
|---|---|---|
| **Thiết bị** (B2B) | Nút "Contact us / Yêu cầu báo giá" thay Add-to-cart | `sale_ok = true`, `list_price = 0`, cờ `x_is_rfq = true`. **Cách native:** bật Website → *"Prevent Sale of Zero Priced Products"* (`website.prevent_zero_price_sale`) → Odoo tự đổi Add-to-cart thành nút "Contact us" cho sản phẩm giá 0 |
| **Hóa chất / Tiêu hao** (B2C) | Add to cart + thanh toán | `is_published = true`, `list_price` > 0, `type='consu'` + `is_storable=True`, quản lý tồn kho |

Gợi ý: thêm 1 boolean `x_is_rfq` để template website hiển thị đúng CTA (map trực tiếp từ `category === 'Thiết bị'`). Với B2B có thể để website hiện "Báo giá theo yêu cầu" thay cho giá.

---

## 5. Trường tùy biến cần tạo

Tạo bằng **Odoo Studio** hoặc module nhỏ. Thêm vào `product.template`:

| Field | Kiểu | Label |
|---|---|---|
| `x_oem_brand` | Many2one (`product.tag`) hoặc Char | Hãng thiết bị tương thích |
| `x_instrument_type` | Char / Selection | Loại máy |
| `x_instrument_model` | Char | Model máy tương thích |
| `x_oem_part` | Char | Mã phụ tùng OEM |
| `x_pack` | Char | Quy cách |
| `x_is_rfq` | Boolean | Chỉ yêu cầu báo giá (B2B) |

Ví dụ module (`__manifest__.py` + model):

```python
# models/product_template.py
from odoo import fields, models

class ProductTemplate(models.Model):
    _inherit = "product.template"

    x_oem_brand = fields.Char(string="Hãng thiết bị tương thích", index=True)
    x_instrument_type = fields.Char(string="Loại máy")
    x_instrument_model = fields.Char(string="Model máy tương thích", index=True)
    x_oem_part = fields.Char(string="Mã phụ tùng OEM", index=True)
    x_pack = fields.Char(string="Quy cách")
    x_is_rfq = fields.Boolean(string="Chỉ yêu cầu báo giá (B2B)")
```

> Đánh `index=True` cho `x_oem_part`, `x_instrument_model` để **tìm kiếm theo mã OEM / model máy** nhanh (tương ứng chức năng search-by-SKU/OEM ở mockup).

---

## 6. Import bằng giao diện (CSV/XLSX)

Thứ tự import (mỗi bước 1 file):

1. **Danh mục nội bộ** — `product.category` (cột: `id`, `name`, `parent_id/id`).
2. **Danh mục website** — `product.public.category` (`id`, `name`, `parent_id/id`).
3. **Tag** — `product.tag` (`id`, `name`) cho tiêu chuẩn + OEM + model máy.
4. **Nhà cung cấp** — `res.partner` (`id`, `name`, `is_company`, `supplier_rank`).
5. **Sản phẩm** — `product.template` (file chính, xem template cột dưới).
6. **Thông tin NCC** — `product.supplierinfo` (`product_tmpl_id/id`, `partner_id/id`, `product_code`, `price`).
7. **(Tùy) Biến thể** — attribute line hoặc dùng API.

**Cột file `product.template` (header import):**

```
id, name, default_code, categ_id/id, public_categ_ids/id, product_tag_ids/id,
type, is_storable, sale_ok, is_published, list_price, uom_id/id, uom_po_id/id,
description_sale, x_oem_brand, x_instrument_type, x_instrument_model, x_oem_part, x_pack, x_is_rfq
```

**Ví dụ 3 dòng vật tư ELTRA CHS580** (từ dữ liệu thực tế):

```csv
id,name,default_code,categ_id/id,public_categ_ids/id,product_tag_ids/id,type,is_storable,sale_ok,is_published,list_price,x_oem_brand,x_instrument_type,x_instrument_model,x_oem_part,x_pack,x_is_rfq
dh.p_b1161,EMADrone Magnesium Perchlorate 501-171 454g,B1161,dh.categ_tieuhao,dh.pcat_chem_reagents,"dh.tag_eltra,dh.tag_chs580",consu,1,1,1,0,ELTRA,Carbon Sulphur,CHS580,90200,454 g,0
dh.p_b1316,EMASORB II A Granular 20-30 mesh CO2 Absorbant 500g,B1316,dh.categ_tieuhao,dh.pcat_chem_reagents,"dh.tag_eltra,dh.tag_chs580",consu,1,1,1,0,ELTRA,Carbon Sulphur,CHS580,,500 g,0
dh.p_b1317,EMASORB II B Granular 8-20 mesh CO2 Absorbant 500g,B1317,dh.categ_tieuhao,dh.pcat_chem_reagents,"dh.tag_eltra,dh.tag_chs580",consu,1,1,1,0,ELTRA,Carbon Sulphur,CHS580,90210,500 g,0
```

Sau đó file `product.supplierinfo`:

```csv
product_tmpl_id/id,partner_id/id,product_code,product_name,price,min_qty
dh.p_b1161,dh.vendor_ema,90200,EMADrone Magnesium Perchlorate 501-171,0,1
dh.p_b1316,dh.vendor_ema,,EMASORB II A 500g,0,1
dh.p_b1317,dh.vendor_ema,90210,EMASORB II B 500g,0,1
```

---

## 7. Import qua API (XML-RPC)

Phù hợp khi dữ liệu lớn / cần đồng bộ định kỳ từ `catalog.js` hoặc Excel.

```python
import xmlrpc.client

URL, DB, USER, PWD = "https://odoo.example.com", "dathien", "admin", "***"
common = xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/common")
uid = common.authenticate(DB, USER, PWD, {})
models = xmlrpc.client.ServerProxy(f"{URL}/xmlrpc/2/object")

def call(model, method, *args):
    return models.execute_kw(DB, uid, PWD, model, method, *args)

# 1) đảm bảo tag tồn tại (trả về id)
def ensure_tag(name):
    ids = call("product.tag", "search", [[["name", "=", name]]])
    return ids[0] if ids else call("product.tag", "create", [{"name": name}])

# 2) tạo product.template
def upsert_product(p):
    tag_ids = [ensure_tag(t) for t in (p.get("standards") or [])]
    if p.get("deviceBrand"):    tag_ids.append(ensure_tag(p["deviceBrand"]))
    if p.get("instrumentName"): tag_ids.append(ensure_tag(p["instrumentName"]))
    vals = {
        "name": p["title"],
        "default_code": p.get("sku") or False,
        "type": "consu",        # Odoo 19: hàng hóa; KHÔNG dùng 'service' cho thiết bị
        "is_storable": True,    # lưu kho (Odoo 19 thay cho type='product' cũ). RFQ = giá 0 + x_is_rfq
        "sale_ok": True,
        "is_published": True,
        "list_price": p.get("price", 0.0),
        "x_oem_brand": p.get("deviceBrand") or False,
        "x_instrument_type": p.get("instrumentType") or False,
        "x_instrument_model": p.get("instrumentName") or False,
        "x_oem_part": p.get("oemPart") or False,
        "x_pack": p.get("pack") or False,
        "x_is_rfq": p["category"] == "Thiết bị",
        "product_tag_ids": [(6, 0, tag_ids)],
        # "categ_id": <id>, "public_categ_ids": [(6,0,[...])],
    }
    existing = call("product.template", "search",
                    [[["default_code", "=", vals["default_code"]]]]) if vals["default_code"] else []
    if existing:
        call("product.template", "write", [existing, vals]); return existing[0]
    return call("product.template", "create", [vals])
```

> Có thể dùng thư viện `odoorpc` cho gọn, hoặc method `load()` để import hàng loạt kèm external id (idempotent). Với biến thể: tạo `product.attribute` + `product.template.attribute.line` (dùng lệnh `(6,0,[value_ids])`).

---

## 8. Ánh xạ cấu trúc phân cấp (catalog.js → Odoo)

```
category            → product.category (nội bộ) + product.public.category (website, cấp 1)
  manufacturer      → res.partner (vendor) + product.supplierinfo
    line            → product.public.category (website, cấp 2, con của category)
      product       → product.template
        deviceBrand → tag / x_oem_brand
        variant     → product.attribute.value (attribute "Phiên bản")
```

- **Thiết bị / Hóa chất**: rail nav = Hãng SX → dùng `manufacturer` để nhóm; `line` = ngành hàng.
- **Tiêu hao**: hiển thị theo Hãng SX ▸ **OEM tương thích** (`x_oem_brand`/tag) — dữ liệu vẫn ánh xạ như trên, chỉ khác cách **hiển thị/lọc** (facet theo tag OEM + model máy).

---

## 9. Khuyến nghị & lưu ý

1. **`default_code` (SKU) là khóa idempotent** khi re-import — luôn set và giữ duy nhất.
2. **Tìm kiếm theo SKU / OEM Part / model máy**: đánh `index=True` các trường custom + bật full-text nếu cần; đây là hành vi quan trọng nhất cho khách mua vật tư.
3. **B2B để giá 0 + `x_is_rfq`**, đừng publish giá; template website hiện "Báo giá theo yêu cầu".
4. **Ảnh**: nếu dùng ảnh thật của hãng, cần bản quyền/được phép — ảnh trong mockup chỉ là stock placeholder.
5. **UoM & quy cách**: nếu quy cách chỉ là nhãn (454 g/hộp 1000) → dùng `x_pack` (Char) cho đơn giản; nếu cần tính tồn theo gói → dùng `product.packaging` hoặc UoM riêng.
6. **Biến thể vs sản phẩm rời**: chỉ tạo variant khi cùng template khác cấu hình (VP/VPS/VPL). Vật tư khác OEM/mã → nên là **template riêng** (mỗi SKU 1 sản phẩm), không phải variant.
7. **Kiểm thử trên DB staging** trước khi import production; import theo đúng thứ tự phụ thuộc ở §6.

---

*Tài liệu phục vụ giai đoạn tích hợp; field custom (`x_*`) cần được tạo trước khi import (Studio/module).*
