'use strict';

let monAns = [];

// 1. LẤY DANH SÁCH MÓN ĂN TỪ BACKEND
async function fetchMonAn() {
    try {
        const response = await fetch('/api/admin/menu');
        const data = await response.json();

        // Kiểm tra code thành công từ ApiResponse
        if (data.code === 1000) {
            monAns = data.result;
            renderMonAn();
        }
    } catch (error) {
        console.error("Lỗi khi tải danh sách món ăn:", error);
    }
}

// 2. RENDER RA BẢNG
function renderMonAn() {
    const tbody = document.querySelector('#tableMonAn tbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    if (monAns.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">🍽️ Chưa có món ăn nào</td></tr>`;
        return;
    }

    monAns.forEach((ma, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${i + 1}</td>
            <td>🍜</td>
            <td>${ma.tenMonAn || ma.name}</td>
            <td>${ma.loai || 'Chưa phân loại'}</td>
            <td>${ma.gia ? ma.gia.toLocaleString() : 0}đ</td>
            <td>Đang bán</td>
            <td>
                <button onclick="deleteMonAn(${ma.id})">Xóa</button>
            </td>
        </tr>`;
    });
}

// 3. THÊM MÓN ĂN
document.getElementById('formMonAn')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
        tenMonAn: document.getElementById('tenMonAn').value,
        gia: document.getElementById('giaMonAn').value,
        // Tuỳ thuộc vào cấu trúc MonAnRequest của bạn, có thể thêm trường loai, hinhAnh...
    };

    try {
        const response = await fetch('/api/admin/menu', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();

        if (data.code === 1000) {
            closeModal('modalMonAn');
            document.getElementById('formMonAn').reset();
            fetchMonAn(); // Tải lại danh sách
        } else {
            alert("Lỗi: " + data.message);
        }
    } catch (error) {
        console.error("Lỗi thêm món:", error);
    }
});

// 4. XÓA MÓN ĂN
async function deleteMonAn(id) {
    if (confirm("Bạn có chắc chắn muốn xóa món này?")) {
        try {
            const response = await fetch(`/api/admin/menu/${id}`, {
                method: 'DELETE'
            });
            const data = await response.json();

            if (data.code === 1000) {
                fetchMonAn(); // Tải lại sau khi xóa
            } else {
                alert("Lỗi: " + data.message);
            }
        } catch (error) {
            console.error("Lỗi xóa món:", error);
        }
    }
}

function openModalThemMonAn() {
    document.getElementById('formMonAn').reset();
    openModal('modalMonAn');
}

// Chạy khi web load xong
document.addEventListener('DOMContentLoaded', fetchMonAn);