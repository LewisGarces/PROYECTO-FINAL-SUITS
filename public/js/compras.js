const consulta = () => {
    let data = new FormData();
    data.append("metodo", "obtener_datos");
    fetch("./app/controller/compras.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {
        let contenido = ``;
        let i = 1;
        respuesta.map(producto => {
            contenido += `
                <tr>
                    <th>${i++}</th>
                    <td>${producto['nombre_cliente']}</td>
                    <td>${producto['producto']}</td>
                    <td>${producto['precio']}</td>
                    <td>${producto['unidades']}</td>
                    <td>${producto['fecha_entrega']}</td>
                    <td>
                        <button title="Editar" type="button" class="btn btn-warning" onclick="precargar(${producto['id_producto']})"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button title="Eliminar" type="button" class="btn btn-danger" onclick="eliminar(${producto['id_producto']})"><i class="fa-solid fa-trash-can"></i></button>
                        <button title="Realizar compra" type="button" class="btn btn-success" onclick="realizarCompra(${producto['precio']}, ${producto['unidades']})"><i class="fa-solid fa-shopping-cart"></i></button>
                    </td>
                </tr>
            `;
        });
        $("#contenido_producto").html(contenido);
        $('#myTable').DataTable();
    });
}

const precargar = (id) => {
    let data = new FormData();
    data.append("id_producto", id);
    data.append("metodo", "precargar_datos");
    fetch("./app/controller/compras.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {   
        $("#edit_nombre_cliente").val(respuesta['nombre_cliente']);
        $("#edit_producto").val(respuesta['producto']);
        $("#edit_precio").val(respuesta['precio']);
        $("#edit_unidades").val(respuesta['unidades']);
        $("#edit_fecha_entrega").val(respuesta['fecha_entrega']);
        $("#id_prodcuto_act").val(respuesta['id_producto']);
        $("#editarModal").modal('show');
    });
}

consulta();

const actualizar = () => {
    let nombre_cliente = $("#edit_nombre_cliente").val();
    let producto = $("#edit_producto").val();
    let precio = $("#edit_precio").val();
    let unidades = $("#edit_unidades").val();
    let fecha_entrega = $("#edit_fecha_entrega").val();

      // Validar que "producto" solo tenga letras
      if (!/^[a-zA-Z\s]+$/.test(nombre_cliente)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el producto',
            text: 'El nombre del producto solo puede contener letras.',
        });
        return; // Detener la ejecución si el producto no es válido
    }
// Lista de productos no disponibles (en minúsculas para comparación)
const productosNoDisponibles = [
    'pastel de fresa', 'pastel de limon', 'pastel de tres leches', 'pastel de cafe', 
    'pastel de coco', 'pastel de frutos rojos', 'pastel de uva', 'pastel de chocolate con menta', 
    'pastel de cereza', 'pastel de crema de avellanas', 'pastel de frambuesa', 
    'pastel de frutilla', 'pastel imposible', 'pastel de ciruela', ''
];

// Validar que "producto" solo tenga letras y espacios
if (!/^[a-zA-Z\s]+$/.test(producto)) {
    Swal.fire({
        icon: 'error',
        title: 'Error en el producto',
        text: 'El nombre del producto solo puede contener letras.',
    });
    return; // Detener la ejecución si el producto no es válido
}

// Convertir el nombre del producto ingresado a minúsculas para evitar problemas de mayúsculas/minúsculas
let productoMinuscula = producto.toLowerCase();

// Validar que el producto contenga la palabra "pastel"
if (!productoMinuscula.includes('pastel')) {
    Swal.fire({
        icon: 'warning',
        title: 'Nombre de producto incorrecto',
        text: 'El producto debe incluir la palabra "pastel". Por favor, ingréselo correctamente.',
    });
    return; // Detener la ejecución si no incluye "pastel"
}

