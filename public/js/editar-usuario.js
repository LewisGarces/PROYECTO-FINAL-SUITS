document.getElementById('form_editar_usuario').addEventListener('submit', function (e) {
    e.preventDefault();

    let nombre = document.getElementById('nombre').value.trim();
    let apellido = document.getElementById('apellido').value.trim();
    let usuario = document.getElementById('usuario').value.trim();

    // Validación de campos antes de enviar
    if (!nombre || !apellido || !usuario) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor complete todos los campos obligatorios.'
        });
        return; // Detener la ejecución si hay campos vacíos
    }

    // Validar caracteres en nombre y apellido
    let regexNombreApellido = /^[A-Za-záéíóúÁÉÍÓÚ ]+$/;
    if (!regexNombreApellido.test(nombre) || !regexNombreApellido.test(apellido)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Solo se permiten letras, espacios y acentos en nombre y apellido.'
        });
        return;
    }

    // Validar formato de correo
    let regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexCorreo.test(usuario)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor ingresa un correo electrónico válido.'
        });
        return;
    }

    // Confirmación de actualización de datos
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Vas a actualizar tus datos. ¿Deseas continuar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, actualizar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            let formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('apellido', apellido);
            formData.append('usuario', usuario);
            formData.append('metodo', 'editar_usuario'); // Llamar al método de actualización

            // Enviar la solicitud al servidor
            fetch("./app/controller/editar-usuario.php", {
                method: 'POST',
                body: formData
            }).then(response => response.json())
              .then(data => {
                  if (data[0] == 1) {
                      Swal.fire({
                          icon: 'success',
                          title: 'Éxito',
                          text: 'Datos actualizados correctamente.'
                      }).then(() => {
                          // Mostrar mensaje de redirección para verificar los datos actualizados
                          Swal.fire({
                              title: '  Vuelva al iniciar sesion...',
                              text: 'Sera redirigido al sistema de bienvenida para ver sus cambios actualizados, por favor espere',
                              icon: 'info',
                              showConfirmButton: false,
                              allowOutsideClick: false,
                              didOpen: () => {
                                  setTimeout(() => {
                                      // Redirige a la página de login
                                      window.location.href = 'inicio'; // Asegúrate que la ruta sea correcta
                                  }, 4000); // Redirige después de 2 segundos
                              }
                          });
                      });
                  } else {
                      Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Error al actualizar los datos: ' + data[1]
                      });
                  }
              })
              .catch(error => {
                  Swal.fire({
                      icon: 'error',
                      title: 'Error',
                      text: 'Error al enviar la solicitud: ' + error
                  });
              });
        }
    });
});

// Evento del botón de "Volver"
document.getElementById('volverBtn').addEventListener('click', function() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estás a punto de volver al sistema de bienvenida.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, volver',
        cancelButtonText: 'No, cancelar',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Redirigiendo...',
                text: 'Redirigiendo al sistema de bienvenida, por favor espere...',
                icon: 'info',
                showConfirmButton: false,
                allowOutsideClick: false,
                didOpen: () => {
                    setTimeout(() => {
                        window.location.href = 'inicio'; // Asegúrate que esta ruta es correcta
                    }, 2000);
                }
            });
        }
    });
});
