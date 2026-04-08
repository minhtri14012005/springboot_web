let selectedItems = [];

// ===== THÊM MÓN =====
async function addToBill(product) {
    if (!currentTableId || !currentHoaDonId) {
        alert("Chọn bàn trước!");
        return;
    }

    // 🔥 GỌI API LƯU DB
    await fetch('/api/pos/goi-mon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            hoaDonId: currentHoaDonId,
            monAnId: product.id,
            soLuong: 1
        })
    });

    // UI
    const item = selectedItems.find(i => i.id === product.id);

    if (item) item.quantity++;
    else selectedItems.push({ ...product, quantity: 1 });

    renderBill();
}

// ===== HIỂN THỊ BILL =====
function renderBill() {
    const body = document.getElementById('bill-items-body');
    let total = 0;

    body.innerHTML = '';

    selectedItems.forEach(item => {
        total += item.price * item.quantity;

        body.innerHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price.toLocaleString()}đ</td>
            <td>${(item.price * item.quantity).toLocaleString()}đ</td>
        </tr>`;
    });

    document.getElementById('total-price').innerText =
        total.toLocaleString() + 'đ';
}

// ===== THANH TOÁN =====
async function handlePayment() {
    if (!currentHoaDonId) {
        alert("Chưa có hóa đơn!");
        return;
    }

    const res = await fetch(`/api/pos/thanh-toan/${currentHoaDonId}`, {
        method: 'POST'
    });

    const data = await res.json();

    alert("Thanh toán thành công: " + data.result.toLocaleString() + "đ");

    // 🔥 RESET
    selectedItems = [];
    currentHoaDonId = null;
    currentTableId = null;

    renderBill();
    loadTables();
}