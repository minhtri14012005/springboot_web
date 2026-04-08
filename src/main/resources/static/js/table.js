let currentTableId = null;
let currentHoaDonId = null;

async function loadTables() {
    const res = await fetch('/api/pos/ban');
    const data = await res.json();
    const tables = data.result;

    const grid = document.getElementById('table-grid');
    grid.innerHTML = '';

    tables.forEach(t => {
        const div = document.createElement('div');

        div.className = `table-card ${
            t.status === 'OCCUPIED' ? 'status-occupied' : 'status-empty'
        }`;

        div.innerText = t.tenBan;

        div.onclick = async () => {
            currentTableId = t.id;

            document.getElementById('current-table-name').innerText = t.tenBan;

            // 🔥 MỞ BÀN
            const res = await fetch(`/api/pos/mo-ban/${t.id}`, {
                method: 'POST'
            });

            const data = await res.json();
            currentHoaDonId = data.result.id;

            console.log("HoaDon:", currentHoaDonId);
        };

        grid.appendChild(div);
    });
}