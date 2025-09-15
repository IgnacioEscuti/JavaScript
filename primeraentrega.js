let usuario = prompt("Ingrese su nombre");
let listaTareas = [];


function mostrarTareas() {
    console.log(`\n Lista de tareas de ${usuario}:`);

    if (listaTareas.length === 0) {
        console.log("No hay tareas todavía.");
    } else {
        for (let i = 0; i < listaTareas.length; i++) {
        let tarea = listaTareas[i];
        let estado;
            if (tarea.hecha) {
                estado = "Hecha";
            } else {
                estado = "Pendiente";
            }
        console.log(`${i + 1}. ${tarea.texto} - ${estado}`);
        }
    }
}

function agregarTarea(texto) {
    if (texto.trim() === "") {
        console.log("No se puede agregar una tarea vacía.");
        return;
    }
    listaTareas.push({ texto: texto, hecha: false });
    console.log(`Tarea "${texto}" agregada.`);
}

function marcarHecha(posicion) {
    if (posicion >= 0 && posicion < listaTareas.length) {
        listaTareas[posicion].hecha = true;
        console.log(`La tarea "${listaTareas[posicion].texto}" fue marcada como hecha.`);
    } else {
        console.log("Número de tarea inválido.");
    }
}

function eliminarTarea(posicion) {
    if (posicion >= 0 && posicion < listaTareas.length) {
        console.log(`Tarea "${listaTareas[posicion].texto}" eliminada.`);
        listaTareas.splice(posicion, 1);
    } else {
        console.log("Número de tarea inválido.");
    }
}

function agregarTareasUsuario() {
    while (true) {
        let tarea = prompt("Ingrese una tarea (escriba 'salir' para terminar):");
        if (tarea === null || tarea.toLowerCase() === "salir") {
            break;
        }
        agregarTarea(tarea);
    }
}

function marcarTareasUsuario() {
    while (true) {
        mostrarTareas();
        let input = prompt("Ingrese el número de la tarea a marcar como hecha (o 'salir' para terminar):");
        if (input === null || input.toLowerCase() === "salir") break;
        let num = Number(input) - 1;
        marcarHecha(num);
    }
}

function eliminarTareasUsuario() {
    while (true) {
        mostrarTareas();
        let input = prompt("Ingrese el número de la tarea a eliminar (o 'salir' para terminar):");
        if (input === null || input.toLowerCase() === "salir") break;
        let num = Number(input) - 1;
        eliminarTarea(num);
    }
}


agregarTareasUsuario();
marcarTareasUsuario();   
eliminarTareasUsuario();   
mostrarTareas();          