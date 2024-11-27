const confirmarEdicion = () => {
    Swal.fire({
        title: '¿Estás seguro de editar el empleado?',
        text: "¡Serás redirigido a la sesión de edición de usuario!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#8B0000',
        cancelButtonColor: '#00008B',
        confirmButtonText: 'Sí, editar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Solicitar la contraseña antes de redirigir
            Swal.fire({
                title: 'Ingrese la contraseña para continuar',
                text: "¡Solo administradores o gerentes pueden modificar los datos!",
                input: 'password',
                inputPlaceholder: 'Contraseña',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    // Validación de la contraseña
                    if (value !== 'JOSE10luis') {
                        return 'Contraseña incorrecta. Solo administradores o gerentes pueden modificar los datos.';
                    }
                }
            }).then((passwordResult) => {
                if (passwordResult.isConfirmed) {
                    // Contraseña correcta, redirigir
                    Swal.fire({
                        title: 'Redirigiendo...',
                        text: 'Serás redirigido a la sesión de edición de empleados.',
                        icon: 'info',
                        showConfirmButton: false,
                        timer: 2000
                    }).then(() => {
                        window.location.href = 'editar';  // Redirige a la página de editar usuario
                    });
                } else if (passwordResult.isDismissed) {
                    // El usuario canceló la solicitud de contraseña
                    Swal.fire({
                        title: 'Acceso denegado',
                        text: 'No tienes permisos para editar los datos.',
                        icon: 'error',
                        confirmButtonColor: '#8B0000'
                    });
                }
            });
        }
    });
};
$(document).ready(function() {
    $('#linkInventario').on('click', function(e) {
        e.preventDefault(); // Previene la acción predeterminada de redirigir a 'inventario'

        // Muestra el primer SweetAlert preguntando si está seguro de entrar al sistema de inventario
        Swal.fire({
            title: '¿Estás seguro de entrar al sistema de inventario?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, pedir la contraseña
                Swal.fire({
                    title: 'Por favor, ingrese la contraseña',
                    input: 'password',
                    inputPlaceholder: 'Contraseña',
                    showCancelButton: true,
                    confirmButtonText: 'Ingresar',
                    cancelButtonText: 'Cancelar',
                    inputValidator: (value) => {
                        if (!value) {
                            return 'La contraseña es obligatoria';
                        }
                    }
                }).then((passwordResult) => {
                    if (passwordResult.isConfirmed) {
                        // Verifica la contraseña
                        const password = passwordResult.value;
                        if (password === 'JOSE10luis') {
                            // Contraseña correcta, redirige al sistema de inventario
                            window.location.href = 'inventario'; // Aquí puedes poner la URL de tu sistema de inventario
                        } else {
                            // Contraseña incorrecta, muestra el mensaje de acceso denegado
                            Swal.fire({
                                title: 'Acceso denegado',
                                text: 'La contraseña es incorrecta.',
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            });
                        }
                    }
                });
            }
        });
    });
});
$(document).ready(function () {
    const inventarioAlert = {
        title: '¿Estás seguro de entrar al sistema de inventario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    };

    const accesoDenegadoAlert = {
        title: 'Acceso denegado',
        text: 'La contraseña es incorrecta.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    };

    const pedirContraseñaAlert = {
        title: 'Por favor, ingrese la contraseña',
        input: 'password',
        inputPlaceholder: 'Contraseña',
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'La contraseña es obligatoria';
            }
        }
    };

    $('#linkInventario').on('click', function (e) {
        e.preventDefault(); // Previene la acción predeterminada

        // Mostrar SweetAlert para confirmar acceso
        Swal.fire(inventarioAlert).then((result) => {
            if (result.isConfirmed) {
                // Si confirma, pide la contraseña
                Swal.fire(pedirContraseñaAlert).then((passwordResult) => {
                    if (passwordResult.isConfirmed) {
                        const password = passwordResult.value;
                        if (password === 'JOSE10luis') {
                            // Contraseña correcta
                            Swal.fire({
                                title: 'Acceso concedido',
                                text: 'Redirigiendo al sistema de inventario...',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                window.location.href = 'inventario';
                            });
                        } else {
                            // Contraseña incorrecta
                            Swal.fire(accesoDenegadoAlert);
                        }
                    }
                });
            }
        });
    });
});

$(document).ready(function () {
    // Configuración de los SweetAlert en constantes
    const inventarioAlert = {
        title: '¿Estás seguro de entrar al sistema de inventario?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    };

    const accesoDenegadoAlert = {
        title: 'Acceso denegado',
        text: 'La contraseña es incorrecta, vuelva a intentarlo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
    };

    const pedirContraseñaAlert = {
        title: 'Por favor, ingrese la contraseña',
        text: 'Solo el gerente puede acceder esta información.',
        input: 'password',
        inputPlaceholder: 'Contraseña',
        showCancelButton: true,
        confirmButtonText: 'Ingresar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'La contraseña es obligatoria';
            }
        }
    };

    // Evento de clic en el botón
    $('#linkInventario').on('click', function (e) {
        e.preventDefault(); // Evita que el botón recargue la página

        // Mostrar la alerta de confirmación
        Swal.fire(inventarioAlert).then((result) => {
            if (result.isConfirmed) {
                // Si confirma, mostrar la alerta de contraseña
                Swal.fire(pedirContraseñaAlert).then((passwordResult) => {
                    if (passwordResult.isConfirmed) {
                        const password = passwordResult.value;
                        if (password === 'JOSE10luis') {
                            // Si la contraseña es correcta, redirigir
                            Swal.fire({
                                title: 'Acceso concedido',
                                text: 'Redirigiendo al sistema de inventario...',
                                icon: 'success',
                                showConfirmButton: false,
                                timer: 1500
                            }).then(() => {
                                window.location.href = 'inventario'; // Cambia a la URL que necesites
                            });
                        } else {
                            // Contraseña incorrecta
                            Swal.fire(accesoDenegadoAlert);
                        }
                    }
                });
            }
        });
    });
});
