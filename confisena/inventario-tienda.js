const nombreVendedor =
    localStorage.getItem("usuarioVendedor") || "Vendedor";

const tiendaVendedor =
    localStorage.getItem("tiendaVendedor") || "";

document.getElementById("nombreVendedor").textContent =
    nombreVendedor;

if (tiendaVendedor !== "") {
    document.getElementById("nombreTiendaTexto").textContent =
        "Controla el inventario y los movimientos de " +
        tiendaVendedor +
        ".";
}


/* =========================
   PRODUCTOS
========================= */

function obtenerProductos() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}


/* =========================
   INVENTARIO
========================= */

function obtenerInventario() {

    return JSON.parse(
        localStorage.getItem("inventario")
    ) || [];
}


/* =========================
   CREAR INVENTARIO
   PARA PRODUCTOS NUEVOS
========================= */

function prepararInventario() {

    const productos = obtenerProductos();

    let inventario = obtenerInventario();

    productos.forEach(function (producto) {

        const existe = inventario.some(function (item) {

            return item.productoId === producto.id;

        });

        if (!existe) {

            inventario.push({

                id: Date.now() + Math.random(),

                productoId: producto.id,

                nombre: producto.nombre,

                codigo: producto.codigo,

                proveedor: producto.proveedor || "No registrado",

                precio: Number(producto.precio) || 0,

                cantidad: 0,

                entradas: 0,

                salidas: 0,

                tienda: producto.tienda || tiendaVendedor

            });

        }

    });

    localStorage.setItem(
        "inventario",
        JSON.stringify(inventario)
    );
}


/* =========================
   MOSTRAR INVENTARIO
========================= */

function mostrarInventario() {

    prepararInventario();

    const inventario = obtenerInventario();

    const tabla =
        document.getElementById("tablaInventario");

    const busqueda =
        document.getElementById("buscarProducto")
            .value
            .toLowerCase()
            .trim();

    const filtro =
        document.getElementById("filtroInventario").value;

    const inventarioFiltrado =
        inventario.filter(function (item) {

            const nombre =
                (item.nombre || "")
                .toLowerCase();

            const codigo =
                (item.codigo || "")
                .toLowerCase();

            const coincideBusqueda =
                nombre.includes(busqueda) ||
                codigo.includes(busqueda);

            let coincideFiltro = true;

            if (filtro === "Disponible") {

                coincideFiltro =
                    Number(item.cantidad) > 0;

            }

            if (filtro === "Agotado") {

                coincideFiltro =
                    Number(item.cantidad) === 0;

            }

            return coincideBusqueda &&
                   coincideFiltro;

        });


    tabla.innerHTML = "";


    if (inventarioFiltrado.length === 0) {

        tabla.innerHTML = `
            <tr>
                <td colspan="9" class="sin-resultados">
                    No se encontraron productos en el inventario.
                </td>
            </tr>
        `;

        return;
    }


    inventarioFiltrado.forEach(function (item) {

        const fila =
            document.createElement("tr");

        const cantidad =
            Number(item.cantidad) || 0;

        const entradas =
            Number(item.entradas) || 0;

        const salidas =
            Number(item.salidas) || 0;

        const precio =
            Number(item.precio) || 0;


        const estado =
            cantidad > 0
                ? "Disponible"
                : "Agotado";


        const claseEstado =
            cantidad > 0
                ? "disponible"
                : "agotado";


        fila.innerHTML = `

            <td>
                <strong>
                    ${item.nombre || "-"}
                </strong>
            </td>

            <td>
                ${item.codigo || "-"}
            </td>

            <td>
                ${item.proveedor || "-"}
            </td>

            <td>
                $${precio.toLocaleString("es-CO")}
            </td>

            <td>
                <strong>
                    ${cantidad}
                </strong>
            </td>

            <td>
                ${entradas}
            </td>

            <td>
                ${salidas}
            </td>

            <td>

                <span class="estado ${claseEstado}">
                    ${estado}
                </span>

            </td>

            <td>

                <button
                    class="boton-ver"
                    onclick="verInventario(${item.productoId})"
                >
                    Gestionar
                </button>

            </td>

        `;

        tabla.appendChild(fila);

    });
}


/* =========================
   RESUMEN
========================= */

function actualizarResumen() {

    prepararInventario();

    const inventario =
        obtenerInventario();


    let totalUnidades = 0;

    let totalEntradas = 0;

    let totalSalidas = 0;


    inventario.forEach(function (item) {

        totalUnidades +=
            Number(item.cantidad) || 0;

        totalEntradas +=
            Number(item.entradas) || 0;

        totalSalidas +=
            Number(item.salidas) || 0;

    });


    document.getElementById(
        "cantidadProductos"
    ).textContent = inventario.length;


    document.getElementById(
        "cantidadUnidades"
    ).textContent = totalUnidades;


    document.getElementById(
        "cantidadEntradas"
    ).textContent = totalEntradas;


    document.getElementById(
        "cantidadSalidas"
    ).textContent = totalSalidas;
}


/* =========================
   MODAL
========================= */

let productoSeleccionado = null;

let tipoMovimiento = null;


