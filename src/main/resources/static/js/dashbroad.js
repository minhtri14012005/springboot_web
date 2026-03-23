/**
 * admin-dashboard.js
 * Chỉ xử lý logic UI cho trang Dashboard
 * Số liệu stat cards & bảng đã được Thymeleaf render sẵn
 * Phụ thuộc: admin-core.js
 */

'use strict';

/* ─────────────────────────────────────────────────
   KHÔNG CÒN GÌ ĐỂ LÀM Ở ĐÂY
   Vì Thymeleaf đã render sẵn:
     - Stat cards (soMonAn, soNhanVien, soHoaDon, doanhThu)
     - Bảng hóa đơn gần đây (hoaDonGanDay)
     - Biểu đồ món bán chạy (monBanChay)

   File này giữ lại để sau có thể thêm:
     - Animation khi load trang
     - Tự động reload số liệu sau X phút
     - Các tương tác dashboard khác
───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
    animateStatCards();
});

/* ─────────────────────────────────────────────────
   ANIMATION: ĐẾM SỐ KHI TRANG LOAD
   Tạo hiệu ứng đếm từ 0 lên số thực cho stat cards
───────────────────────────────────────────────── */
function animateStatCards() {
    document.querySelectorAll('.stat-value').forEach(el => {
        const rawText = el.textContent.trim();

        // Bỏ qua nếu có chữ (vd: "1.025.000đ") — chỉ animate số nguyên
        const num = parseInt(rawText.replace(/\D/g, ''), 10);
        if (isNaN(num) || num === 0) return;

        let current = 0;
        const step     = Math.ceil(num / 30);
        const interval = setInterval(() => {
            current += step;
            if (current >= num) {
                current = num;
                clearInterval(interval);
                el.textContent = rawText; // Khôi phục text gốc (có thể có đ, %)
            } else {
                el.textContent = current.toLocaleString('vi-VN');
            }
        }, 30);
    });
}
