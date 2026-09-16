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
        "Consulta y administra los apartados de " +
        tiendaVendedor +
        ".";

}


/* =========================
   OBTENER APARTADOS
========================= */

function obtenerApartados() {

    return JSON.parse(
        localStorage.getItem("apartados")
    ) || [];

}


/* =========================
   MOSTRAR APARTADOS
========================= */

function mostrarApartados() {

    const apartados =
        obtenerApartados();


    const tabla =
        document.getElementById(
            "tablaApartados"
        );


    const busqueda =
        document.getElementById(
            "buscarApartado"
        ).value
            .toLowerCase()
            .trim();


    const filtro =
        document.getElementById(
            "filtroEstado"
        ).value;


    const apartadosFiltrados =
        apartados.filter(
            function (apartado) {


                const id =
                    String(
                        apartado.id ||
                        apartado.numeroApartado ||
                        ""
                    ).toLowerCase();


                const cliente =
                    (
                        apartado.nombreCliente ||
                        apartado.cliente ||
                        ""
                    ).toLowerCase();


                const producto =
                    (
                        apartado.producto ||
                        apartado.nombreProducto ||
                        ""
                    ).toLowerCase();


                const coincideBusqueda =
                    id.includes(busqueda) ||
                    cliente.includes(busqueda) ||
                    producto.includes(busqueda);


                const estado =
                    apartado.estadoApartado ||
                    apartado.estado ||
                    "Pendiente";


                const coincideEstado =
                    filtro === "Todos" ||
                    estado === filtro;


                return coincideBusqueda &&
                       coincideEstado;

            }
        );


    tabla.innerHTML = "";


    if (
        apartadosFiltrados.length === 0
    ) {

        tabla.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    class="sin-resultados"
                >
                    No se encontraron apartados.
                </td>

            </tr>

        `;

        return;

    }


    apartadosFiltrados.forEach(
        function (apartado) {


            const fila =
                document.createElement("tr");


            const id =
                apartado.id ||
                apartado.numeroApartado ||
                "-";


            const cliente =
                apartado.nombreCliente ||
                apartado.cliente ||
                "Cliente";


            const producto =
                apartado.producto ||
                apartado.nombreProducto ||
                "-";


            const cantidad =
                Number(
                    apartado.cantidad
                ) || 1;


            const total =
                Number(
                    apartado.totalApartado ||
                    apartado.total
                ) || 0;


            const abono =
                Number(
                    apartado.abonoApartado ||
                    apartado.abono
                ) || total * 0.50;


            const saldo =
                Number(
                    apartado.saldoApartado ||
                    apartado.saldo
                );


            const saldoFinal =
                isNaN(saldo)
                    ? total - abono
                    : saldo;


            const estado =
                apartado.estadoApartado ||
                apartado.estado ||
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


            if (
                estado === "Cancelado"
            ) {

                claseEstado =
                    "cancelado";

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
                    $${abono.toLocaleString("es-CO")}
                </td>

                <td>
                    $${saldoFinal.toLocaleString("es-CO")}
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
                        onclick="verApartado('${id}')"
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

    const apartados =
        obtenerApartados();


    const pendientes =
        apartados.filter(
            function (apartado) {

                return (
                    apartado.estadoApartado ||
                    apartado.estado ||
                    "Pendiente"
                ) === "Pendiente";

            }
        );


    let totalAbonos = 0;

    let totalSaldos = 0;


    apartados.forEach(
        function (apartado) {


            const total =
                Number(
                    apartado.totalApartado ||
                    apartado.total
                ) || 0;


            const abono =
                Number(
                    apartado.abonoApartado ||
                    apartado.abono
                ) || total * 0.50;


            const saldo =
                Number(
                    apartado.saldoApartado ||
                    apartado.saldo
                );


            totalAbonos += abono;


            if (isNaN(saldo)) {

                totalSaldos +=
                    total - abono;

            } else {

                totalSaldos += saldo;

            }

        }
    );


    document.getElementById(
        "totalApartados"
    ).textContent =
        apartados.length;


    document.getElementById(
        "apartadosPendientes"
    ).textContent =
        pendientes.length;


    document.getElementById(
        "totalAbonos"
    ).textContent =
        "$" +
        totalAbonos.toLocaleString("es-CO");


    document.getElementById(
        "totalSaldos"
    ).textContent =
        "$" +
        totalSaldos.toLocaleString("es-CO");

}


/* =========================
   MODAL
========================= */

let apartadoSeleccionado = null;


function verApartado(id) {

    const apartados =
        obtenerApartados();


    const apartado =
        apartados.find(
            function (item) {

                return String(
                    item.id ||
                    item.numeroApartado
                ) === String(id);

            }
        );


    if (!apartado) {

        alert(
            "No se encontró la información del apartado."
        );

        return;

    }


    apartadoSeleccionado =
        apartado.id ||
        apartado.numeroApartado;


    const cliente =
        apartado.nombreCliente ||
        apartado.cliente ||
        "Cliente";


    const correo =
        apartado.correoCliente ||
        apartado.correo ||
        "-";


    const telefono =
        apartado.telefonoCliente ||
        apartado.telefono ||
        "-";


    const producto =
        apartado.producto ||
        apartado.nombreProducto ||
        "-";


    const talla =
        apartado.talla ||
        "-";


    const cantidad =
        Number(
            apartado.cantidad
        ) || 1;


    const total =
        Number(
            apartado.totalApartado ||
            apartado.total
        ) || 0;


    const abono =
        Number(
            apartado.abonoApartado ||
            apartado.abono
        ) || total * 0.50;


    const saldo =
        Number(
            apartado.saldoApartado ||
            apartado.saldo
        );


    const saldoFinal =
        isNaN(saldo)
            ? total - abono
            : saldo;


    const fechaApartado =
        apartado.fechaApartado ||
        "-";


    const fechaEntrega =
        apartado.fechaEntrega ||
        "-";


    const fechaSalida =
        apartado.fechaSalida ||
        "-";


    const metodo =
        apartado.metodoAbono ||
        apartado.metodoPago ||
        "-";


    const estado =
        apartado.estadoApartado ||
        apartado.estado ||
        "Pendiente";


    document.getElementById(
        "modalId"
    ).textContent =
        "#" + apartadoSeleccionado;


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
        "modalFechaApartado"
    ).textContent =
        fechaApartado;


    document.getElementById(
        "modalFechaEntrega"
    ).textContent =
        fechaEntrega;


    document.getElementById(
        "modalFechaSalida"
    ).textContent =
        fechaSalida;


    document.getElementById(
        "modalTotal"
    ).textContent =
        "$" +
        total.toLocaleString("es-CO");


    document.getElementById(
        "modalAbono"
    ).textContent =
        "$" +
        abono.toLocaleString("es-CO");


    document.getElementById(
        "modalSaldo"
    ).textContent =
        "$" +
        saldoFinal.toLocaleString("es-CO");


    document.getElementById(
        "modalMetodo"
    ).textContent =
        metodo;


    document.getElementById(
        "modalEstado"
    ).textContent =
        estado;


    document.getElementById(
        "nuevoEstado"
    ).value =
        estado;


    document.getElementById(
        "modalApartado"
    ).classList.add("activo");

}


/* =========================
   GUARDAR ESTADO
========================= */

document.getElementById(
    "guardarEstado"
).addEventListener(
    "click",
    function () {


        if (
            apartadoSeleccionado === null
        ) {

            return;

        }


        const nuevoEstado =
            document.getElementById(
                "nuevoEstado"
            ).value;


        const apartados =
            obtenerApartados();


        const indice =
            apartados.findIndex(
                function (apartado) {

                    return String(
                        apartado.id ||
                        apartado.numeroApartado
                    ) ===
                    String(
                        apartadoSeleccionado
                    );

                }
            );


        if (indice === -1) {

            alert(
                "No se encontró el apartado."
            );

            return;

        }


        apartados[indice].estadoApartado =
            nuevoEstado;


        localStorage.setItem(
            "apartados",
            JSON.stringify(apartados)
        );


        alert(
            "El estado del apartado se actualizó correctamente."
        );


        cerrarModal();


        actualizarResumen();

        mostrarApartados();

    }
);


/* =========================
   CERRAR MODAL
========================= */

function cerrarModal() {

    document.getElementById(
        "modalApartado"
    ).classList.remove("activo");


    apartadoSeleccionado = null;

}


document.getElementById(
    "cerrarModal"
).addEventListener(
    "click",
    cerrarModal
);


document.getElementById(
    "modalApartado"
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
   BUSCADOR
========================= */

document.getElementById(
    "buscarApartado"
).addEventListener(
    "input",
    mostrarApartados
);


/* =========================
   FILTRO
========================= */

document.getElementById(
    "filtroEstado"
).addEventListener(
    "change",
    mostrarApartados
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

mostrarApartados();
