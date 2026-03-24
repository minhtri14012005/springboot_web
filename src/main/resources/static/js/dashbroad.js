'use strict';

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
});

function updateStats() {
    const monAns = JSON.parse(localStorage.getItem('monAns')) || [];
    const nhanViens = JSON.parse(localStorage.getItem('nhanViens')) || [];
    const hoaDons = JSON.parse(localStorage.getItem('hoaDons')) || [];

    document.getElementById('statMonAn').textContent = monAns.length;
    document.getElementById('statNhanVien').textContent = nhanViens.length;
    document.getElementById('statHoaDon').textContent = hoaDons.length;
}