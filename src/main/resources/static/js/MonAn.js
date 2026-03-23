/**
 * admin-monAn.js
 * Chỉ xử lý logic UI cho trang Món ăn
 * HTML được Thymeleaf render sẵn trong admin.html
 * Phụ thuộc: admin-core.js
 */

'use strict';

/* ─────────────────────────────────────────────────
   LỌC BẢNG PHÍA CLIENT
   Thymeleaf render sẵn tất cả hàng,
   JS chỉ ẩn/hiện theo từ khóa và loại
───────────────────────────────────────────────── */
function filterTableMonAn() {
    const q    = document.getElementById('searchMonAn').value.toLowerCase();
    const loai = document.getElementById('filterLoai').value;

    document.querySelectorAll('#tableMonAn tbody tr[data-ten]').forEach(row => {
        const ten     = (row.dataset.ten  || '').toLowerCase();
        const loaiRow = (row.dataset.loai || '');
        const matchQ  = ten.includes(q);
        const matchL  = !loai || loaiRow === loai;
        row.style.display = (matchQ && matchL) ? '' : 'none';
    });
}

/* ─────────────────────────────────────────────────
   MỞ MODAL THÊM — reset form về trống
───────────────────────────────────────────────── */
function openModalThemMonAn() {
    document.getElementById('modalMonAnTitle').textContent = 'Thêm món ăn mới';
    document.getElementById('maMonAn').value        = '';
    document.getElementById('tenMonAn').value       = '';
    document.getElementById('loaiMonAn').value      = '';
    document.getElementById('giaMonAn').value       = '';
    document.getElementById('trangThaiMonAn').value = '1';
    document.getElementById('moTaMonAn').value      = '';
    document.getElementById('hinhAnhMonAn').value   = '';
    openModal('modalMonAn');
}

/* ─────────────────────────────────────────────────
   MỞ MODAL SỬA — điền dữ liệu từ hàng được chọn
   Thymeleaf truyền tham số qua th:onclick
───────────────────────────────────────────────── */
function openModalSuaMonAn(id, tenMon, loai, gia, trangThai, moTa, hinhAnh) {
    document.getElementById('modalMonAnTitle').textContent = 'Sửa thông tin món ăn';
    document.getElementById('maMonAn').value        = id;
    document.getElementById('tenMonAn').value       = tenMon   || '';
    document.getElementById('loaiMonAn').value      = loai     || '';
    document.getElementById('giaMonAn').value       = gia      || '';
    document.getElementById('trangThaiMonAn').value = trangThai ?? 1;
    document.getElementById('moTaMonAn').value      = moTa     || '';
    document.getElementById('hinhAnhMonAn').value   = hinhAnh  || '';
    openModal('modalMonAn');
}

/* ─────────────────────────────────────────────────
   XÁC NHẬN XÓA
   Hiện confirm dialog → nếu OK thì submit form POST
───────────────────────────────────────────────── */
function xacNhanXoaMonAn(id, tenMon) {
    showConfirm(
        `Xóa món: "${tenMon}"?`,
        'Món ăn sẽ bị xóa khỏi menu. Không thể hoàn tác.',
        () => {
            document.getElementById('xoaMonAnId').value = id;
            document.getElementById('formXoaMonAn').submit();
        }
    );
}
