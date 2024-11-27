const mensaje_error = (msj) => {
    Swal.fire({
        title: "Error!",
        text: msj,
        icon: "warning",
        confirmButtonText: "Aceptar",
    });
};

const mensaje_exito = (msj) => {
    Swal.fire({
        title: "Correcto!",
        text: msj,
        icon: "success",
        confirmButtonText: "Aceptar",
    });
};

// Función para iniciar sesión
const iniciar_sesion = () => {
    let usuario = $("#usuario").val().trim();
    let password = $("#password").val().trim();

    // Expresión regular para validar el correo electrónico
    const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Validar si los campos están vacíos
    if (!usuario || !password) {
        mensaje_error("Por favor, completa todos los campos.");
        return;
    }

    // Validar que el usuario sea un correo electrónico válido
    if (!regex_email.test(usuario)) {
        mensaje_error("Por favor, ingresa un correo electrónico válido.");
        return;
    }

    // Confirmación para iniciar sesión
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas iniciar sesión?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, iniciar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            let data = new FormData();
            data.append("usuario", usuario);
            data.append("password", password);
            data.append("metodo", "iniciar_sesion");
            fetch("./app/controller/Login.php", {
                method: "POST",
                body: data,
            })
                .then((respuesta) => respuesta.json())
                .then((respuesta) => {
                    if (respuesta[0] == 1) {
                        Swal.fire({
                            title: "Correcto!",
                            text: "Inciando sesion, por favor espere...",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        setTimeout(() => {
                            window.location = "inicio"; // Redirige al inicio
                        }, 2000);
                    } else {
                        mensaje_error(respuesta[1]);
                    }
                });
        }
    });
};

// Confirmación para redirigir al registro
$("#btn_registrar").on("click", (e) => {
    e.preventDefault();
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas registrar un nuevo usuario?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, registrar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Redirigiendo...",
                text: "Te estamos llevando a la página de registro.",
                icon: "info",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(() => {
                window.location = "registro"; // Redirige a la página de registro
            }, 2000);
        }
    });
});

// Evento para botón de iniciar sesión
$("#btn_iniciar").on("click", () => {
    iniciar_sesion();
});
const enlaceRecuperar = document.getElementById("recuperar_contrasena");

enlaceRecuperar.addEventListener("click", () => {
    Swal.fire({
        title: "¿Quieres recuperar la contraseña?",
        text: "Solo el administrador o gerente puede acceder.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            // Pedir el correo
            Swal.fire({
                title: "Ingresa el correo electrónico",
                input: "email",
                inputPlaceholder: "Correo electrónico",
                inputAttributes: {
                    maxlength: 100,
                    autocapitalize: "off",
                    autocorrect: "off",
                },
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then((respuestaCorreo) => {
                if (respuestaCorreo.isConfirmed) {
                    const correoIngresado = respuestaCorreo.value;

                    // Definir los correos válidos y sus datos
                    const usuarios = {
                        "gomezluisenrique647@gmail.com": {
                            nombre: "José Luis",
                            apellido: "Hernández Garcés",
                            password: "lewis140"
                        },
                        "jocelynmelo@gmail.com": {
                            nombre: "Jocelyn",
                            apellido: "Melo Hipolito",
                            password: "jocelyn1"
                        },
                        "emanuelrojas@gmail.com": {
                            nombre: "Emanuel",
                            apellido: "Rojas Cruz",
                            password: "Emanuel1"
                        },
                        "diegobollas1@gmail.com": {
                            nombre: "Diego Alberto",
                            apellido: "Bollas Paredes",
                            password: "Diego123"
                        }
                    };

                    // Verificar si el correo está en la lista de usuarios válidos
                    if (usuarios[correoIngresado]) {
                        // Si el correo es válido, pedir la contraseña del administrador o gerente
                        Swal.fire({
                            title: "Ingresa la contraseña de administrador o gerente",
                            input: "password",
                            inputPlaceholder: "Contraseña",
                            inputAttributes: {
                                maxlength: 15,
                                autocapitalize: "off",
                                autocorrect: "off",
                            },
                            showCancelButton: true,
                            confirmButtonText: "Aceptar",
                            cancelButtonText: "Cancelar",
                        }).then((respuestaContraseña) => {
                            // Contraseña válida para admin/gerente
                            if (respuestaContraseña.isConfirmed && respuestaContraseña.value === "JOSE10luis") {
                                // Mostrar los datos del empleado
                                Swal.fire({
                                    title: "Datos recuperados",
                                    html: ` 
                                        <p><strong>Nombre:</strong> ${usuarios[correoIngresado].nombre}</p>
                                        <p><strong>Apellido:</strong> ${usuarios[correoIngresado].apellido}</p>
                                        <p><strong>Usuario:</strong> ${correoIngresado}</p>
                                        <p><strong>Password:</strong> <span style="text-decoration: underline; color: #4682B4;">${usuarios[correoIngresado].password}</span></p>
                                    `,
                                    icon: "success",
                                });
                            } else if (respuestaContraseña.value) {
                                // Contraseña incorrecta
                                Swal.fire({
                                    title: "Contraseña incorrecta",
                                    text: "No tienes acceso para recuperar esta información.",
                                    icon: "error",
                                });
                            }
                        });
                    } else {
                        // Si el correo no coincide, mostrar un mensaje de error
                        Swal.fire({
                            title: "Correo inválido",
                            text: "Por favor, ingresa un correo electrónico válido.",
                            icon: "error",
                        });
                    }
                }
            });
        }
    });
});
