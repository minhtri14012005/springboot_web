/**
 * admin-nhanVien.js
 * Chỉ xử lý logic UI cho trang Nhân viên
 * HTML được Thymeleaf render sẵn trong admin.html
 * Phụ thuộc: admin-core.js
 */

'use strict';

/* ─────────────────────────────────────────────────
   LỌC BẢNG PHÍA CLIENT
───────────────────────────────────────────────── */
function filterTableNhanVien() {
    const q     = document.getElementById('searchNhanVien').value.toLowerCase();
    const quyen = document.getElementById('filterQuyen').value;

    document.querySelectorAll('#tableNhanVien tbody tr[data-ten]').forEach(row => {
        const ten      = (row.dataset.ten   || '').toLowerCase();
        const email    = (row.dataset.email || '').toLowerCase();
        const quyenRow = (row.dataset.quyen || '');
        const matchQ   = ten.includes(q) || email.includes(q);
        const matchR   = !quyen || quyenRow === quyen;
        row.style.display = (matchQ && matchR) ? '' : 'none';
    });
}

/* ─────────────────────────────────────────────────
   MỞ MODAL THÊM NHÂN VIÊN MỚI
───────────────────────────────────────────────── */
function openModalThemNhanVien() {
    document.getElementById('modalNVTitle').textContent = 'Thêm nhân viên mới';
    document.getElementById('maNhanVien').value  = '';
    document.getElementById('hoTenNV').value     = '';
    document.getElementById('emailNV').value     = '';
    document.getElementById('sdtNV').value       = '';
    document.getElementById('quyenNV').value     = 'STAFF';
    document.getElementById('trangThaiNV').value = '1';
    document.getElementById('matKhauNV').value   = '';

    // Thêm mới: mật khẩu bắt buộc
    document.getElementById('pwLabel').textContent  = '*';
    document.getElementById('pwHint').style.display = 'none';
    document.getElementById('matKhauNV').required   = true;

    openModal('modalNhanVien');
}

/* ─────────────────────────────────────────────────
   MỞ MODAL SỬA NHÂN VIÊN
   Thymeleaf truyền tham số qua th:onclick
───────────────────────────────────────────────── */
function openModalSuaNhanVien(id, hoTen, email, sdt, quyen, trangThai) {
    document.getElementById('modalNVTitle').textContent = 'Sửa thông tin nhân viên';
    document.getElementById('maNhanVien').value  = id;
    document.getElementById('hoTenNV').value     = hoTen     || '';
    document.getElementById('emailNV').value     = email     || '';
    document.getElementById('sdtNV').value       = sdt       || '';
    document.getElementById('quyenNV').value     = quyen     || 'STAFF';
    document.getElementById('trangThaiNV').value = trangThai ?? 1;
    document.getElementById('matKhauNV').value   = '';

    // Sửa: mật khẩu không bắt buộc
    document.getElementById('pwLabel').textContent  = '';
    document.getElementById('pwHint').style.display = 'block';
    document.getElementById('matKhauNV').required   = false;

    openModal('modalNhanVien');
}

/* ─────────────────────────────────────────────────
   XÁC NHẬN XÓA NHÂN VIÊN
───────────────────────────────────────────────── */
function xacNhanXoaNhanVien(id, hoTen) {
    showConfirm(
        `Xóa nhân viên: "${hoTen}"?`,
        'Tài khoản đăng nhập của nhân viên này sẽ bị xóa vĩnh viễn.',
        () => {
            document.getElementById('xoaNhanVienId').value = id;
            document.getElementById('formXoaNhanVien').submit();
        }
    );
}
