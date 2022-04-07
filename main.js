const productosAGenerar = []
const productoAgregado = []


// CREO ARRAY PRODUCTOS
const productos = [
    { id: 0, categoria: 'Calzado', titulo: 'Alpargatas Animal Print', precio: 2200, stock: 0, img: "../assets/images/calzado/alpargatas__animal__01.jpg" },
    { id: 1, categoria: 'Calzado', titulo: 'Alpargatas Azul', precio: 1750, stock: 10, img: "/assets/images/calzado/alpargatas__azules__01.jpg" },
    { id: 2, categoria: 'Cuchillos', titulo: 'Cuchillo Criollo', precio: 1400, stock: 5, img: "/assets/images/cuchillos/cuchillos__01.jpg" },
    { id: 3, categoria: 'Cuchillos', titulo: 'Cuchillo La Mission', precio: 800, stock: 20, img: "/assets/images/cuchillos/cuchillos__02.jpg" },
    { id: 4, categoria: 'Bolsos', titulo: 'Chuna Autobag', precio: 2200, stock: 0, img: "/assets/images/mate/verticales/autobag__chuna__01.jpg" },
    { id: 5, categoria: 'Bolsos', titulo: 'Bolso Matero Chuna Amarillo', precio: 2200, stock: 0, img: "/assets/images/mate/verticales/bolso__chuna__amarillo.jpg" },
    { id: 6, categoria: 'Mates', titulo: 'Mates Chuna', precio: 2200, stock: 15, img: "/assets/images/mate/verticales/mates__chuna__01.jpg" },
    { id: 7, categoria: 'Mates', titulo: 'Mates Jarrito', precio: 2000, stock: 20, img: "/assets/images/mate/verticales/mates__jarrito__06.jpg" },
    { id: 8, categoria: 'Accesorios Calzado', titulo: 'Plantillas Corderito', precio: 200, stock: 0, img: "/assets/images/plantillas/plantillas__01.jpg" },
    { id: 9, categoria: 'Accesorios Calzado', titulo: 'Plantillas Ortopedicas', precio: 220, stock: 80, img: "/assets/images/plantillas/plantillas__03.jpg" },
];

const agregarAlCarrito = (idProducto) => {
    const valorDeCantidad = document.getElementById(
        `cantidad-${idProducto}`
    ).value;

    // Busco el producto a agregar
    const productoAgregado = productos.find(producto => producto.id === idProducto);
    productoAgregado.cantidad = valorDeCantidad;

    // Agrego al carrito
    carrito.push(productoAgregado);

    // Actualizo el storage del carrito
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Actualizo el HTML
    document.getElementById("cantidad-prod").innerHTML = carrito.length;


    // Agrego Toastify
    Toastify({
        text: `Agregaste ${productoAgregado.titulo} al carrito`,
        duration: 1500,
        // destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
};


// Actualizo el Stock
// Vuelvo a generar las cards


const irAlProducto = (idProducto) => {
    // Busco el producto
    const productoQueQuiereVer = productos.find(productos => productos.id === idProducto);

    localStorage.setItem("productoAVer", JSON.stringify(productoQueQuiereVer));
    location.href = "detalle.html";
};

generarCards(productos);

function generarCards(productosAGenerar) {
    let acumuladorDeCards = ``;
    productosAGenerar.forEach((elementoDelArray) => {
        acumuladorDeCards += `<div class="col mb-5">
        <div class="card h-100">
            <!-- Sale badge-->
            <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">
                ${(elementoDelArray.stock > 0) ? 'Esta en venta' : 'Out stock'}
            </div>
            <!-- Product image-->
            <img class="card-img-top" src="${elementoDelArray.img}" alt="..." />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${elementoDelArray.titulo}</h5>
                    <!-- Product price-->
                    <span class="text-muted text-decoration-line-through">$20.00</span>
                    <input value="1" min="1" id="cantidad-${elementoDelArray.id}" type="number" placeholder="cantidad">
                    $${elementoDelArray.precio}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent" >
                <div class="text-center">
                    <button 
                        onclick="agregarAlCarrito(${elementoDelArray.id})"
                        class="btn btn-outline-dark mt-auto" href="#">
                        Add to cart
                    </button>
                    <button 
                        onclick="irAlProducto(${elementoDelArray.id})"
                        class="btn btn-outline-dark mt-auto" href="#">
                        Ver producto
                    </button>
                </div>
            </div>
        </div>
    </div>`;
    });
    mostrarCardsEnElHTML(acumuladorDeCards);
}

function mostrarCardsEnElHTML(cards) {
    document.getElementById("listado-productos").innerHTML = cards;
};

function buscarProducto() {
    console.log("Hola!")
    const nombreProductoBuscado = document.getElementById("producto-buscado").value.toUpperCase().trim();

    const productosEncontrados = productos.filter((producto) => {
        return productos.titulo.toUpperCase().match(nombreProductoBuscado);
    });

    generarCards(productosEncontrados);
}

//Forma 2 de escuchar un evento
const boton = document.getElementById("boton-buscar");

// boton.addEventListener('click', buscarProducto);

// boton.onclick = buscarProductos;
// ${"#boton-buscar"}.click() => {})

function tomarValor(event) {
    const valorDelInput = event.target.value;
    console.log(event.target.type);

}