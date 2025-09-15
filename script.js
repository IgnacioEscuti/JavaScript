let stockZapatos = JSON.parse(localStorage.getItem("stockZapatos"));

if (!stockZapatos || stockZapatos.length < 13) {
    stockZapatos = [
        { id: 1, modelo: "Nike Air", precio: 250000, talles: { 40: 3, 41: 2, 42: 5 } },
        { id: 2, modelo: "Adidas Run", precio: 200000, talles: { 38: 1, 39: 4 } },
        { id: 3, modelo: "Puma Classic", precio: 180000, talles: { 40: 2, 42: 3 } },
        { id: 4, modelo: "Reebok Sport", precio: 220000, talles: { 39: 2, 41: 5 } },
        { id: 5, modelo: "Converse All Star", precio: 150000, talles: { 37: 4, 38: 2, 39: 1 } },
        { id: 6, modelo: "Vans Old Skool", precio: 190000, talles: { 40: 3, 41: 2 } },
        { id: 7, modelo: "Fila Disruptor", precio: 210000, talles: { 38: 3, 39: 2, 40: 4 } },
        { id: 8, modelo: "New Balance 574", precio: 230000, talles: { 41: 3, 42: 2 } },
        { id: 9, modelo: "Jordan Retro", precio: 300000, talles: { 42: 5, 43: 2 } },
        { id: 10, modelo: "Asics Gel", precio: 240000, talles: { 40: 2, 41: 3 } },
        { id: 11, modelo: "Under Armour Charged", precio: 260000, talles: { 39: 3, 40: 2 } },
        { id: 12, modelo: "Topper Urbana", precio: 120000, talles: { 37: 5, 38: 2 } },
        { id: 13, modelo: "Le Coq Sportif", precio: 200000, talles: { 39: 2, 41: 2 } }
    ];
    localStorage.setItem("stockZapatos", JSON.stringify(stockZapatos));
}

function guardarStock() {
    localStorage.setItem("stockZapatos", JSON.stringify(stockZapatos));
}

const formBuscar = document.getElementById("formBuscar");
const inputID = document.getElementById("inputID");
const resultados = document.getElementById("resultados");
const listadoModelos = document.getElementById("listadoModelos");


function mostrarListadoModelos() {
    listadoModelos.innerHTML = "<h2>Modelos disponibles:</h2><div class='contenedor-modelos'></div>";
    const contenedor = listadoModelos.querySelector(".contenedor-modelos");

    stockZapatos.forEach(function(zapato) {
        const div = document.createElement("div");
        div.classList.add("modelo");
        div.textContent = `${zapato.modelo} (ID: ${zapato.id})  $${zapato.precio}`;
        contenedor.appendChild(div);
    });
}


formBuscar.addEventListener("submit", function(e) {
    e.preventDefault();
    const idBuscado = Number(inputID.value);

    resultados.innerHTML = "";

    const zapato = stockZapatos.find(z => z.id === idBuscado);

    if (zapato) {
        mostrarZapato(zapato);
    } else {
        resultados.innerHTML = "<p style='color:red'> Zapato no encontrado</p>";
    }
});


function mostrarZapato(zapato) {
    const div = document.createElement("div");
    div.innerHTML = `
        <h2>${zapato.modelo} (ID: ${zapato.id})</h2>
        <p>Precio: $${zapato.precio}</p>
        <ul id="listaTalles"></ul>
    `;

    resultados.appendChild(div);

    const listaTalles = div.querySelector("#listaTalles");
    const tallesDisponibles = Object.keys(zapato.talles);

    if (tallesDisponibles.length === 0) {
        listaTalles.innerHTML = "<li style='color:red'>  Sin stock</li>";
        return;
    }

    for (const talle in zapato.talles) {
        const cantidad = zapato.talles[talle];
        const li = document.createElement("li");
        li.innerHTML = `
            Talle ${talle} → Stock: ${cantidad}
            <button data-id="${zapato.id}" data-talle="${talle}">Eliminar 1</button>
        `;
        listaTalles.appendChild(li);

        li.querySelector("button").addEventListener("click", function() {
            eliminarUnidad(zapato.id, talle);
        });
    }
}

function eliminarUnidad(id, talle) {
    const zapato = stockZapatos.find(z => z.id === id);
    if (zapato && zapato.talles[talle] > 0) {
        zapato.talles[talle] -= 1;
        if (zapato.talles[talle] === 0) {
            delete zapato.talles[talle];
        }
        guardarStock();
        resultados.innerHTML = "";
        mostrarZapato(zapato);
    } else {
        alert(" No hay stock en ese talle.");
    }
}

mostrarListadoModelos();
