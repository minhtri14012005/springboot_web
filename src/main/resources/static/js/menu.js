async function loadMenu() {
    const res = await fetch('/api/admin/menu');
    const data = await res.json();
    const products = data.result;

    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';

    products.forEach(p => {
        const div = document.createElement('div');
        div.className = 'food-card';

        div.innerHTML = `
            <img src="${p.hinhAnh || ''}">
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
}