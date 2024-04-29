//Variable que mantiene el estado visible del carrito
var carritoVisible = false;

// Esperar que todos los elementos de la pagina se carguen para continuar con el script
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  // Agregar funcionalidad de los botones eliminar del carrito
  var botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
  for (var i = 0; i < botonesEliminarItem.length; i++) {
    var button = botonesEliminarItem[i];
    button.addEventListener("click", eliminarItemCarrito);
  }

  // Agregar funcionalidad al boton sumar cantidad
  var botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
  for (var i = 0; i < botonesSumarCantidad.length; i++) {
    var button = botonesSumarCantidad[i];
    button.addEventListener("click", sumarCantidad);
  }

  // Agregar funcionalidad al boton restar cantidad
  var botonesRestarCantidad =
    document.getElementsByClassName("restar-cantidad");
  for (var i = 0; i < botonesRestarCantidad.length; i++) {
    var button = botonesRestarCantidad[i];
    button.addEventListener("click", restarCantidad);
  }

  // Agrego funcionalidad a los botones agregar al carrito
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();

  // Actualizar el total del carrito una vez eliminado el item
  actualizarTotalCarrito();

  // La siguiente funcion controla si hay elementos en el carrito una vez que se elimino
  // si no lo hay se debe ocultar el carrito
  ocultarCarrito();
}

// Actualiza el total del carrito
function actualizarTotalCarrito() {
  // Seleccionar contenedor carrito
  var carritoContenedor = document.getElementsByClassName("carrito")[0];
  var carritoItem = carritoContenedor.getElementsByClassName("carrito-item");
  var total = 0;

  // recorrer cada elemento del carrito para actualizar el total
  for (var i = 0; i < carritoItem.length; i++) {
    var item = carritoItem[i];
    var precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
    console.log(precioElemento);
    // quitar simbolo peso y punto de milesima
    var precio = parseFloat(
      precioElemento.innerText.replace("$", "").replace(".", "")
    );
    console.log(precio);
    var cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
    var cantidad = cantidadItem.value;
    console.log(cantidad);
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "$" + total.toLocaleString("es");
}

function ocultarCarrito() {
  var carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount == 0) {
    var carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;

    // Maximiza el contenedor de los elementos
    var items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "100%";
  }
}

// Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  console.log(cantidadActual);
  cantidadActual++;
  selector.getElementsByClassName("carrito-item-cantidad")[0].value =
    cantidadActual;
  // Actualizar el total
  actualizarTotalCarrito();
}

function restarCantidad(event) {
  var buttonClicked = event.target;
  var selector = buttonClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  console.log(cantidadActual);
  cantidadActual--;

  // Controlamos que no sea menor que 1
  if (cantidadActual >= 1) {
    selector.getElementsByClassName("carrito-item-cantidad")[0].value =
      cantidadActual;
    // Actualizar el total
    actualizarTotalCarrito();
  }
}
