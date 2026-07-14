# Tài liệu Tầm nhìn Dự án (Project Vision)

**Dự án:** Nền tảng Thương mại điện tử Đạt Hiển
**Phiên bản:** 0.1 (Bản nháp)
**Ngày:** 2026-07-13
**Trạng thái:** Đang xây dựng — chờ xác nhận các mục đánh dấu 🔶

---

## 1. Bối cảnh (Context)

Đạt Hiển (Đạt Hiển Co.) hiện là **nhà nhập khẩu và phân phối thiết bị khoa học, thiết bị phân tích và vật tư phòng thí nghiệm** tại thị trường Việt Nam. Công ty đại diện cho **hơn 25 thương hiệu quốc tế** (AMETEK Grabner, XOS, RTEC, Elvatech, Vero Scientific, Steroglass, v.v.), phục vụ các phòng thí nghiệm kiểm định và nghiên cứu (QC/R&D) trong các lĩnh vực:

- Phân tích xăng dầu & dầu nhớt (độ nhớt, hàm lượng lưu huỳnh, điểm chớp cháy, áp suất hơi, chưng cất)
- Kiểm tra vật liệu (ma sát, mài mòn, bôi trơn)
- Phân tích nguyên tố (kim loại nặng, XRF, quang phổ)
- Đo tính chất vật lý (tỷ trọng, diện tích bề mặt, độ ẩm, phân tích nhiệt)
- Thiết bị phòng thí nghiệm chuyên dụng

Khách hàng hiện tại là các tổ chức/định chế mua thiết bị giá trị cao, tuân thủ các tiêu chuẩn quốc tế (ASTM, ISO, QCVN). Mô hình bán hàng hiện tại chủ yếu dựa trên **báo giá thủ công qua email/điện thoại và đội ngũ kinh doanh**.

Đạt Hiển đang xây dựng một **nền tảng thương mại điện tử hiện đại** để mở rộng kênh bán hàng, số hóa vận hành và củng cố vị thế thương hiệu, phục vụ đồng thời **khách hàng B2B và B2C**.

### Kiến trúc công nghệ định hướng
- **ERP backend:** Odoo 19 (nguồn dữ liệu lõi: sản phẩm, giá, tồn kho, đơn hàng, khách hàng)
- **Frontend:** Next.js 16
- **Backend-for-Frontend (BFF):** FastAPI
- **Phong cách thị giác:** lấy cảm hứng từ alpharesources.com (chuyên nghiệp, khoa học, sạch sẽ) — **KHÔNG sao chép**; sản phẩm cuối phải có bản sắc riêng của Đạt Hiển.

---

## 2. Tầm nhìn (Vision)

> Trở thành **nền tảng thương mại điện tử hàng đầu Việt Nam về thiết bị khoa học và giải pháp phân tích**, nơi mọi phòng thí nghiệm, doanh nghiệp và cá nhân đam mê khoa học đều có thể tìm kiếm, tin tưởng và mua sắm thiết bị — từ hệ thống phân tích chuyên sâu cho đến vật tư và bộ dụng cụ giáo dục — một cách minh bạch, thuận tiện và đáng tin cậy.

---

## 3. Sứ mệnh (Mission)

Đạt Hiển xây dựng nền tảng này nhằm:

1. **Dân chủ hóa việc tiếp cận thiết bị khoa học chất lượng cao** — đưa các thương hiệu quốc tế đến gần hơn với khách hàng Việt Nam, cho cả tổ chức lớn lẫn cá nhân/người dùng chuyên nghiệp nhỏ.
2. **Số hóa toàn bộ hành trình mua hàng** — từ khám phá sản phẩm, yêu cầu báo giá (B2B) đến mua trực tiếp (B2C), thay thế quy trình thủ công bằng trải nghiệm tự phục vụ.
3. **Hợp nhất vận hành trên nền Odoo 19** — một nguồn dữ liệu duy nhất cho sản phẩm, giá, tồn kho, đơn hàng và khách hàng.
4. **Khẳng định uy tín và chuyên môn kỹ thuật** của Đạt Hiển như một đối tác tư vấn đáng tin cậy, không chỉ là một nhà bán thiết bị.

