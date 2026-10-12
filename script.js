const tables = [
    {
        title: "Водії",
        data: drivers,
        columns: [
            { key: "id", name: "№" },
            { key: "name", name: "ПІБ" },
            { key: "phone", name: "Телефон" },
            { key: "birthYear", name: "Рік народження" },
            { key: "experience", name: "Стаж (років)" },
            { key: "rating", name: "Рейтинг" },
            { key: "license", name: "Посвідчення" },
            { key: "status", name: "Статус" }
        ]
    },
    {
        title: "Автомобілі",
        data: cars,
        columns: [
            { key: "id", name: "№" },
            { key: "brand", name: "Марка" },
            { key: "model", name: "Модель" },
            { key: "year", name: "Рік випуску" },
            { key: "number", name: "Номер" },
            { key: "color", name: "Колір" },
            { key: "carClass", name: "Клас" },
            { key: "driverId", name: "Водій" }
        ]
    },
    {
        title: "Поїздки",
        data: rides,
        columns: [
            { key: "id", name: "№" },
            { key: "from", name: "Звідки" },
            { key: "to", name: "Куди" },
            { key: "date", name: "Дата" },
            { key: "distance", name: "Відстань (км)" },
            { key: "price", name: "Ціна (грн)" },
            { key: "payment", name: "Оплата" },
            { key: "driverId", name: "Водій" }
        ]
    }
];

function getDriverName(id) {
    const driver = drivers.find(d => d.id === id);
    return driver ? driver.name.split(" ")[0] : "-";
}

function createTable({ columns, data }) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headRow = document.createElement("tr");
    columns.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col.name;
        headRow.appendChild(th);
    });
    thead.appendChild(headRow);

    data.forEach(item => {
        const row = document.createElement("tr");

        columns.forEach(({ key }) => {
            const td = document.createElement("td");
            td.textContent = key === "driverId" ? getDriverName(item[key]) : item[key];
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.append(thead, tbody);
    return table;
}

const tabsDiv = document.getElementById("tabs");
const contentDiv = document.getElementById("content");
const buttons = [];
const tableElements = [];

tables.forEach((tableInfo, i) => {
    const btn = document.createElement("button");
    btn.textContent = tableInfo.title;
    btn.addEventListener("click", () => showTab(i));
    tabsDiv.appendChild(btn);
    buttons.push(btn);

    const table = createTable(tableInfo);
    contentDiv.appendChild(table);
    tableElements.push(table);
});

function showTab(index) {
    tableElements.forEach((table, i) => {
        table.hidden = i !== index;
        buttons[i].classList.toggle("active", i === index);
    });
}

showTab(0);
