const botonesTalla = document.querySelectorAll(".talla");

let tallaSeleccionada = "M";

botonesTalla.forEach((boton) => {

    boton.addEventListener("click", () => {

        // Quitar selección anterior
        botonesTalla.forEach((item) => {
            item.classList.remove("seleccionada");
        });

        // Seleccionar la nueva talla
        boton.classList.add("seleccionada");

        tallaSeleccionada = boton.textContent.trim();

        console.log("Talla seleccionada:", tallaSeleccionada);
    });

});


// =========================================
// CANTIDAD
// =========================================

const botonMenos = document.querySelector(".contador button:first-child");
const botonMas = document.querySelector(".contador button:last-child");
const cantidadTexto = document.querySelector(".contador span");

let cantidad = 1;

// Cantidad máxima de ejemplo
const cantidadMaxima = 10;


// =========================================
// BOTÓN +
// =========================================

botonMas.addEventListener("click", () => {

    if (cantidad < cantidadMaxima) {

        cantidad++;

        actualizarCantidad();

    }

});


// =========================================
// BOTÓN -
// =========================================

botonMenos.addEventListener("click", () => {

    if (cantidad > 1) {

        cantidad--;

        actualizarCantidad();

    }

});


// =========================================
// ACTUALIZAR CANTIDAD
// =========================================

function actualizarCantidad() {

    cantidadTexto.textContent = cantidad;

    actualizarTotal();

    console.log("Cantidad:", cantidad);

}


// =========================================
// PRECIO
// =========================================

const precioUnitario = 60000;

const precioElemento = document.querySelector(".precio");


// Crear elemento para mostrar total
const totalElemento = document.createElement("p");

totalElemento.classList.add("precio-total");

precioElemento.insertAdjacentElement(
    "afterend",
    totalElemento
);


// =========================================
// ACTUALIZAR PRECIO TOTAL
// =========================================

function actualizarTotal() {

    const total = precioUnitario * cantidad;

    totalElemento.textContent =
        "Total: $" + total.toLocaleString("es-CO");

}


// Mostrar total inicialmente
actualizarTotal();


// =========================================
// COMPRAR
// =========================================

const botonComprar = document.querySelector(".boton.comprar");

botonComprar.addEventListener("click", (evento) => {

    evento.preventDefault();

    if (!tallaSeleccionada) {

        alert("Por favor selecciona una talla.");

        return;

    }

    // Guardar información temporalmente
    localStorage.setItem(
        "producto",
        "Camisa de uniforme SENA"
    );

    localStorage.setItem(
        "talla",
        tallaSeleccionada
    );

    localStorage.setItem(
        "cantidad",
        cantidad
    );

    localStorage.setItem(
        "precio",
        precioUnitario
    );

    // Ir al pago
    window.location.href = "pago.html";

});


// =========================================
// APARTAR
// =========================================

const botonApartar = document.querySelector(".boton.apartar");

botonApartar.addEventListener("click", (evento) => {

    evento.preventDefault();

    if (!tallaSeleccionada) {

        alert("Por favor selecciona una talla.");

        return;

    }

    // Guardar información temporalmente
    localStorage.setItem(
        "producto",
        "Camisa de uniforme SENA"
    );

    localStorage.setItem(
        "talla",
        tallaSeleccionada
    );

    localStorage.setItem(
        "cantidad",
        cantidad
    );

    localStorage.setItem(
        "precio",
        precioUnitario
    );

    // Ir al apartado
    window.location.href = "apartado.html";

});