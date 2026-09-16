const nombreVendedor =
    localStorage.getItem("usuarioVendedor") || "Vendedor";

const tiendaVendedor =
    localStorage.getItem("tiendaVendedor") || "Tienda no registrada";

const idVendedor =
    localStorage.getItem("idVendedor") || "";

document.getElementById("nombreVendedor").textContent =
    nombreVendedor;

document.getElementById("vendedorReporte").textContent =
    nombreVendedor;

document.getElementById("tiendaReporte").textContent =
    tiendaVendedor;


// Formulario
const formulario =
    document.getElementById("formularioReporte");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    const tipoProblema =
        document.getElementById("tipoProblema").value;

    const asunto =
        document.getElementById("asunto").value.trim();

    const descripcion =
        document.getElementById("descripcion").value.trim();

    const prioridad =
        document.getElementById("prioridad").value;

    if (tipoProblema === "") {
        alert("Por favor selecciona el tipo de problema.");
        return;
    }

    if (asunto === "") {
        alert("Por favor escribe el asunto del reporte.");
        return;
    }

    if (descripcion === "") {
        alert("Por favor describe el problema.");
        return;
    }

    if (prioridad === "") {
        alert("Por favor selecciona la prioridad.");
        return;
    }


    const reportes =
        JSON.parse(localStorage.getItem("reportes")) || [];


    const nuevoReporte = {

        id: Date.now(),

        usuario: nombreVendedor,

        idVendedor: idVendedor,

        tienda: tiendaVendedor,

        tipo: tipoProblema,

        asunto: asunto,

        descripcion: descripcion,

        prioridad: prioridad,

        fecha: new Date().toLocaleString("es-CO"),

        estado: "Pendiente"
    };


    reportes.push(nuevoReporte);

    localStorage.setItem(
        "reportes",
        JSON.stringify(reportes)
    );


    alert(
        "Reporte enviado correctamente.\n\n" +
        "El Gestor podrá revisar el problema desde su panel."
    );


    window.location.href = "tienda.html";
});


// Botón volver
document
    .getElementById("volverTienda")
    .addEventListener("click", function () {

        window.location.href = "tienda.html";
    });


// Botón cancelar
document
    .getElementById("cancelar")
    .addEventListener("click", function () {

        const confirmar =
            confirm("¿Deseas cancelar el reporte?");

        if (confirmar) {
            window.location.href = "tienda.html";
        }
    });


// Cerrar sesión
document
    .getElementById("cerrarSesion")
    .addEventListener("click", function () {

        localStorage.removeItem("sesionActiva");
        localStorage.removeItem("rolUsuario");
        localStorage.removeItem("usuarioVendedor");
        localStorage.removeItem("tiendaVendedor");
        localStorage.removeItem("idVendedor");

        window.location.href = "login.html";
    });