function verInventario(productoId) {

    const inventario =
        obtenerInventario();


    const item =
        inventario.find(function (producto) {

            return producto.productoId === productoId;

        });


    if (!item) {

        alert(
            "No se encontró la información del inventario."
        );

        return;
    }


    productoSeleccionado = productoId;


    document.getElementById(
        "modalNombre"
    ).textContent =
        item.nombre || "-";


    document.getElementById(
        "modalCodigo"
    ).textContent =
        item.codigo || "-";


    document.getElementById(
        "modalProveedor"
    ).textContent =
        item.proveedor || "-";


    document.getElementById(
        "modalCantidad"
    ).textContent =
        Number(item.cantidad) || 0;


    document.getElementById(
        "modalInventario"
    ).classList.add("activo");

}


/* =========================
   ENTRADA
========================= */

document.getElementById(
    "botonEntrada"
).addEventListener(
    "click",
    function () {

        tipoMovimiento = "entrada";

        mostrarFormularioMovimiento();

    }
);


/* =========================
   SALIDA
========================= */

document.getElementById(
    "botonSalida"
).addEventListener(
    "click",
    function () {

        tipoMovimiento = "salida";

        mostrarFormularioMovimiento();

    }
);


/* =========================
   MOSTRAR FORMULARIO
========================= */

function mostrarFormularioMovimiento() {

    const formulario =
        document.getElementById(
            "formularioMovimiento"
        );


    formulario.classList.add("activo");


    document.getElementById(
        "cantidadMovimiento"
    ).value = "";


    document.getElementById(
        "cantidadMovimiento"
    ).focus();

}


/* =========================
   GUARDAR MOVIMIENTO
========================= */

document.getElementById(
    "guardarMovimiento"
).addEventListener(
    "click",
    function () {

        if (productoSeleccionado === null) {

            return;

        }


        const cantidadMovimiento =
            Number(
                document.getElementById(
                    "cantidadMovimiento"
                ).value
            );


        if (
            isNaN(cantidadMovimiento) ||
            cantidadMovimiento <= 0
        ) {

            alert(
                "Ingresa una cantidad válida."
            );

            return;

        }


        const inventario =
            obtenerInventario();


        const indice =
            inventario.findIndex(
                function (item) {

                    return item.productoId ===
                        productoSeleccionado;

                }
            );


        if (indice === -1) {

            alert(
                "No se encontró el producto."
            );

            return;

        }


        /* ENTRADA */

        if (tipoMovimiento === "entrada") {

            inventario[indice].cantidad +=
                cantidadMovimiento;

            inventario[indice].entradas +=
                cantidadMovimiento;

        }


        /* SALIDA */

        if (tipoMovimiento === "salida") {

            const cantidadActual =
                Number(
                    inventario[indice].cantidad
                ) || 0;


            if (
                cantidadMovimiento >
                cantidadActual
            ) {

                alert(
                    "No puedes registrar una salida mayor a las unidades disponibles."
                );

                return;

            }


            inventario[indice].cantidad -=
                cantidadMovimiento;

            inventario[indice].salidas +=
                cantidadMovimiento;

        }


        localStorage.setItem(
            "inventario",
            JSON.stringify(inventario)
        );


        const mensaje =
            tipoMovimiento === "entrada"
                ? "Entrada registrada correctamente."
                : "Salida registrada correctamente.";


        alert(mensaje);


        cerrarModal();


        actualizarResumen();

        mostrarInventario();

    }
);


/* =========================
   CANCELAR MOVIMIENTO
========================= */

document.getElementById(
    "cancelarMovimiento"
).addEventListener(
    "click",
    function () {

        document.getElementById(
            "formularioMovimiento"
        ).classList.remove("activo");

        tipoMovimiento = null;

    }
);


/* =========================
   CERRAR MODAL
========================= */

function cerrarModal() {

    document.getElementById(
        "modalInventario"
    ).classList.remove("activo");


    document.getElementById(
        "formularioMovimiento"
    ).classList.remove("activo");


    productoSeleccionado = null;

    tipoMovimiento = null;

}


document.getElementById(
    "cerrarModal"
).addEventListener(
    "click",
    cerrarModal
);


document.getElementById(
    "modalInventario"
).addEventListener(
    "click",
    function (evento) {

        if (evento.target === this) {

            cerrarModal();

        }

    }
);


/* =========================
   BUSCADOR
========================= */

document.getElementById(
    "buscarProducto"
).addEventListener(
    "input",
    mostrarInventario
);


/* =========================
   FILTRO
========================= */

document.getElementById(
    "filtroInventario"
).addEventListener(
    "change",
    mostrarInventario
);


/* =========================
   VOLVER A TIENDA
========================= */

document.getElementById(
    "volverTienda"
).addEventListener(
    "click",
    function () {

        window.location.href =
            "tienda.html";

    }
);


/* =========================
   CERRAR SESIÓN
========================= */

document.getElementById(
    "cerrarSesion"
).addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "sesionActiva"
        );

        localStorage.removeItem(
            "rolUsuario"
        );

        localStorage.removeItem(
            "usuarioVendedor"
        );

        localStorage.removeItem(
            "tiendaVendedor"
        );

        localStorage.removeItem(
            "idVendedor"
        );


        window.location.href =
            "login.html";

    }
);




prepararInventario();

actualizarResumen();

mostrarInventario();