---

## 4. Mục tiêu Kinh doanh (Business Goals)

Bốn động lực chiến lược của dự án (đã được xác nhận):

| # | Mục tiêu | Diễn giải |
|---|----------|-----------|
| **G1** | **Tăng trưởng doanh thu** | Mở kênh bán hàng trực tuyến mới, đặc biệt cho dòng B2C (vật tư/phụ kiện và dòng sản phẩm mới cho người tiêu dùng/prosumer). |
| **G2** | **Giảm chi phí & ma sát vận hành** | Thay thế quy trình báo giá thủ công qua email/điện thoại bằng luồng tự phục vụ (self-service ordering & quotation). |
| **G3** | **Xây dựng uy tín thương hiệu** | Diện mạo hiện đại, chuyên nghiệp, đủ sức cạnh tranh và tạo niềm tin ngang tầm các nhà cung cấp quốc tế. |
| **G4** | **Hợp nhất vận hành** | Kết nối chặt website với Odoo ERP để quản lý tồn kho, giá, đơn hàng và khách hàng trong một hệ thống duy nhất. |

---

## 5. Chỉ số Thành công (Success Metrics) 🔶 *Cần xác nhận*

*Đề xuất của cố vấn — cần Đạt Hiển xác nhận chỉ tiêu cụ thể và mốc thời gian.*

| Mục tiêu | Chỉ số đề xuất (KPI) | Mục tiêu tham chiếu 🔶 |
|----------|----------------------|------------------------|
| G1 — Doanh thu | % doanh thu đến từ kênh online; số đơn B2C/tháng; giá trị đơn trung bình (AOV) | *cần xác định* |
| G1 — B2C | Số SKU B2C được kích hoạt; tỷ lệ chuyển đổi (conversion rate) trang sản phẩm | *cần xác định* |
| G2 — Vận hành | Số yêu cầu báo giá (RFQ) tạo online; thời gian trung bình từ RFQ → báo giá; % đơn xử lý không cần can thiệp thủ công | *cần xác định* |
| G3 — Thương hiệu | Lưu lượng truy cập organic; thời gian trên trang; tỷ lệ khách quay lại | *cần xác định* |
| G4 — Hợp nhất | % dữ liệu sản phẩm/giá/tồn kho đồng bộ tự động từ Odoo; số điểm nhập liệu thủ công bị loại bỏ | *cần xác định* |

---

## 6. Khách hàng Mục tiêu (Target Customers)

### 6.1. Phân khúc B2B (cốt lõi hiện tại)
- **Phòng thí nghiệm kiểm định & nghiên cứu (QC/R&D)** trong xăng dầu, hóa chất, dược phẩm, thực phẩm, luyện kim.
- **Doanh nghiệp công nghiệp** cần thiết bị phân tích tuân thủ tiêu chuẩn (ASTM, ISO, QCVN).
- **Cơ sở giáo dục & viện nghiên cứu** (trường đại học, viện, trung tâm kỹ thuật).
- Đặc điểm: mua giá trị cao, chu kỳ quyết định dài, cần báo giá/tư vấn kỹ thuật, quan tâm chứng nhận & hậu mãi.

### 6.2. Phân khúc B2C (mở rộng mới)
- **Người mua vật tư/phụ kiện/phụ tùng thay thế** (reagent, dụng cụ thủy tinh, chuẩn hiệu chuẩn, linh kiện) — cá nhân hoặc đơn vị mua lẻ nhỏ.
- **Người tiêu dùng/prosumer** cho dòng sản phẩm mới: bộ dụng cụ giáo dục, thiết bị lab tại nhà/sở thích, thiết bị đo lường nhỏ gọn.
- Đặc điểm: mua ngay, giá trị đơn nhỏ hơn, kỳ vọng trải nghiệm mua sắm giống bán lẻ (checkout, thanh toán trực tuyến).

---

## 7. Phạm vi Kinh doanh (Business Scope)

