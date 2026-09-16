const nombreVendedor =
    localStorage.getItem("usuarioVendedor") || "Vendedor";

const tiendaVendedor =
    localStorage.getItem("tiendaVendedor") || "";

document.getElementById("nombreVendedor").textContent =
    nombreVendedor;


if (tiendaVendedor !== "") {

    document.getElementById("nombreTiendaTexto").textContent =
        "Administra los productos que ofrece " +
        tiendaVendedor +
        ".";

}


// =========================
// PRODUCTOS
// =========================

function obtenerProductos() {

    return JSON.parse(
        localStorage.getItem("productos")
    ) || [];

}


// =========================
// MOSTRAR PRODUCTOS
// =========================

function mostrarProductos() {

    const productos = obtenerProductos();

    const tabla =
        document.getElementById("tablaProductos");

    const busqueda =
        document.getElementById("buscarProducto")
            .value
            .toLowerCase()
            .trim();

    const categoria =
        document.getElementById("filtroCategoria")
            .value;

    const estado =
        document.getElementById("filtroEstado")
            .value;


    const productosFiltrados =
        productos.filter(function (producto) {

            const nombre =
                (producto.nombre || "")
                    .toLowerCase();

            const codigo =
                (producto.codigo || "")
                    .toLowerCase();

            const coincideBusqueda =
                nombre.includes(busqueda) ||
                codigo.includes(busqueda);


            const coincideCategoria =
                categoria === "Todas" ||
                producto.categoria === categoria;


            const coincideEstado =
                estado === "Todos" ||
                producto.estado === estado;


            return (
                coincideBusqueda &&
                coincideCategoria &&
                coincideEstado
            );

        });


    tabla.innerHTML = "";


    if (productosFiltrados.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="7" class="sin-resultados">
                    No se encontraron productos.
                </td>
            </tr>
        `;

        return;

    }


    productosFiltrados.forEach(function (producto) {

        const fila =
            document.createElement("tr");


        const precio =
            Number(producto.precio) || 0;


        const estadoProducto =
            producto.estado || "Disponible";


        const tallas =
            producto.tallas || "Única";


        fila.innerHTML = `

            <td>
                <strong>
                    ${producto.nombre || "-"}
                </strong>
            </td>

            <td>
                ${producto.codigo || "-"}
            </td>

            <td>
                ${producto.categoria || "-"}
            </td>

            <td>
                $${precio.toLocaleString("es-CO")}
            </td>

            <td>
                ${tallas}
            </td>

            <td>

                <span class="estado ${
                    estadoProducto === "Disponible"
                        ? "disponible"
                        : "agotado"
                }">

                    ${estadoProducto}

                </span>

            </td>

            <td>

                <button
                    class="boton-ver"
                    onclick="verProducto(${producto.id})"
                >
                    Ver
                </button>

            </td>

        `;


        tabla.appendChild(fila);

    });

}


// =========================
// RESUMEN
// =========================

function actualizarResumen() {

    const productos =
        obtenerProductos();


    const disponibles =
        productos.filter(function (producto) {

            return producto.estado === "Disponible";

        });


    const agotados =
        productos.filter(function (producto) {

            return producto.estado === "Agotado";

        });


    document.getElementById("cantidadProductos")
        .textContent = productos.length;


    document.getElementById("cantidadDisponibles")
        .textContent = disponibles.length;


    document.getElementById("cantidadAgotados")
        .textContent = agotados.length;

}


// =========================
// VER PRODUCTO
// =========================

let productoSeleccionado = null;


function verProducto(id) {

    const productos =
        obtenerProductos();


    const producto =
        productos.find(function (item) {

            return item.id === id;

        });


    if (!producto) {

        alert(
            "No se encontró la información del producto."
        );

        return;

    }


    productoSeleccionado = id;


    document.getElementById("modalNombre")
        .textContent =
        producto.nombre || "-";


    document.getElementById("modalCodigo")
        .textContent =
        producto.codigo || "-";


    document.getElementById("modalCategoria")
        .textContent =
        producto.categoria || "-";


    const precio =
        Number(producto.precio) || 0;


    document.getElementById("modalPrecio")
        .textContent =
        "$" + precio.toLocaleString("es-CO");


    document.getElementById("modalTallas")
        .textContent =
        producto.tallas || "Única";


    document.getElementById("modalEstado")
        .textContent =
        producto.estado || "-";


    document.getElementById("modalProducto")
        .classList.add("activo");

}


// =========================
// CAMBIAR DISPONIBILIDAD
// =========================

document.getElementById("cambiarEstado")
    .addEventListener("click", function () {

        if (productoSeleccionado === null) {
            return;
        }


        const productos =
            obtenerProductos();


        const indice =
            productos.findIndex(function (producto) {

                return producto.id === productoSeleccionado;

            });


        if (indice === -1) {
            return;
        }


        if (productos[indice].estado === "Disponible") {

            productos[indice].estado = "Agotado";

        } else {

            productos[indice].estado = "Disponible";

        }


        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );


        cerrarModal();

        actualizarResumen();

        mostrarProductos();

    });


// =========================
// CERRAR MODAL
// =========================

function cerrarModal() {

    document.getElementById("modalProducto")
        .classList.remove("activo");

    productoSeleccionado = null;

}


document.getElementById("cerrarModal")
    .addEventListener("click", cerrarModal);


document.getElementById("cerrarModalBoton")
    .addEventListener("click", cerrarModal);


document.getElementById("modalProducto")
    .addEventListener("click", function (evento) {

        if (evento.target === this) {

            cerrarModal();

        }

    });


// =========================
// BUSCAR
// =========================

document.getElementById("buscarProducto")
    .addEventListener("input", function () {

        mostrarProductos();

    });


// =========================
// FILTRO CATEGORÍA
// =========================

document.getElementById("filtroCategoria")
    .addEventListener("change", function () {

        mostrarProductos();

    });


// =========================
// FILTRO ESTADO
// =========================

document.getElementById("filtroEstado")
    .addEventListener("change", function () {

        mostrarProductos();

    });


// =========================
// AGREGAR PRODUCTO
// =========================

document.getElementById("agregarProducto")
    .addEventListener("click", function () {

        window.location.href =
            "registro-producto-tienda.html";

    });


// =========================
// VOLVER A LA TIENDA
// =========================

document.getElementById("volverTienda")
    .addEventListener("click", function () {

        window.location.href =
            "tienda.html";

    });


// =========================
// CERRAR SESIÓN
// =========================

document.getElementById("cerrarSesion")
    .addEventListener("click", function () {

        localStorage.removeItem("sesionActiva");
        localStorage.removeItem("rolUsuario");

        localStorage.removeItem("usuarioVendedor");
        localStorage.removeItem("tiendaVendedor");
        localStorage.removeItem("idVendedor");

        window.location.href =
            "login.html";

    });

actualizarResumen();

mostrarProductos();
