let carrito = [];
let total = 0;
let cantidades = {
    "Triang-late": 1,
    "Baloncito": 1,
    "Lengua loca": 1,
    "Fruti mix": 1,
};

// Función para cambiar la cantidad del producto
function cambiarCantidad(producto, precio, operacion) {
    if (operacion === 'mas') {
        cantidades[producto]++;
    } else if (operacion === 'menos' && cantidades[producto] > 1) {
        cantidades[producto]--;
    }

    const idCantidad = `cantidad-${producto.replace(/\s+/g, '-')}`;
    const elementoCantidad = document.getElementById(idCantidad);

    if (elementoCantidad) {
        elementoCantidad.textContent = cantidades[producto];
    }
}
{
    // Generar el ID del elemento dinámicamente
    const idCantidad = `cantidad-${producto.replace(/\s+/g, '-')}`;
    const elementoCantidad = document.getElementById(idCantidad);

    if (elementoCantidad) {
        elementoCantidad.textContent = cantidades[producto];
    } else {
        console.error(`Elemento con ID "${idCantidad}" no encontrado.`);
    }
}

// Función para agregar al carrito
function addToCart(producto, precio) {
    const cantidad = cantidades[producto];
    const itemExistente = carrito.find(item => item.producto === producto);

    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({ producto, precio, cantidad });
    }

    total += precio * cantidad;
    actualizarCarrito();
}

// Función para actualizar el carrito y mostrar los productos seleccionados
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');

    listaCarrito.innerHTML = ''; // Limpiar la lista actual

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.producto} - $${item.precio.toFixed(3)} x ${item.cantidad}`;
        listaCarrito.appendChild(li);
    });

    totalElement.textContent = `Total: $${total.toFixed(3)}`;
}



// Función para mostrar detalles
function verDetalles(producto) {
    const idDetalles = `detalles-${producto.replace(/\s+/g, '-')}`;
    const elementoDetalles = document.getElementById(idDetalles);

    if (elementoDetalles) {
        const estaVisible = elementoDetalles.style.display === "block";
        elementoDetalles.style.display = estaVisible ? "none" : "block";
    } else {
        console.error(`Elemento con ID "${idDetalles}" no encontrado.`);
    }
}
// Función para procesar la compra (formulario)
function comprar() {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;

    if (carrito.length > 0 && nombre && telefono && direccion) {
        alert(`Compra realizada con éxito por ${nombre}.\nTotal: $${total.toFixed(2)}\nDulces: ${carrito.length} productos.`);
    } else {
        alert('Por favor, completa el carrito y los datos antes de comprar.');
    }
}


function showDiabetesOptions() {
    // Ocultar los botones iniciales
    document.getElementById('initial-buttons').classList.add('hidden');
    // Mostrar las opciones de tipos de diabetes
    document.getElementById('diabetes-options').classList.remove('hidden');
}

function showAllProducts() {
    const modal = document.getElementById('info-modal');
    const typeElem = document.getElementById('diabetes-type');
    const symptomsElem = document.getElementById('diabetes-symptoms');
    const recommendationElem = document.getElementById('product-recommendation');

    typeElem.textContent = "Recomendación General";
    symptomsElem.textContent = "¡Todos nuestros productos son ideales para cualquier persona que desee disfrutar dulces sin azúcar!";
    recommendationElem.textContent = `
        - Triang-late: Un delicioso chocolate sin azúcar.
        - Baloncito: Helado ligero y delicioso.
        - Lengua Loca: Un clásico reinventado sin azúcar.
        - Fruti mix: Galletas saludables y sabrosas.
    `;

    modal.classList.remove('hidden');
}

function determinarTipo() {
    let maxTipo = Object.keys(conteo).reduce((a, b) => conteo[a] > conteo[b] ? a : b);
    
    // Determinar el tipo de diabetes
    let tipoDiabetes = (maxTipo === 'gestacional') ? 'Gestacional' : (maxTipo === 'tipo1' ? 'Tipo 1' : 'Tipo 2');
    
    let mensaje = "Lo más probable es que tengas diabetes " + tipoDiabetes + ".";
    document.getElementById("mensaje").innerText = mensaje;

    // Recomendación de productos
    let recomendacion = "";
    if (tipoDiabetes === "Tipo 1") {
        recomendacion = "Te recomendamos nuestro 'Triang-late', perfecto para antojos sin azúcar.";
    } else if (tipoDiabetes === "Tipo 2") {
        recomendacion = "Prueba 'Fruti mix', ideal para disfrutar saludablemente.";
    } else if (tipoDiabetes === "Gestacional") {
        recomendacion = "Te sugerimos 'Baloncito', una opción ligera y sin azúcar.";
    }

    // Mostrar la recomendación
    document.getElementById("recomendacion").innerText = recomendacion;

    // Ocultar la encuesta y mostrar el resultado
    document.getElementById("encuesta").style.display = "none";
    document.getElementById("resultado").style.display = "block";
}
