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

const confirmarRedireccion = () => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estás a punto de ser redirigido a la lista de compras.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, redirigir',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Redirigiendo...',
                text: 'Redirigiendo a la lista de compras.',
                icon: 'info',
                timer: 2000, // Esto hará que la alerta se cierre automáticamente después de 2 segundos
                showConfirmButton: false,
                willClose: () => {
                    window.location.href = 'compras';  // Redirige a la página de compras
                }
            });
        }
    });
};