Nền tảng sẽ hỗ trợ:

- **Danh mục sản phẩm hợp nhất** phục vụ cả B2B và B2C, đồng bộ từ Odoo 19.
- **Luồng B2B:** khám phá sản phẩm kỹ thuật, yêu cầu báo giá (RFQ), tài khoản doanh nghiệp, giá theo khách hàng/hợp đồng.
- **Luồng B2C:** giỏ hàng, thanh toán trực tuyến, mua trực tiếp vật tư/phụ kiện và dòng sản phẩm tiêu dùng mới.
- **Nội dung kỹ thuật & thương hiệu:** thông số, tài liệu, tiêu chuẩn tuân thủ, câu chuyện thương hiệu, trang thương hiệu đối tác.
- **Song ngữ:** Tiếng Việt (chính) và Tiếng Anh.
- **Tích hợp ERP:** đồng bộ sản phẩm, giá, tồn kho, đơn hàng, khách hàng với Odoo 19 làm nguồn dữ liệu lõi.
- **Kiến trúc:** Next.js 16 (frontend) ↔ FastAPI (BFF) ↔ Odoo 19 (ERP).

---

## 8. Ngoài Phạm vi (Out of Scope)

Ở giai đoạn tầm nhìn/khởi động, các hạng mục sau **chưa** thuộc phạm vi (sẽ xem xét ở roadmap tương lai):

- Bán hàng đa quốc gia / đa tiền tệ ngoài thị trường Việt Nam. 🔶
- Ứng dụng di động native (iOS/Android) — ưu tiên web responsive trước.
- Marketplace cho bên bán thứ ba (third-party sellers).
- Thay thế/triển khai lại các nghiệp vụ Odoo không liên quan đến thương mại điện tử (kế toán, nhân sự...).
- Tự phát triển hệ thống thanh toán/logistics riêng — sẽ tích hợp nhà cung cấp bên thứ ba.
- Sao chép giao diện/nội dung của alpharesources.com — chỉ dùng làm nguồn cảm hứng thị giác.

---

## 9. Định vị Thương hiệu (Brand Positioning)

> **Đạt Hiển — Đối tác khoa học đáng tin cậy của bạn.**

- **Chuyên gia, không chỉ là người bán:** định vị dựa trên chiều sâu kỹ thuật, tư vấn giải pháp và sự am hiểu tiêu chuẩn ngành.
- **Cầu nối quốc tế:** đại diện chính hãng cho các thương hiệu hàng đầu thế giới tại Việt Nam.
- **Hiện đại & minh bạch:** trải nghiệm số sạch sẽ, khoa học, đáng tin — tương phản với hình ảnh nhà phân phối truyền thống.
- **Bản sắc riêng:** kế thừa tinh thần chuyên nghiệp/khoa học từ nguồn cảm hứng thiết kế, nhưng mang nhận diện, ngôn ngữ và giá trị riêng của Đạt Hiển.

---

## 10. Tuyên bố Giá trị (Value Proposition)

**Cho khách hàng B2B:**
- Truy cập nhanh thông số kỹ thuật, tài liệu tuân thủ và tư vấn chuyên môn.
- Yêu cầu báo giá và theo dõi đơn hàng trực tuyến, giảm thời gian chờ.
- Đảm bảo hàng chính hãng, đúng tiêu chuẩn (ASTM/ISO/QCVN), có hậu mãi.

**Cho khách hàng B2C:**
- Mua vật tư, phụ kiện và thiết bị nhỏ trực tiếp, thuận tiện như bán lẻ hiện đại.
- Tiếp cận dòng sản phẩm mới (bộ giáo dục, thiết bị đo lường nhỏ) với niềm tin từ một nhà cung cấp chuyên nghiệp.

**Giá trị chung:** *"Từ phòng thí nghiệm chuyên sâu đến bàn học — thiết bị khoa học đáng tin cậy, chỉ trong vài cú nhấp."*

---

## 11. Rủi ro (Risks)