// Validar que el producto no esté en la lista de productos no disponibles
if (productosNoDisponibles.includes(productoMinuscula)) {
    Swal.fire({
        icon: 'error',
        title: 'Producto no disponible',
        text: 'Este producto no está disponible en el inventario. Por favor, vuelva a intentarlo.',
    });
    return; // Detener la ejecución si el producto no está disponible
}

    // Validar que "precio" solo tenga números
    if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el precio',
            text: 'El precio solo puede contener números y como máximo dos decimales.',
        });
        return; // Detener la ejecución si el precio no es válido
    }

        // Validar que "fecha" tenga un formato válido (YYYY-MM-DD)
        if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_entrega)) {
            Swal.fire({
                icon: 'error',
                title: 'Error en la fecha',
                text: 'La fecha debe tener el formato YYYY-MM-DD.',
            });
            return; // Detener la ejecución si la fecha no es válida
        }

    let data = new FormData();
    data.append("id_producto", $("#id_prodcuto_act").val());
    data.append("nombre_cliente",nombre_cliente);
    data.append("producto", producto);
    data.append("precio", precio);
    data.append("unidades", unidades);
    data.append("fecha_entrega", fecha_entrega);
    data.append("metodo", "actualizar_datos");

    fetch("./app/controller/compras.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => { 
        if (respuesta[0] == 1) {
            Swal.fire({
                icon: 'success',
                title: 'Datos actualizados correctamente',
                text: respuesta[1],
            });
            consulta();
            $("#editarModal").modal('hide');
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: respuesta[1],
            });
        }
    });
}

$('#btn_actualizar').on('click', () => {
    actualizar();
});


const agregar = () => {
    // Obtener los valores de los campos
    let nombre_cliente = $("#nombre_cliente").val();
    let producto = $("#producto").val();
    let precio = $("#precio").val();
    let unidades = $("#unidades").val();
    let fecha_entrega = $("#fecha_entrega").val();

// Validar que "nombreCliente" solo tenga letras y espacios
if (!/^[a-zA-Z\s]+$/.test(nombre_cliente)) {
    Swal.fire({
        icon: 'error',
        title: 'Error en el nombre del cliente',
        text: 'El nombre del cliente solo puede contener letras y espacios.',
    });
    return; // Detener la ejecución si el nombre del cliente no es válido
}

 // Lista de productos no disponibles (en minúsculas para comparación)
const productosNoDisponibles = [
    'pastel de fresa', 'pastel de limon', 'pastel de tres leches', 'pastel de cafe', 
    'pastel de coco', 'pastel de frutos rojos', 'pastel de uva', 'pastel de chocolate con menta', 
    'pastel de cereza', 'pastel de crema de avellanas', 'pastel de frambuesa', 
    'pastel de frutilla', 'pastel imposible', 'pastel de ciruela', ''
];

// Validar que "producto" solo tenga letras y espacios
if (!/^[a-zA-Z\s]+$/.test(producto)) {
    Swal.fire({
        icon: 'error',
        title: 'Error en el producto',
        text: 'El nombre del producto solo puede contener letras.',
    });
    return; // Detener la ejecución si el producto no es válido
}

// Convertir el nombre del producto ingresado a minúsculas para evitar problemas de mayúsculas/minúsculas
let productoMinuscula = producto.toLowerCase();

// Validar que el producto contenga la palabra "pastel"
if (!productoMinuscula.includes('pastel')) {
    Swal.fire({
        icon: 'warning',
        title: 'Nombre de producto incorrecto',
        text: 'El producto debe incluir la palabra "pastel". Por favor, ingréselo correctamente.',
    });
    return; // Detener la ejecución si no incluye "pastel"
}

// Validar que el producto no esté en la lista de productos no disponibles
if (productosNoDisponibles.includes(productoMinuscula)) {
    Swal.fire({
        icon: 'error',
        title: 'Producto no disponible',
        text: 'Este producto no está disponible en el inventario. Por favor, vuelva a intentarlo.',
    });
    return; // Detener la ejecución si el producto no está disponible
}


    // Validar que "precio" solo tenga números
    if (!/^\d+(\.\d{1,2})?$/.test(precio)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el precio',
            text: 'El precio solo puede contener números y como máximo dos decimales.',
        });
        return; // Detener la ejecución si el precio no es válido
    }

    // Validar que "unidades" solo tenga números
    if (!/^\d+$/.test(unidades)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en unidades',
            text: 'La cantidad de unidades solo puede contener números.',
        });
        return; // Detener la ejecución si las unidades no son válidas
    }
 
    // Validar que "fecha_entrega" tenga un formato válido (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha_entrega)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en la fecha de entrega',
            text: 'La fecha de entrega debe tener el formato YYYY-MM-DD.',
        });
        return; // Detener la ejecución si la fecha de entrega no es válida
    }

    // Confirmar si el usuario quiere agregar el producto
    Swal.fire({
        title: '¿Estás seguro de agregar este producto?',
        text: "Verifica que la información sea correcta.",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, agregar producto',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = new FormData();
            data.append("nombre_cliente", nombre_cliente);
            data.append("producto", producto);
            data.append("precio", precio);
            data.append("unidades", unidades);
            data.append("fecha_entrega", fecha_entrega);
            data.append("metodo", "insertar_datos");

            fetch("./app/controller/compras.php", {
                method: "POST",
                body: data
            }).then(respuesta => respuesta.json())
            .then(respuesta => {
                Swal.fire({
                    icon: respuesta[0] == 1 ? 'success' : 'error',
                    title: respuesta[0] == 1 ? 'Producto agregado exitosamente' : 'Error',
                    text: respuesta[1],
                }).then(() => {
                    if (respuesta[0] == 1) {
                        consulta();
                        $("#agregarModal").modal('hide');
                    }
                });
            });
        }
    });
}




