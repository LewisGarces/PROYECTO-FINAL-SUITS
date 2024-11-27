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
        title: "Éxito!",
        text: msj,
        icon: "success",
        confirmButtonText: "Aceptar",
    });
};

// Función para registrar un usuario
const iniciar_registro = () => {
    let nombre = $("#nombre").val().trim();
    let apellido = $("#apellido").val().trim();
    let usuario = $("#usuario").val().trim();
    let password = $("#password").val().trim();

    // Expresión regular para validar el correo electrónico
    const regex_email = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Expresión regular para validar la contraseña (mínimo 8 caracteres que pueden ser letras y números)
    const regex_password = /^[a-zA-Z0-9]{8}$/;

    // Expresión regular para validar el nombre y apellido (permitir letras, espacios y acentos)
    const regex_nombre_apellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    // Validar si los campos están vacíos
    if (!nombre || !apellido || !usuario || !password) {
        mensaje_error("Por favor, completa todos los campos.");
        return;
    }

    // Validar el correo electrónico
    if (!regex_email.test(usuario)) {
        mensaje_error("Por favor, ingrese un correo electrónico válido.");
        return;
    }

    // Validar el nombre y apellido
    if (!regex_nombre_apellido.test(nombre)) {
        mensaje_error("El nombre solo puede contener letras, espacios y acentos.");
        return;
    }

    if (!regex_nombre_apellido.test(apellido)) {
        mensaje_error("El apellido solo puede contener letras, espacios y acentos.");
        return;
    }

    // Validar la contraseña
    if (!regex_password.test(password)) {
        mensaje_error("La contraseña debe tener exactamente 8 caracteres alfanuméricos.");
        return;
    }

    // Confirmación para registrar al nuevo usuario
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas registrar este nuevo usuario?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, registrar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, procede a registrar
            let data = new FormData();
            data.append("nombre", nombre);
            data.append("apellido", apellido);
            data.append("usuario", usuario);
            data.append("password", password);
            data.append("metodo", "iniciar_registro");

            fetch("./app/controller/Registro.php", {
                method: "POST",
                body: data,
            })
                .then((respuesta) => respuesta.json())
                .then((respuesta) => {
                    if (respuesta[0] == 1) {
                        // Mostrar éxito y redirigir al inicio de sesión
                        Swal.fire({
                            title: "Usuario registrado exitosamente",
                            text: "Redirigiendo al inicio de sesión...",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        setTimeout(() => {
                            window.location = "login";
                        }, 2000);
                    } else {
                        mensaje_error(respuesta[1]);
                    }
                });
        }
    });
};

// Evento para botón de registro
$("#btn_registro").on("click", () => {
    iniciar_registro();
});

// Confirmación para redirigir al inicio de sesión
$("#btn_inicio").on("click", (e) => {
    e.preventDefault();
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas regresar al inicio de sesión?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, regresar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Redirigiendo...",
                text: "Te estamos llevando al inicio de sesión.",
                icon: "info",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(() => {
                window.location = "login";
            }, 2000);
        }
    });
});
