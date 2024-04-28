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
}

// Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();

  // Actualizar el total del carrito una vez eliminado el item
  actualizarTotalCarrito();

  // La
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