const eliminar = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Este producto será eliminado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = new FormData();
            data.append("id_producto", id);
            data.append("metodo", "eliminar_datos");
            fetch("./app/controller/compras.php", {
                method: "POST",
                body: data
            }).then(respuesta => respuesta.json())
            .then(respuesta => { 
                if (respuesta[0] == 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto eliminado exitosamente',
                        text: respuesta[1],
                    });
                    consulta();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: respuesta[0],
                    });
                }
            });
        }
    });
}

$('#btn_actualizar').on('click', () => {
    actualizar();
});

$('#btn_agregar').on('click', () => {
    agregar();
});
const realizarCompra = (precio, unidades) => {
    // Calcular el costo total
    const total = precio * unidades;

    // Preguntar si está seguro de realizar la compra
    Swal.fire({
        title: '¿Estás seguro de realizar la compra?',
        text: `El costo total de la compra es: $${total.toFixed(2)}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, realizar compra',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Elegir el método de pago
            Swal.fire({
                title: 'Elige un método de pago',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Efectivo',
                cancelButtonText: 'Tarjeta de crédito'
            }).then((paymentResult) => {
                if (paymentResult.isConfirmed) {
                    // Pago en efectivo
                    Swal.fire({
                        icon: 'info',
                        title: 'Compra realizada con efectivo',
                        text: `El total a pagar es: $${total.toFixed(2)}`,
                        confirmButtonText: 'Aceptar'
                    });
                } else {
                    // Pago con tarjeta
                    Swal.fire({
                        icon: 'info',
                        title: 'Por favor, Inserte una tarjeta de credito en la terminal',
                        text: 'Este proceso se realizara en la terminal, espere mientras le damos una respuesta.',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        }
    });
};
const confirmarVisualizarPasteles = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estás a punto de entrar a la visualización de pasteles disponibles.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, entrar',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Entrando...',
                text: 'Entrando a la visualización de pasteles disponibles.',
                icon: 'info',
                timer: 2000,  // Esto hará que la alerta se cierre automáticamente después de 2 segundos
                showConfirmButton: false
            }).then(() => {
                window.location.href = 'pasteles';  // Redirige a la página de pasteles
            });
        }
    });
}