| # | Rủi ro | Mức độ | Giảm thiểu đề xuất |
|---|--------|--------|--------------------|
| R1 | **Xung đột mô hình B2B & B2C** — hai nhóm khách khác nhau về giá, luồng mua, kỳ vọng | Cao | Thiết kế phân luồng rõ ràng (giá/RFQ vs. checkout); phân quyền theo loại khách. |
| R2 | **Độ phức tạp tích hợp Odoo 19 ↔ FastAPI ↔ Next.js** — đồng bộ dữ liệu, hiệu năng | Cao | Xác định rõ Odoo là nguồn lõi; thiết kế hợp đồng API/BFF chặt; test đồng bộ sớm. |
| R3 | **Dòng B2C là lĩnh vực mới** — chưa có kinh nghiệm bán lẻ, logistics, thanh toán, CSKH số lượng lớn | Trung bình–Cao | Thí điểm nhỏ; tích hợp đối tác thanh toán/vận chuyển sẵn có. |
| R4 | **Nội dung sản phẩm kỹ thuật phức tạp** — khó chuẩn hóa cho hàng nghìn SKU | Trung bình | Chuẩn hóa dữ liệu sản phẩm trong Odoo; ưu tiên danh mục theo giai đoạn. |
| R5 | **Kỳ vọng thương hiệu cao vs. nguồn lực** — muốn hiện đại ngang quốc tế | Trung bình | Xác định phạm vi MVP rõ ràng; đầu tư trọng điểm vào trải nghiệm cốt lõi. |
| R6 | **Chuyển đổi hành vi khách B2B** từ email/điện thoại sang tự phục vụ | Trung bình | Giữ song song kênh truyền thống giai đoạn đầu; đào tạo & khuyến khích. |

---

## 12. Lộ trình Tương lai (Future Roadmap) 🔶 *Cần xác nhận*

*Đề xuất phân kỳ theo giai đoạn — mốc thời gian cụ thể cần Đạt Hiển xác nhận.*

- **Giai đoạn 0 — Nền tảng:** Thiết lập kiến trúc Odoo 19 + FastAPI + Next.js; chuẩn hóa dữ liệu sản phẩm lõi; nhận diện thương hiệu.
- **Giai đoạn 1 — B2B Digital Catalog & RFQ:** Danh mục kỹ thuật song ngữ, trang sản phẩm/thương hiệu, luồng yêu cầu báo giá trực tuyến, tài khoản doanh nghiệp.
- **Giai đoạn 2 — B2C Commerce:** Giỏ hàng, thanh toán trực tuyến, bán vật tư/phụ kiện & dòng sản phẩm tiêu dùng mới; tích hợp thanh toán/vận chuyển.
- **Giai đoạn 3 — Tối ưu & Cá nhân hóa:** Giá theo hợp đồng, quản lý tài khoản nâng cao, tìm kiếm/lọc kỹ thuật thông minh, phân tích & tối ưu chuyển đổi.
- **Giai đoạn 4 — Mở rộng:** Cân nhắc app di động, đa tiền tệ/xuất khẩu, chương trình khách hàng thân thiết, nội dung/marketing kỹ thuật. 🔶

---

## Phụ lục — Các mục cần xác nhận (🔶)

Trước khi chuyển sang giai đoạn Phân tích Nghiệp vụ (BA) và Thiết kế phần mềm, cần Đạt Hiển xác nhận:

1. Chỉ tiêu cụ thể cho các Success Metrics (mục 5).
2. Mốc thời gian và ưu tiên cho Roadmap (mục 12).
3. Xác nhận thị trường (chỉ Việt Nam, hay có kế hoạch xuất khẩu).
4. Phạm vi dòng sản phẩm B2C mới (mục 6.2) — danh mục cụ thể.
5. Ngân sách/nguồn lực định hướng để căn chỉnh phạm vi MVP.

---

*Tài liệu này định nghĩa TẦM NHÌN cấp cao. Chưa bao gồm yêu cầu nghiệp vụ chi tiết hay thiết kế kỹ thuật — các nội dung đó sẽ được phát triển ở các tài liệu tiếp theo sau khi tầm nhìn được phê duyệt.*
