// ==========================================
// INFORMACIÓN DEL PRODUCTO
// ==========================================

const producto = localStorage.getItem("producto") || "Camisa de uniforme SENA";
const talla = localStorage.getItem("talla") || "M";
const cantidad = parseInt(localStorage.getItem("cantidad")) || 1;
const precio = parseInt(localStorage.getItem("precio")) || 60000;


// ==========================================
// MOSTRAR INFORMACIÓN DEL PRODUCTO
// ==========================================

document.getElementById("nombreProducto").textContent = producto;

document.getElementById("tallaProducto").textContent = talla;

document.getElementById("cantidadProducto").textContent = cantidad;

document.getElementById("precioProducto").textContent =
    "$" + precio.toLocaleString("es-CO");


// ==========================================
// CALCULAR TOTAL
// ==========================================

const total = precio * cantidad;

document.getElementById("totalPago").textContent =
    "$" + total.toLocaleString("es-CO");


// ==========================================
// MÉTODO DE PAGO
// ==========================================

const metodo = document.getElementById("metodo");

const datosTarjeta = document.getElementById("datosTarjeta");

metodo.addEventListener("change", function () {

    if (this.value === "tarjeta") {

        datosTarjeta.style.display = "block";

    } else {

        datosTarjeta.style.display = "none";

    }

});


// ==========================================
// TELÉFONO - MÁXIMO 10 DÍGITOS
// ==========================================

const telefono = document.getElementById("telefono");

telefono.addEventListener("input", function () {

    this.value = this.value
        .replace(/\D/g, "")
        .substring(0, 10);

});


// ==========================================
// NÚMERO DE TARJETA - MÁXIMO 16 DÍGITOS
// ==========================================

const numeroTarjeta = document.getElementById("numeroTarjeta");

numeroTarjeta.addEventListener("input", function () {

    let valor = this.value.replace(/\D/g, "");

    // Máximo 16 números
    valor = valor.substring(0, 16);

    // Separar cada 4 números
    valor = valor.replace(/(.{4})/g, "$1 ").trim();

    this.value = valor;

});


// ==========================================
// CVV - MÁXIMO 3 DÍGITOS
// ==========================================

const cvv = document.getElementById("cvv");

cvv.addEventListener("input", function () {

    this.value = this.value
        .replace(/\D/g, "")
        .substring(0, 3);

});


// ==========================================
// VENCIMIENTO - FORMATO MM/AA
// ==========================================

const vencimiento = document.getElementById("vencimiento");

vencimiento.addEventListener("input", function () {

    let valor = this.value.replace(/\D/g, "");

    // Máximo 4 números
    valor = valor.substring(0, 4);

    // Agregar / después de los dos primeros números
    if (valor.length > 2) {

        valor =
            valor.substring(0, 2) +
            "/" +
            valor.substring(2);

    }

    this.value = valor;

});


// ==========================================
// FORMULARIO DE PAGO
// ==========================================

const formulario = document.getElementById("formularioPago");

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();


    const nombre =
        document.getElementById("nombre").value.trim();

    const correo =
        document.getElementById("correo").value.trim();

    const telefonoValor =
        document.getElementById("telefono").value.trim();

    const metodoPago =
        document.getElementById("metodo").value;


    // ======================================
    // VALIDAR MÉTODO DE PAGO
    // ======================================

    if (metodoPago === "") {

        alert("Por favor selecciona un método de pago.");

        return;

    }


    // ======================================
    // VALIDAR TELÉFONO
    // ======================================

    if (telefonoValor.length !== 10) {

        alert("El número de teléfono debe tener exactamente 10 dígitos.");

        return;

    }


    // ======================================
    // VALIDAR TARJETA
    // ======================================

    if (metodoPago === "tarjeta") {

        const tarjeta =
            numeroTarjeta.value.replace(/\D/g, "");

        const cvvValor =
            cvv.value.replace(/\D/g, "");

        const vencimientoValor =
            vencimiento.value;


        if (tarjeta.length !== 16) {

            alert("El número de tarjeta debe tener exactamente 16 dígitos.");

            return;

        }


        if (cvvValor.length !== 3) {

            alert("El CVV debe tener exactamente 3 dígitos.");

            return;

        }


        if (vencimientoValor.length !== 5) {

            alert("El vencimiento debe tener el formato MM/AA.");

            return;

        }

    }


    // ======================================
    // GUARDAR INFORMACIÓN
    // ======================================

    localStorage.setItem("nombreCliente", nombre);

    localStorage.setItem("correoCliente", correo);

    localStorage.setItem("telefonoCliente", telefonoValor);

    localStorage.setItem("metodoPago", metodoPago);

    localStorage.setItem("totalPago", total);


    // ======================================
    // MENSAJE DE CONFIRMACIÓN
    // ======================================

    alert(
        "¡Pago registrado correctamente!\n\n" +

        "Producto: " + producto + "\n" +

        "Talla: " + talla + "\n" +

        "Cantidad: " + cantidad + "\n" +

        "Total: $" + total.toLocaleString("es-CO")
    );


    // ======================================
    // REGRESAR AL CATÁLOGO
    // ======================================

    window.location.href = "catalogo.html";

});