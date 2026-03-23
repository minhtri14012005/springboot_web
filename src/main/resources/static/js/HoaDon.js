/**
 * admin-hoaDon.js
 * Chỉ xử lý logic UI cho trang Lịch sử Hóa đơn
 * HTML được Thymeleaf render sẵn trong admin.html
 * Phụ thuộc: admin-core.js
 */

'use strict';

/* ─────────────────────────────────────────────────
   XEM CHI TIẾT HÓA ĐƠN
   Thymeleaf đã render sẵn div#chiTiet-{id}
   JS chỉ ẩn cái cũ và hiện cái mới
───────────────────────────────────────────────── */
function xemChiTietHoaDon(id) {
    // Ẩn tất cả các div chi tiết
    document.querySelectorAll('[id^="chiTiet-"]').forEach(el => {
        el.style.display = 'none';
    });

    // Hiện div của hóa đơn được chọn
    const chiTiet = document.getElementById(`chiTiet-${id}`);
    if (chiTiet) chiTiet.style.display = 'block';

    openModal('modalHoaDon');
}
