let currentTableId = null;
let currentHoaDonId = null;
let isOpeningTable = false;

// Load ds bàn
async function loadTables() {
    const res = await fetch('/api/pos/ban');
    const data = await res.json();
    const tables = data.result;

    const grid = document.getElementById('table-grid');
    grid.innerHTML = '';

    tables.forEach(t => {
        const div = document.createElement('div');
        div.className = `table-card ${t.trangThai === 'CO_KHACH' ? 'status-occupied' : 'status-empty'}`;
        div.innerText = t.tenBan;

        div.onclick = async () => {
            if (isOpeningTable) return;

            isOpeningTable = true;
            currentTableId = t.id;
            currentHoaDonId = null;

            document.getElementById('current-table-name').innerText = t.tenBan;
            renderBill([]);

            try {
                const res = await fetch(`/api/pos/mo-ban/${t.id}`, { method: 'POST' });
                const data = await res.json();

                if (data && data.result) {
                    currentHoaDonId = data.result.id;
                    if (t.trangThai === 'CO_KHACH') {
                        await loadBillFromServer();
                    }
                }
            } catch (e) {
                console.error("Lỗi:", e);
            } finally {
                isOpeningTable = false;
            }
        };
        grid.appendChild(div);
    });
}

// Load bill
async function loadBillFromServer() {
    if (!currentHoaDonId) return;
    const res = await fetch(`/api/pos/hoa-don/${currentHoaDonId}`);
    const data = await res.json();
    renderBill(data.result || []);
}

// Thêm món
async function addToBill(product) {
    if (isOpeningTable || !currentHoaDonId) {
        alert("Vui lòng chọn bàn trước!");
        return;
    }

    try {
        const res = await fetch('/api/pos/goi-mon', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                hoaDonId: currentHoaDonId,
                monAnId: product.id,
                soLuong: 1
            })
        });

        if (res.ok) {
            await loadBillFromServer();
            await loadTables();
        }
    } catch (e) {
        alert("Lỗi thêm món!");
    }
}

// Giảm/ xóa món
async function changeQuantity(cthdId, newQuantity) {
    if (newQuantity <= 0) {
        await removeItem(cthdId);
        return;
    }
    await fetch('/api/pos/cap-nhat-so-luong', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cthdId: cthdId, soLuong: newQuantity })
    });
    await loadBillFromServer();
}

async function removeItem(cthdId) {
    if (!confirm("Bạn muốn xóa món này?")) return;
    await fetch(`/api/pos/xoa-mon/${cthdId}`, { method: 'DELETE' });
    await loadBillFromServer();
    await loadTables();
}

// Lập hóa đơn
function renderBill(items) {
    const body = document.getElementById('bill-items-body');
    let total = 0;
    body.innerHTML = '';

    if (!items || items.length === 0) {
        document.getElementById('total-price').innerText = '0đ';
        return;
    }

    items.forEach(item => {
        const tenMon = item.monAn ? item.monAn.tenMon : 'Không xác định';
        const thanhTien = item.soLuong * item.donGia;
        total += thanhTien;

        body.innerHTML += `
            <tr>
                <td style="font-weight: 500; color: #333;">${tenMon}</td>
                <td>
                    <div class="qty-control">
                        <button class="btn-qty" onclick="changeQuantity(${item.id}, ${item.soLuong - 1})">−</button>
                        <span class="qty-num">${item.soLuong}</span>
                        <button class="btn-qty" onclick="changeQuantity(${item.id}, ${item.soLuong + 1})">+</button>
                    </div>
                </td>
                <td style="color: #666;">${item.donGia.toLocaleString()}đ</td>
                <td style="font-weight: 600; color: #333;">${thanhTien.toLocaleString()}đ</td>
                <td>
                    <button class="btn-del" onclick="removeItem(${item.id})">Xóa</button>
                </td>
            </tr>`;
    });
    document.getElementById('total-price').innerText = total.toLocaleString() + 'đ';
}

//Thanh toán
async function handlePayment() {
    if (!currentHoaDonId || isOpeningTable) return;
    if (!confirm("Xác nhận thanh toán?")) return;

    const res = await fetch(`/api/pos/thanh-toan/${currentHoaDonId}`, { method: 'POST' });
    const data = await res.json();
    alert("Thanh toán xong!");
    currentHoaDonId = null;
    renderBill([]);
    await loadTables();
}
