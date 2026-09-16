// ==========================================
// INFORMACIÓN DEL PRODUCTO
// ==========================================

const producto =
    localStorage.getItem("producto") ||
    "Camisa de uniforme SENA";

const talla =
    localStorage.getItem("talla") ||
    "M";

const cantidad =
    parseInt(localStorage.getItem("cantidad")) || 1;

const precio =
    parseInt(localStorage.getItem("precio")) || 60000;



// ==========================================
// MOSTRAR INFORMACIÓN
// ==========================================

document.getElementById("nombreProducto").textContent =
    producto;

document.getElementById("tallaProducto").textContent =
    talla;

document.getElementById("cantidadProducto").textContent =
    cantidad;

document.getElementById("precioProducto").textContent =
    "$" + precio.toLocaleString("es-CO");



// ==========================================
// CALCULAR VALORES
// ==========================================

// Valor total

const total = precio * cantidad;


// Abono del 50%

const abono = total * 0.50;


// Saldo pendiente

const saldo = total - abono;



// ==========================================
// MOSTRAR VALORES
// ==========================================

document.getElementById("totalApartado").textContent =
    "$" + total.toLocaleString("es-CO");

document.getElementById("abonoApartado").textContent =
    "$" + abono.toLocaleString("es-CO");

document.getElementById("saldoApartado").textContent =
    "$" + saldo.toLocaleString("es-CO");



// ==========================================
// FECHA MÍNIMA
// ==========================================

const fechaEntrega =
    document.getElementById("fechaEntrega");

const hoy = new Date();

const año = hoy.getFullYear();

const mes =
    String(hoy.getMonth() + 1).padStart(2, "0");

const dia =
    String(hoy.getDate()).padStart(2, "0");

const fechaActual =
    `${año}-${mes}-${dia}`;

fechaEntrega.min = fechaActual;



// ==========================================
// MÉTODO DE PAGO
// ==========================================

const metodoAbono =
    document.getElementById("metodoAbono");

const datosTarjeta =
    document.getElementById("datosTarjeta");


metodoAbono.addEventListener("change", function () {

    if (this.value === "tarjeta") {

        datosTarjeta.style.display = "block";

    } else {

        datosTarjeta.style.display = "none";

    }

});



// ==========================================
// TELÉFONO - MÁXIMO 10 DÍGITOS
// ==========================================

const telefono =
    document.getElementById("telefono");


telefono.addEventListener("input", function () {

    this.value = this.value
        .replace(/\D/g, "")
        .substring(0, 10);

});



// ==========================================
// TARJETA - MÁXIMO 16 DÍGITOS
// ==========================================

const numeroTarjeta =
    document.getElementById("numeroTarjeta");


numeroTarjeta.addEventListener("input", function () {

    let valor =
        this.value.replace(/\D/g, "");


    // Máximo 16 números

    valor =
        valor.substring(0, 16);


    // Separar cada 4 números

    valor =
        valor.replace(/(.{4})/g, "$1 ").trim();


    this.value = valor;

});



// ==========================================
// CVV - MÁXIMO 3 DÍGITOS
// ==========================================

const cvv =
    document.getElementById("cvv");


cvv.addEventListener("input", function () {

    this.value = this.value
        .replace(/\D/g, "")
        .substring(0, 3);

});



// ==========================================
// VENCIMIENTO MM/AA
// ==========================================

const vencimiento =
    document.getElementById("vencimiento");


vencimiento.addEventListener("input", function () {

    let valor =
        this.value.replace(/\D/g, "");


    // Máximo 4 números

    valor =
        valor.substring(0, 4);


    // Agregar /

    if (valor.length > 2) {

        valor =
            valor.substring(0, 2) +
            "/" +
            valor.substring(2);

    }


    this.value = valor;

});



// ==========================================
// FORMULARIO
// ==========================================

const formulario =
    document.getElementById("formularioApartado");


formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();



    // ======================================
    // DATOS DEL USUARIO
    // ======================================

    const nombre =
        document.getElementById("nombre")
        .value.trim();

    const correo =
        document.getElementById("correo")
        .value.trim();

    const telefonoValor =
        document.getElementById("telefono")
        .value.trim();

    const tienda =
        document.getElementById("tienda")
        .value;

    const fecha =
        document.getElementById("fechaEntrega")
        .value;

    const metodo =
        document.getElementById("metodoAbono")
        .value;



    // ======================================
    // VALIDAR TELÉFONO
    // ======================================

    if (telefonoValor.length !== 10) {

        alert(
            "El número de teléfono debe tener exactamente 10 dígitos."
        );

        return;

    }



    // ======================================
    // VALIDAR MÉTODO
    // ======================================

    if (metodo === "") {

        alert(
            "Por favor selecciona un método de pago para el abono."
        );

        return;

    }



    // ======================================
    // VALIDAR TARJETA
    // ======================================

    if (metodo === "tarjeta") {


        const tarjeta =
            numeroTarjeta.value.replace(/\D/g, "");


        const cvvValor =
            cvv.value.replace(/\D/g, "");


        const vencimientoValor =
            vencimiento.value;



        if (tarjeta.length !== 16) {

            alert(
                "El número de tarjeta debe tener exactamente 16 dígitos."
            );

            return;

        }



        if (cvvValor.length !== 3) {

            alert(
                "El CVV debe tener exactamente 3 dígitos."
            );

            return;

        }



        if (vencimientoValor.length !== 5) {

            alert(
                "El vencimiento debe tener el formato MM/AA."
            );

            return;

        }

    }



    // ======================================
    // GUARDAR INFORMACIÓN
    // ======================================

    localStorage.setItem(
        "nombreCliente",
        nombre
    );

    localStorage.setItem(
        "correoCliente",
        correo
    );

    localStorage.setItem(
        "telefonoCliente",
        telefonoValor
    );

    localStorage.setItem(
        "tiendaApartado",
        tienda
    );

    localStorage.setItem(
        "fechaEntrega",
        fecha
    );

    localStorage.setItem(
        "metodoAbono",
        metodo
    );

    localStorage.setItem(
        "totalApartado",
        total
    );

    localStorage.setItem(
        "abonoApartado",
        abono
    );

    localStorage.setItem(
        "saldoApartado",
        saldo
    );

    localStorage.setItem(
        "estadoApartado",
        "Pendiente"
    );



    // ======================================
    // CONFIRMACIÓN
    // ======================================

    alert(

        "¡Apartado realizado correctamente!\n\n" +

        "Producto: " + producto + "\n" +

        "Talla: " + talla + "\n" +

        "Cantidad: " + cantidad + "\n" +

        "Tienda: " + tienda + "\n" +

        "Fecha de entrega: " + fecha + "\n\n" +

        "Total: $" +
        total.toLocaleString("es-CO") + "\n" +

        "Abono (50%): $" +
        abono.toLocaleString("es-CO") + "\n" +

        "Saldo pendiente: $" +
        saldo.toLocaleString("es-CO")

    );



    // ======================================
    // REGRESAR AL CATÁLOGO
    // ======================================

    window.location.href =
        "catalogo.html";

});