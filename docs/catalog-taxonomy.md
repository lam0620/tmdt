# Cây danh mục sản phẩm & nguồn dữ liệu — Đạt Hiển

Tài liệu này giải thích **cách tổ chức danh mục sản phẩm trên site**, **hai nguồn dữ liệu**, và **vì sao tách "Chất chuẩn (CRM)" thành danh mục riêng**. Đây là tài liệu quyết định (design decision) cho cả mockup lẫn khi import Odoo.

> Liên quan: [odoo-import-mapping.md](odoo-import-mapping.md) (mapping field → Odoo 19), [`tools/convert_catalog.py`](../tools/convert_catalog.py) (script hiện thực).

---

## 1. Hai nguồn dữ liệu

| File | Vai trò | Nội dung |
|---|---|---|
| `requirements/DanhMuc_DatHien_ThuongmaiDientu.xlsx` | **Master cấu trúc** | 155 dòng. Chủ yếu **Thiết bị nguyên chiếc (144)** + vài dòng tóm tắt Hóa chất (7) / Tiêu hao (4). Cột: Danh Mục · Hãng SX · Hãng Thiết bị · Ngành hàng/Loại · Dòng thiết bị · Model · Mã hàng gốc · Mã hàng bán · Mô Tả · Tiêu chuẩn |
| `requirements/D038 - EMAL - Parts by Instrument Feed_*.xlsx` | **Feed vật tư/hóa chất chi tiết** | ~15.287 dòng (EMAL = Elemental Microanalysis). Vật tư **tương thích (aftermarket)** cho máy phân tích, có SKU + mã OEM. Cột: Instrument Type · Instrument Name · Manufacturer(OEM) · Category · OEM Part · Part Number · Part Description |

**Hai file BỔ SUNG nhau, khác độ chi tiết:**
- **Thiết bị** ← DanhMuc (máy nguyên chiếc, B2B/RFQ).
- **Hóa chất + CRM + Tiêu hao** ← D038 (chi tiết, có mã, B2C). *(4 dòng Tiêu hao + 7 dòng Hóa chất trong DanhMuc chỉ là tóm tắt → được thay bằng dữ liệu thật từ D038.)*

---

## 2. Cây 4 danh mục lớn

```
Thiết bị            (B2B · RFQ)        ← DanhMuc
Hóa chất            (B2C · reagent)    ← D038: Chemical Reagents, Pure Chemical Standards
Chất chuẩn (CRM)    (B2C · CRM)        ← D038: *Reference Materials*, Synthetic Soil Standards
Tiêu hao            (B2C · parts)      ← D038: O-ring, Quartz/Glassware, Crucibles, Cones, capsules…
```

Số lượng thực tế trong feed D038 (~ trước khi lấy mẫu cho mockup):
- **Hóa chất**: Chemical Reagents ~3.036 + Pure Chemical Standards ~681 ≈ **3.717**
- **Chất chuẩn (CRM)**: Inorganic 1.172 + Natural 1.081 + Isotope 245 + Reference Materials 195 + Synthetic Soil 141 ≈ **2.834**
- **Tiêu hao**: phần còn lại (O-ring & phụ kiện ~4.014, Quartz/Glassware ~1.291, Crucibles/Boats, Cones, capsules…)

---

## 3. Vì sao TÁCH "Chất chuẩn (CRM)" riêng, không gộp vào "Hóa chất"

1. **Khác bản chất sản phẩm.**
   - *Hóa chất (reagent)* = dùng để **vận hành** máy, tiêu hao rồi mua lại (vd Magnesium Perchlorate hút ẩm, soda lime hấp thụ CO₂).
   - *CRM (vật liệu tham chiếu chứng nhận)* = dùng để **hiệu chuẩn / kiểm soát chất lượng**; khách chọn theo **nền mẫu · giá trị chứng nhận · độ không đảm bảo (uncertainty)**, thường giá trị cao. Đây là lớp sản phẩm hoàn toàn khác về cách mua và tra cứu.
