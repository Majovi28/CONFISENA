const nombreVendedor =
    localStorage.getItem("usuarioVendedor") || "Vendedor";

const tiendaVendedor =
    localStorage.getItem("tiendaVendedor") || "";

document.getElementById("nombreVendedor").textContent =
    nombreVendedor;


// =========================
// FORMULARIO
// =========================

const formulario =
    document.getElementById("formularioProducto");


formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();


    // =========================
    // OBTENER DATOS
    // =========================

    const nombre =
        document.getElementById("nombreProducto")
            .value
            .trim();

    const codigo =
        document.getElementById("codigoProducto")
            .value
            .trim()
            .toUpperCase();

    const categoria =
        document.getElementById("categoriaProducto")
            .value;

    const precio =
        Number(
            document.getElementById("precioProducto")
                .value
        );

    const proveedor =
        document.getElementById("proveedorProducto")
            .value
            .trim();

    const tallas =
        document.getElementById("tallasProducto")
            .value
            .trim();

    const estado =
        document.getElementById("estadoProducto")
            .value;

    const descripcion =
        document.getElementById("descripcionProducto")
            .value
            .trim();


    // =========================
    // VALIDACIONES
    // =========================

    if (nombre === "") {

        alert("Por favor escribe el nombre del producto.");

        return;
    }


    if (codigo === "") {

        alert("Por favor escribe el código del producto.");

        return;
    }


    if (categoria === "") {

        alert("Por favor selecciona una categoría.");

        return;
    }


    if (precio <= 0 || isNaN(precio)) {

        alert("El precio debe ser mayor que 0.");

        return;
    }


    if (proveedor === "") {

        alert("Por favor escribe el proveedor.");

        return;
    }


    if (tallas === "") {

        alert("Por favor escribe las tallas.");

        return;
    }


    // =========================
    // OBTENER PRODUCTOS
    // =========================

    const productos =
        JSON.parse(
            localStorage.getItem("productos")
        ) || [];


    // =========================
    // COMPROBAR CÓDIGO DUPLICADO
    // =========================

    const codigoExiste =
        productos.some(function (producto) {

            return producto.codigo === codigo;

        });


    if (codigoExiste) {

        alert(
            "Ya existe un producto registrado con ese código."
        );

        return;
    }


    // =========================
    // CREAR PRODUCTO
    // =========================

    const nuevoProducto = {

        id: Date.now(),

        nombre: nombre,

        codigo: codigo,

        categoria: categoria,

        precio: precio,

        proveedor: proveedor,

        tallas: tallas,

        estado: estado,

        descripcion: descripcion,

        tienda: tiendaVendedor

    };


    // =========================
    // GUARDAR
    // =========================

    productos.push(nuevoProducto);


    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );


    // =========================
    // MENSAJE
    // =========================

    alert(
        "Producto registrado correctamente."
    );


    // =========================
    // VOLVER
    // =========================

    window.location.href =
        "productos-tienda.html";

});


// =========================
// CANCELAR
// =========================

document.getElementById("cancelar")
    .addEventListener("click", function () {

        window.location.href =
            "productos-tienda.html";

    });


// =========================
// VOLVER A PRODUCTOS
// =========================

document.getElementById("volverProductos")
    .addEventListener("click", function () {

        window.location.href =
            "productos-tienda.html";

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