/**
 * admin-core.js
 * Khởi tạo, điều hướng, helpers dùng chung
 * KHÔNG chứa HTML — chỉ thuần JavaScript
 */

'use strict';

/* ─────────────────────────────────────────────────
   KHỞI CHẠY
───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    updateTopbarDate();
    setInterval(updateTopbarDate, 60000);

    // Đóng modal khi click ra ngoài
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal(overlay.id);
        });
    });

    // ESC để đóng modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.show').forEach(m => closeModal(m.id));
            closeConfirm();
        }
    });
});

/* ─────────────────────────────────────────────────
   ĐIỀU HƯỚNG SIDEBAR
───────────────────────────────────────────────── */
const PAGE_TITLES = {
    dashboard: { title: 'Dashboard',         sub: 'Tổng quan hệ thống' },
    monAn:     { title: 'Quản lý Thực đơn',  sub: 'Thêm, sửa, xoá món ăn' },
    nhanVien:  { title: 'Quản lý Nhân viên', sub: 'Quản lý tài khoản và phân quyền' },
    lichSu:    { title: 'Lịch sử Hóa đơn',  sub: 'Xem các giao dịch đã thực hiện' }
};

function showPage(pageId, navEl) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const pageEl = document.getElementById(`page-${pageId}`);
    if (pageEl) pageEl.classList.add('active');
    if (navEl)  navEl.classList.add('active');

    const info = PAGE_TITLES[pageId];
    if (info) {
        document.getElementById('topbarTitle').textContent = info.title;
        document.getElementById('topbarSub').textContent   = info.sub;
    }
}

/* ─────────────────────────────────────────────────
   TOPBAR: NGÀY GIỜ
───────────────────────────────────────────────── */
function updateTopbarDate() {
    const el = document.getElementById('currentDate');
    if (!el) return;
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    el.textContent = new Date().toLocaleDateString('vi-VN', opts);
}

/* ─────────────────────────────────────────────────
   MODAL
───────────────────────────────────────────────── */
function openModal(id) {
    document.getElementById(id).classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal(id) {
    document.getElementById(id).classList.remove('show');
    document.body.style.overflow = '';
}

/* ─────────────────────────────────────────────────
   CONFIRM DIALOG
───────────────────────────────────────────────── */
let _confirmCallback = null;

function showConfirm(title, text, onConfirm) {
    document.getElementById('confirmTitle').textContent = title;
    document.getElementById('confirmText').textContent  = text;
    _confirmCallback = onConfirm;
    document.getElementById('confirmOverlay').classList.add('show');

    document.getElementById('confirmOkBtn').onclick = () => {
        closeConfirm();
        if (_confirmCallback) _confirmCallback();
    };
}

function closeConfirm() {
    document.getElementById('confirmOverlay').classList.remove('show');
}

/* ─────────────────────────────────────────────────
   TOAST THÔNG BÁO
───────────────────────────────────────────────── */
function showToast(message, type = 'success') {
    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
}