2. **Theo chuẩn ngành.** alpharesources (đối chuẩn) tách "Reference Materials / Certified Reference Materials" thành danh mục top riêng, ngoài "Instrument Consumables".
3. **Quy mô đủ lớn** (~2.834 dòng) để đứng thành danh mục độc lập, giúp lọc/tìm gọn.

→ Nếu muốn nav gọn 3 mục, phương án thay thế: để **CRM là danh mục con của "Hóa chất"** (vẫn phân biệt khi lọc). Hiện chọn **tách hẳn (4 danh mục)**.

---

## 4. Quy tắc phân loại: cột `Category` (D038) → danh mục site

Hiện thực trong `tools/convert_catalog.py` (`site_category()`):

| `Category` trong D038 | → Danh mục site |
|---|---|
| `Chemical Reagents`, `Pure Chemical Standards` | **Hóa chất** |
| `Inorganic Reference Materials`, `Natural Reference Materials`, `Isotope Reference Materials`, `Reference Materials`, `Synthetic Soil Standards` | **Chất chuẩn (CRM)** |
| *(tất cả còn lại)* | **Tiêu hao** |

> Cột `Category` chi tiết (vd "Chemical Reagents", "Cones", "Crucibles and Boats") trở thành **danh mục con / dòng hàng** bên trong danh mục lớn tương ứng. Các giá trị có tiền tố `~` là danh mục con của "Sample Encapsulation" (đã strip khi xử lý).

---

## 5. Cách duyệt (navigation) từng danh mục

Vì bản chất khác nhau, trục duyệt cũng khác:

| Danh mục | Rail (cấp 1) | Cấp 2 | Ghi chú |
|---|---|---|---|
| **Thiết bị** | **Hãng sản xuất** (JULABO, AMETEK…) | Ngành hàng / Dòng thiết bị | máy do chính hãng làm |
| **Hóa chất / CRM / Tiêu hao** | **Hãng thiết bị (OEM)** (ELTRA, LECO…) | Loại vật tư (Category) | vật tư *tương thích* máy OEM; nhà cung cấp thật (EMAL) là chiều khác |

- **Facet lọc**: Danh mục · Hãng sản xuất (máy) · **Hãng thiết bị (OEM)** · Dòng máy tương thích · Tiêu chuẩn — tách bạch, không trùng.
- **Tìm kiếm**: khớp cả **SKU (Part Number)** và **OEM Part** + tên/hãng/model.
- Chi tiết mô hình OEM vs Vendor: xem [odoo-import-mapping.md §3.3](odoo-import-mapping.md).

---

## 6. Hiện thực & phạm vi

- Script [`tools/convert_catalog.py`](../tools/convert_catalog.py) đọc **cả 2 Excel** → sinh `mockups/assets/catalog.js` (`window.CATALOG`), tự phân loại theo §4.
- **Mockup lấy mẫu** cho nhẹ (giới hạn OEM/sản phẩm mỗi danh mục — xem hằng số `OEM_CAP`, `PROD_PER_OEM`, `PROD_PER_LINE` trong script). **Production bỏ cap, nạp full 15k** + chuyển search sang server/DB (Odoo) có index trên SKU/OEM Part + phân trang.
- Chạy lại script mỗi khi feed cập nhật.

---

## 7. Điểm cần xác nhận / mở rộng

- **Nhà cung cấp thật (vendor)**: feed không có cột vendor (EMAL là hãng làm vật tư). Bổ sung khi cần chạy mua hàng/kho trên Odoo.
- **Ảnh sản phẩm**: mới có ở sheet mẫu "Agilent" (host `d-h.com.vn`); 15k part cần kế hoạch ảnh (phần lớn dùng ảnh theo loại nếu chưa có ảnh riêng).
- **Giá B2C**: feed chưa có giá; cần bảng giá để bật mua trực tiếp cho Hóa chất/CRM/Tiêu hao.
