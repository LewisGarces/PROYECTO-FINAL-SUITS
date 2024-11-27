const cerrar_sesion = () => {
    Swal.fire({
        title: '¿Estás seguro de cerrar sesión?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            let data = new FormData();
            data.append("metodo", "cerrar_sesion");
            fetch("./app/controller/Login.php", {
                method: "POST",
                body: data
            })
            .then(respuesta => respuesta.json())
            .then(respuesta => {
                Swal.fire({
                    icon: respuesta[0] == 1 ? 'success' : 'error',
                    title: respuesta[0] == 1 ? '¡Sesión cerrada!, Hasta luego empleado' : 'Error',
                    text: respuesta[1],
                }).then(() => {
                    if (respuesta[0] == 1) {
                        window.location = "login";
                    }
                });
            });
        }
    });
}

$("#btn_cerrar").on('click', () => {
    cerrar_sesion();
});
