const consulta = () => {
    let data = new FormData();
    data.append("metodo", "obtener_datos");
    fetch("./app/controller/Productos.php", {
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
                    <td>${producto['producto']}</td>
                     <td>${producto['disponibilidad']}</td>
                    <td>
                        <button title="Editar" type="button" class="btn btn-warning" onclick="precargar(${producto['id_producto']})" 
                            style="background-color: #FADCD9; border: 1px solid #F1A7B2; color: #8A4F58; transition: background-color 0.3s ease;">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button title="Eliminar" type="button" class="btn btn-danger" onclick="eliminar(${producto['id_producto']})" 
                            style="background-color: #A6D6F1; border: 1px solid #82B8D6; color: #4C6D84; transition: background-color 0.3s ease;">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
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
    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data
    }).then(respuesta => respuesta.json())
    .then(respuesta => {   
        $("#edit_producto").val(respuesta['producto']);
        $("#edit_disponibilidad").val(respuesta['disponibilidad']);
        $("#id_producto_act").val(respuesta['id_producto']);
        $("#editarModal").modal('show');
    });
}

consulta();

const actualizar = () => {
    let producto = $("#edit_producto").val();
    let disponibilidad = $("#edit_disponibilidad").val();

    // Validar que "producto" solo tenga letras
    if (!/^[a-zA-Z\s]+$/.test(producto)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el producto',
            text: 'El nombre del producto solo puede contener letras.',
        });
        return;
    }
    
    // Validar que "producto" solo tenga letras
    if (!/^[a-zA-Z\s]+$/.test(disponibilidad)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el producto disponible',
            text: 'La disponibilidad solo puede contener letras.',
        });
        return;
    }

    let data = new FormData();
    data.append("id_producto", $("#id_producto_act").val());
    data.append("producto", producto);
    data.append("disponibilidad", disponibilidad);
    data.append("metodo", "actualizar_datos");

    fetch("./app/controller/Productos.php", {
        method: "POST",
        body: data,
    })
        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error("Error en la respuesta del servidor.");
            }
            return respuesta.json().catch(() => {
                throw new Error("La respuesta no es un JSON válido.");
            });
        })
        .then(respuesta => {
            if (respuesta[0] === 1) {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos actualizados correctamente',
                    text: respuesta[1],
                });
                consulta(); // Refresca la lista de productos
                $("#editarModal").modal("hide"); // Cierra el modal
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: respuesta[1],
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error en la solicitud',
                text: error.message,
            });
        });
};

$("#btn_actualizar").off("click").on("click", actualizar);



const agregar = () => {
    // Obtener los valores de los campos
    let producto = $("#producto").val();
    let disponibilidad = $("#disponibilidad").val();

    // Validar que "producto" solo tenga letras
    if (!/^[a-zA-Z\s]+$/.test(producto)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en el producto',
            text: 'El nombre del producto solo puede contener letras.',
        });
        return; // Detener la ejecución si el producto no es válido
    }

    // Validar que "unidades" solo tenga números
    if (!/^[a-zA-Z\s]+$/.test(disponibilidad)) {
        Swal.fire({
            icon: 'error',
            title: 'Error en la disponibilidad de productos',
            text: 'La disponibilidad de productos solo contiene letras.',
        });
        return; // Detener la ejecución si las unidades no son válidas
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
            data.append("producto", producto);
            data.append("disponibilidad", disponibilidad);
            data.append("metodo", "insertar_datos");

            fetch("./app/controller/Productos.php", {
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
            fetch("./app/controller/Productos.php", {
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
