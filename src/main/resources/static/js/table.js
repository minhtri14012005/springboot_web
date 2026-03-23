let tables = [
    { id: 1, status: "empty" },
    { id: 2, status: "empty" },
    { id: 3, status: "empty" },
    { id: 4, status: "empty" },
    { id: 5, status: "empty" },
    { id: 6, status: "empty" }
];

let currentTable = null;

function renderTables() {
    const tableList = document.getElementById("tableList");
    tableList.innerHTML = "";

    tables.forEach(t => {
        const div = document.createElement("div");
        div.className = "table " + t.status;
        div.innerText = "Bàn " + t.id;

        div.onclick = () => {
            currentTable = t.id;
            alert("Chọn bàn " + t.id);
        };

        tableList.appendChild(div);
    });
}