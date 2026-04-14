'use strict';

/* ===== LOAD MENU ===== */
async function loadMenu() {
    try {
        const res = await fetch('/api/admin/menu');
        const data = await res.json();
        const products = data.result || [];

        const grid = document.getElementById('menu-grid');
        grid.innerHTML = '';

        // 🔥 CHỈ LẤY MÓN ĐANG BÁN
        products
            .filter(p => p.active === true)
            .forEach(p => {
                const div = document.createElement('div');
                div.className = 'food-card';

                div.innerHTML = `
                    <img src="${p.imageUrl || ''}">
                    <p>${p.tenMon}</p>
                    <small>${p.gia.toLocaleString()}đ</small>
                `;

                div.onclick = () => addToBill({
                    id: p.id,
                    name: p.tenMon,
                    price: p.gia
                });

                grid.appendChild(div);
            });

    } catch (e) {
        console.error("Lỗi load menu:", e);
    }
}