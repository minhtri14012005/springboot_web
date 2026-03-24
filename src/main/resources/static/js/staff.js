'use strict';

let nhanViens = JSON.parse(localStorage.getItem('nhanViens')) || [];
let editId = null;

function renderNhanVien() {
    const tbody = document.querySelector('#tableNhanVien tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (nhanViens.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">👥 Chưa có nhân viên</td></tr>`;
        return;
    }

    nhanViens.forEach((nv, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>${nv.ten}</td>
            <td>${nv.email}</td>
            <td>${nv.sdt}</td>
            <td>${nv.role}</td>
            <td>🟢</td>
            <td>
                <button onclick="editNV(${nv.id})">Sửa</button>
                <button onclick="deleteNV(${nv.id})">Xóa</button>
            </td>
        </tr>`;
    });

    localStorage.setItem('nhanViens', JSON.stringify(nhanViens));
}

function openModalThemNhanVien() {
    editId = null;
    formNhanVien.reset();
    openModal('modalNhanVien');
}

function editNV(id) {
    const nv = nhanViens.find(x => x.id === id);
    if (!nv) return;

    editId = id;

    hoTenNV.value = nv.ten;
    emailNV.value = nv.email;
    sdtNV.value = nv.sdt;

    openModal('modalNhanVien');
}

function deleteNV(id) {
    showConfirm("Xóa nhân viên?", "", () => {
        nhanViens = nhanViens.filter(n => n.id !== id);
        renderNhanVien();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    formNhanVien?.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            id: editId || Date.now(),
            ten: hoTenNV.value,
            email: emailNV.value,
            sdt: sdtNV.value,
            role: "Nhân viên"
        };

        if (editId) {
            nhanViens = nhanViens.map(n => n.id === editId ? data : n);
        } else {
            nhanViens.push(data);
        }

        renderNhanVien();
        closeModal('modalNhanVien');
    });

    renderNhanVien();
});