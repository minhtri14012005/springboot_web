'use strict';

let hoaDons = JSON.parse(localStorage.getItem('hoaDons')) || [];

function renderHoaDon() {
    const tbody = document.querySelector('#tableHoaDon tbody');
    if (!tbody) return;

    tbody.innerHTML = '';

    if (hoaDons.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8">🧾 Không có hóa đơn</td></tr>`;
        return;
    }

    hoaDons.forEach((hd, i) => {
        tbody.innerHTML += `
        <tr>
            <td>${i+1}</td>
            <td>#HD${i}</td>
            <td>${hd.ban}</td>
            <td>${hd.nv}</td>
            <td>${hd.time}</td>
            <td>${hd.tong}</td>
            <td>✓</td>
            <td><button>Xem</button></td>
        </tr>`;
    });
}

document.addEventListener('DOMContentLoaded', renderHoaDon);