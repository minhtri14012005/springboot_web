let bill = {};

function addFood(food) {
    if (!currentTable) {
        alert("Chọn bàn trước!");
        return;
    }

    if (!bill[food.id]) {
        bill[food.id] = { ...food, qty: 1 };
    } else {
        bill[food.id].qty++;
    }

    renderBill();
}

function renderBill() {
    const billList = document.getElementById("billList");
    billList.innerHTML = "";

    let total = 0;

    Object.values(bill).forEach(item => {
        total += item.price * item.qty;

        const div = document.createElement("div");
        div.className = "bill-item";

        div.innerHTML = `
            ${item.name}
            <div>
                <button class="btn" onclick="changeQty(${item.id}, -1)">-</button>
                ${item.qty}
                <button class="btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
        `;

        billList.appendChild(div);
    });

    document.getElementById("total").innerText = "Tổng: " + total + "đ";
}

function changeQty(id, change) {
    bill[id].qty += change;
    if (bill[id].qty <= 0) delete bill[id];
    renderBill();
}

function pay() {
    alert("Thanh toán thành công!");
    bill = {};
    renderBill();
}