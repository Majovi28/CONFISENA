// =========================
// DATOS DEL VENDEDOR
// =========================

const nombreVendedor = localStorage.getItem("usuarioVendedor") || "Vendedor";
const tiendaVendedor = localStorage.getItem("tiendaVendedor") || "";

document.getElementById("nombreVendedor").textContent = nombreVendedor;


// =========================
// INFORMACIÓN DE LA TIENDA
// =========================

const tiendas = JSON.parse(localStorage.getItem("tiendas")) || [];

const tienda = tiendas.find(function (t) {
    return t.nombreTienda === tiendaVendedor;
});

if (tienda) {

    document.getElementById("nombreTienda").textContent =
        tienda.nombreTienda || "-";

    document.getElementById("telefonoTienda").textContent =
        tienda.telefono || "-";

    document.getElementById("direccionTienda").textContent =
        tienda.direccion || "-";

    document.getElementById("localidadTienda").textContent =
        tienda.localidad || "-";

    document.getElementById("nombreTiendaTexto").textContent =
        "Gestiona la información de " + tienda.nombreTienda +
        " desde este panel.";

} else {

    document.getElementById("nombreTienda").textContent =
        tiendaVendedor || "-";

    document.getElementById("nombreTiendaTexto").textContent =
        "Gestiona la información de tu tienda desde este panel.";
}


// =========================
// PRODUCTOS
// =========================

document.getElementById("productos").addEventListener("click", function () {

    window.location.href = "productos-tienda.html";

});


// =========================
// INVENTARIO
// =========================

document.getElementById("inventario").addEventListener("click", function () {

    window.location.href = "inventario-tienda.html";

});


// =========================
// PEDIDOS
// =========================

document.getElementById("pedidos").addEventListener("click", function () {

    window.location.href = "pedidos-tienda.html";

});


// =========================
// APARTADOS
// =========================

document.getElementById("apartados").addEventListener("click", function () {

    window.location.href = "apartados-tienda.html";

});


// =========================
// INFORMACIÓN DE LA TIENDA
// =========================

document.getElementById("informacion").addEventListener("click", function () {

    window.location.href = "informacion-tienda.html";

});


// =========================
// REPORTAR PROBLEMA
// =========================

document.getElementById("reportarProblema").addEventListener("click", function () {

    window.location.href = "reportar-problema.html";

});


// =========================
// RESUMEN
// =========================

function actualizarResumen() {

    const productos =
        JSON.parse(localStorage.getItem("productos")) || [];

    const pedidos =
        JSON.parse(localStorage.getItem("pedidos")) || [];

    const apartados =
        JSON.parse(localStorage.getItem("apartados")) || [];


    document.getElementById("cantidadProductos").textContent =
        productos.length;


    const pedidosPendientes = pedidos.filter(function (pedido) {

        return pedido.estado === "Pendiente";

    });


    document.getElementById("cantidadPedidos").textContent =
        pedidosPendientes.length;


    const apartadosPendientes = apartados.filter(function (apartado) {

        return apartado.estadoApartado === "Pendiente";

    });


    document.getElementById("cantidadApartados").textContent =
        apartadosPendientes.length;
}


// =========================
// CERRAR SESIÓN
// =========================

document.getElementById("cerrarSesion").addEventListener("click", function () {

    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("rolUsuario");

    localStorage.removeItem("usuarioVendedor");
    localStorage.removeItem("tiendaVendedor");
    localStorage.removeItem("idVendedor");

    window.location.href = "login.html";

});


// Ejecutar resumen
actualizarResumen();
