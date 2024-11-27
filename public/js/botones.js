// Función para mostrar SweetAlert cuando se haga clic en Inventario
document.getElementById('inventarioLink').addEventListener('click', function(e) {
    e.preventDefault(); // Previene la redirección inmediata
    Swal.fire({
        title: '¿Quieres ver el inventario?',
        text: 'Serás redirigido a la lista de productos.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, redirigir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Usamos fetch para redirigir de forma controlada
            fetch('inventario')
                .then(response => response.text())
                .then(data => {
                    window.location.href = 'inventario'; // Redirige a la página de inventario
                })
                .catch(error => {
                    console.error('Error al redirigir:', error);
                });
        }
    });
});

// Función para mostrar SweetAlert al intentar editar el usuario
document.getElementById('editarEmpleadoBtn').addEventListener('click', function() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Vas a editar tu información de usuario.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Usamos fetch para redirigir de forma controlada
            fetch('editar')
                .then(response => response.text())
                .then(data => {
                    window.location.href = 'editar'; // Redirige a la página de edición del usuario
                })
                .catch(error => {
                    console.error('Error al redirigir:', error);
                });
        }
    });
});