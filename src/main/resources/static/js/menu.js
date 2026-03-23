let foods = [
    // 🧋 ĐỒ UỐNG
    { id: 1, name: "Trà sữa trân châu", price: 30000 },
    { id: 2, name: "Trà đào cam sả", price: 35000 },
    { id: 3, name: "Cà phê đen", price: 20000 },
    { id: 4, name: "Cà phê sữa", price: 25000 },
    { id: 5, name: "Bạc xỉu", price: 30000 },
    { id: 6, name: "Nước ép cam", price: 40000 },
    { id: 7, name: "Sinh tố xoài", price: 45000 },
    { id: 8, name: "Sinh tố bơ", price: 50000 },

    // 🍜 MÓN ĂN
    { id: 9, name: "Phở bò", price: 50000 },
    { id: 10, name: "Bún bò Huế", price: 55000 },
    { id: 11, name: "Cơm gà", price: 45000 },
    { id: 12, name: "Cơm sườn", price: 50000 },
    { id: 13, name: "Mì xào bò", price: 55000 },
    { id: 14, name: "Bánh mì thịt", price: 25000 },
    { id: 15, name: "Bánh mì trứng", price: 20000 },

    // 🍟 ĂN VẶT
    { id: 16, name: "Khoai tây chiên", price: 30000 },
    { id: 17, name: "Gà rán", price: 60000 },
    { id: 18, name: "Xúc xích chiên", price: 25000 },
    { id: 19, name: "Bánh tráng trộn", price: 20000 },

    // 🍰 TRÁNG MIỆNG
    { id: 20, name: "Bánh ngọt", price: 30000 },
    { id: 21, name: "Flan", price: 15000 },
    { id: 22, name: "Rau câu", price: 15000 }
];

function renderMenu() {
    const menuList = document.getElementById("menuList");
    menuList.innerHTML = "";

    foods.forEach(f => {
        const div = document.createElement("div");
        div.className = "food";

        div.innerHTML = `
            <b>${f.name}</b><br>
            <span style="color:red">${f.price.toLocaleString()}đ</span>
        `;

        div.onclick = () => addFood(f);

        menuList.appendChild(div);
    });
}