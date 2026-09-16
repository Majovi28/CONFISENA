const nombreVendedor =
    localStorage.getItem("usuarioVendedor") || "Vendedor";

const tiendaVendedor =
    localStorage.getItem("tiendaVendedor") || "";


document.getElementById(
    "nombreVendedor"
).textContent = nombreVendedor;


/* =========================
   OBTENER TIENDA
========================= */

function obtenerTienda() {

    const tiendas =
        JSON.parse(
            localStorage.getItem("tiendas")
        ) || [];


    const tienda =
        tiendas.find(
            function (item) {

                return item.nombreTienda ===
                    tiendaVendedor;

            }
        );


    return tienda;

}


/* =========================
   MOSTRAR INFORMACIÓN
========================= */

function mostrarInformacion() {

    const tienda =
        obtenerTienda();


    if (!tienda) {

        document.getElementById(
            "nombreTienda"
        ).textContent =
            tiendaVendedor || "-";

        return;

    }


    document.getElementById(
        "nombreTienda"
    ).textContent =
        tienda.nombreTienda || "-";


    document.getElementById(
        "nitTienda"
    ).textContent =
        tienda.nit || "-";


    document.getElementById(
        "telefonoTienda"
    ).textContent =
        tienda.telefono || "-";


    document.getElementById(
        "correoTienda"
    ).textContent =
        tienda.correo || "-";


    document.getElementById(
        "direccionTienda"
    ).textContent =
        tienda.direccion || "-";


    document.getElementById(
        "barrioTienda"
    ).textContent =
        tienda.barrio || "-";


    document.getElementById(
        "localidadTienda"
    ).textContent =
        tienda.localidad || "-";


    document.getElementById(
        "gerenteTienda"
    ).textContent =
        tienda.nombreGerente || "-";


    document.getElementById(
        "vendedorTienda"
    ).textContent =
        tienda.nombreVendedor || "-";


    document.getElementById(
        "estadoTienda"
    ).textContent =
        tienda.estado || "-";


    if (tienda.estado === "Activa") {

        document.getElementById(
            "estadoTienda"
        ).style.color =
            "var(--verde)";

    }

}


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


mostrarInformacion();
