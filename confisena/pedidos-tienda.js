const nombreVendedor =
    localStorage.getItem("usuarioVendedor") || "Vendedor";

const tiendaVendedor =
    localStorage.getItem("tiendaVendedor") || "";


document.getElementById(
    "nombreVendedor"
).textContent = nombreVendedor;


if (tiendaVendedor !== "") {

    document.getElementById(
        "nombreTiendaTexto"
    ).textContent =
        "Consulta y administra los pedidos de " +
        tiendaVendedor +
        ".";

}


/* =========================
   OBTENER PEDIDOS
========================= */

function obtenerPedidos() {

    return JSON.parse(
        localStorage.getItem("pedidos")
    ) || [];

}


/* =========================
   MOSTRAR PEDIDOS
========================= */

function mostrarPedidos() {

    const pedidos =
        obtenerPedidos();


    const tabla =
        document.getElementById(
            "tablaPedidos"
        );


    const busqueda =
        document.getElementById(
            "buscarPedido"
        ).value
            .toLowerCase()
            .trim();


    const filtro =
        document.getElementById(
            "filtroEstado"
        ).value;


    const pedidosFiltrados =
        pedidos.filter(function (pedido) {


            const id =
                String(
                    pedido.id ||
                    pedido.numeroPedido ||
                    ""
                ).toLowerCase();


            const cliente =
                (
                    pedido.cliente ||
                    pedido.nombreCliente ||
                    ""
                ).toLowerCase();


            const producto =
                (
                    pedido.producto ||
                    pedido.nombreProducto ||
                    ""
                ).toLowerCase();


            const coincideBusqueda =
                id.includes(busqueda) ||
                cliente.includes(busqueda) ||
                producto.includes(busqueda);


            const estado =
                pedido.estado ||
                "Pendiente";


            const coincideEstado =
                filtro === "Todos" ||
                estado === filtro;


            return coincideBusqueda &&
                   coincideEstado;

        });


    tabla.innerHTML = "";


    if (
        pedidosFiltrados.length === 0
    ) {

        tabla.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    class="sin-resultados"
                >
                    No se encontraron pedidos.
                </td>

            </tr>

        `;

        return;

    }


    pedidosFiltrados.forEach(
        function (pedido) {


            const fila =
                document.createElement("tr");


            const id =
                pedido.id ||
                pedido.numeroPedido ||
                "-";


            const cliente =
                pedido.cliente ||
                pedido.nombreCliente ||
                "Cliente";


            const producto =
                pedido.producto ||
                pedido.nombreProducto ||
                "-";


            const cantidad =
                Number(
                    pedido.cantidad
                ) || 1;


            const total =
                Number(
                    pedido.total
                ) || 0;


            const fecha =
                pedido.fecha ||
                pedido.fechaPedido ||
                "-";


            const estado =
                pedido.estado ||
                "Pendiente";


            let claseEstado =
                "pendiente";


            if (
                estado === "Preparando"
            ) {

                claseEstado =
                    "preparando";

            }


            if (
                estado === "Listo para entregar"
            ) {

                claseEstado =
                    "listo";

            }


            if (
                estado === "Entregado"
            ) {

                claseEstado =
                    "entregado";

            }


            fila.innerHTML = `

                <td>
                    <strong>
                        #${id}
                    </strong>
                </td>

                <td>
                    ${cliente}
                </td>

                <td>
                    ${producto}
                </td>

                <td>
                    ${cantidad}
                </td>

                <td>
                    $${total.toLocaleString("es-CO")}
                </td>

                <td>
                    ${fecha}
                </td>

                <td>

                    <span
                        class="estado ${claseEstado}"
                    >
                        ${estado}
                    </span>

                </td>

                <td>

                    <button
                        class="boton-ver"
                        onclick="verPedido('${id}')"
                    >
                        Ver
                    </button>

                </td>

            `;


            tabla.appendChild(fila);

        }
    );

}


/* =========================
   RESUMEN
========================= */

function actualizarResumen() {

    const pedidos =
        obtenerPedidos();


    const pendientes =
        pedidos.filter(
            function (pedido) {

                return (
                    pedido.estado ||
                    "Pendiente"
                ) === "Pendiente";

            }
        );


    const preparando =
        pedidos.filter(
            function (pedido) {

                return (
                    pedido.estado ||
                    ""
                ) === "Preparando";

            }
        );


    const entregados =
        pedidos.filter(
            function (pedido) {

                return (
                    pedido.estado ||
                    ""
                ) === "Entregado";

            }
        );


    document.getElementById(
        "totalPedidos"
   

Maria Villegas <majovica2808@gmail.com>
4:01 p.m. (hace 0 minutos)
para mi

    ).textContent =
        pedidos.length;


    document.getElementById(
        "pedidosPendientes"
    ).textContent =
        pendientes.length;


    document.getElementById(
        "pedidosPreparando"
    ).textContent =
        preparando.length;


    document.getElementById(
        "pedidosEntregados"
    ).textContent =
        entregados.length;

}


/* =========================
   MODAL
========================= */

let pedidoSeleccionado = null;


function verPedido(id) {

    const pedidos =
        obtenerPedidos();


    const pedido =
        pedidos.find(
            function (item) {

                return String(
                    item.id ||
                    item.numeroPedido
                ) === String(id);

            }
        );


    if (!pedido) {

        alert(
            "No se encontró la información del pedido."
        );

        return;

    }


    pedidoSeleccionado =
        pedido.id ||
        pedido.numeroPedido;


    const cliente =
        pedido.cliente ||
        pedido.nombreCliente ||
        "Cliente";


    const correo =
        pedido.correo ||
        pedido.correoCliente ||
        "-";


    const telefono =
        pedido.telefono ||
        pedido.telefonoCliente ||
        "-";


    const producto =
        pedido.producto ||
        pedido.nombreProducto ||
        "-";


    const talla =
        pedido.talla ||
        "-";


    const cantidad =
        Number(
            pedido.cantidad
        ) || 1;


    const precio =
        Number(
            pedido.precio
        ) || 0;


    const total =
        Number(
            pedido.total
        ) ||
        precio * cantidad;


    const fecha =
        pedido.fecha ||
        pedido.fechaPedido ||
        "-";


    const direccion =
        pedido.direccion ||
        pedido.direccionEntrega ||
        "-";


    const estado =
        pedido.estado ||
        "Pendiente";


    document.getElementById(
        "modalPedidoId"
    ).textContent =
        "#" + pedidoSeleccionado;


    document.getElementById(
        "modalCliente"
    ).textContent =
        cliente;


    document.getElementById(
        "modalCorreo"
    ).textContent =
        correo;


    document.getElementById(
        "modalTelefono"
    ).textContent =
        telefono;


    document.getElementById(
        "modalProducto"
    ).textContent =
        producto;


    document.getElementById(
        "modalTalla"
    ).textContent =
        talla;


    document.getElementById(
        "modalCantidad"
    ).textContent =
        cantidad;


    document.getElementById(
        "modalPrecio"
    ).textContent =
        "$" +
        precio.toLocaleString("es-CO");


    document.getElementById(
        "modalTotal"
    ).textContent =
        "$" +
        total.toLocaleString("es-CO");


    document.getElementById(
        "modalFecha"
    ).textContent =
        fecha;


    document.getElementById(
        "modalDireccion"
    ).textContent =
        direccion;


    document.getElementById(
        "modalEstado"
    ).textContent =
        estado;


    document.getElementById(
        "nuevoEstado"
    ).value =
        estado;


    document.getElementById(
        "modalPedido"
    ).classList.add("activo");

}


/* =========================
   GUARDAR NUEVO ESTADO
========================= */

document.getElementById(
    "guardarEstado"
).addEventListener(
    "click",
    function () {


        if (
            pedidoSeleccionado === null
        ) {

            return;

        }


        const nuevoEstado =
            document.getElementById(
                "nuevoEstado"
            ).value;


        const pedidos =
            obtenerPedidos();


        const indice =
            pedidos.findIndex(
                function (pedido) {

                    return String(
                        pedido.id ||
                        pedido.numeroPedido
                    ) ===
                    String(
                        pedidoSeleccionado
                    );

                }
            );


        if (indice === -1) {

            alert(
                "No se encontró el pedido."
            );

            return;

        }


        pedidos[indice].estado =
            nuevoEstado;


        localStorage.setItem(
            "pedidos",
            JSON.stringify(pedidos)
        );


        alert(
            "El estado del pedido se actualizó correctamente."
        );


        cerrarModal();


        actualizarResumen();

        mostrarPedidos();

    }
);


/* =========================
   CERRAR MODAL
========================= */

function cerrarModal() {

    document.getElementById(
        "modalPedido"
    ).classList.remove("activo");


    pedidoSeleccionado = null;

}


document.getElementById(
    "cerrarModal"
).addEventListener(
    "click",
    cerrarModal
);


document.getElementById(
    "modalPedido"
).addEventListener(
    "click",
    function (evento) {

        if (
            evento.target === this
        ) {

            cerrarModal();

        }

    }
);


/* =========================
   BUSCAR
========================= */

document.getElementById(
    "buscarPedido"
).addEventListener(
    "input",
    mostrarPedidos
);


/* =========================
   FILTRO
========================= */

document.getElementById(
    "filtroEstado"
).addEventListener(
    "change",
    mostrarPedidos
);


/* =========================
   VOLVER
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


actualizarResumen();

mostrarPedidos();