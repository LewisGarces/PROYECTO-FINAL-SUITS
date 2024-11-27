<?php
if (!isset($_SESSION['usuario'])) {
    echo "No hay sesión activa.";
    exit;
}
$datos_usuario = $_SESSION['usuario'];
    
?>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Empleado</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="public/css/editar.css">
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark">
        <div class="container-fluid">
            <a class="navbar-brand fw-bold text-white" href="#">
                <i class="fas fa-store"></i> Sistema de edición de empleados
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#">
                            <i class="fas fa-home"></i> Inicio
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#">
                            <i class="fas fa-cogs"></i> Inventario
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user-circle"></i> Mi cuenta
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                            <li class="dropdown-item">
                                <i class="fas fa-user"></i><?= isset($_SESSION['usuario']) ? $_SESSION['usuario']['nombre'] . ' ' . $_SESSION['usuario']['apellido'] : 'Usuario'; ?>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li>
                                <button class="dropdown-item text-white" id="volverBtn">
                                    <i class="fas fa-sign-out-alt"></i> Volver al inicio
                                </button>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Contenido principal -->
    <div class="container d-flex flex-column justify-content-center align-items-center text-center mt-4">
    <i class="fas fa-user-edit fa-5x text-white mb-3"></i>
        <h3 class="text-white mb-4">Editar Empleado</h3>
        <!-- Formulario de edición -->
        <form id="form_editar_usuario" class="w-50">
            <div class="mb-3">
                <label for="nombre" class="form-label text-white">Nombre</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-user"></i></span>
                    <input type="text" class="form-control" id="nombre" name="nombre" value="<?= htmlspecialchars($datos_usuario['nombre']) ?>" placeholder="Nombre">
                </div>
            </div>
            <div class="mb-3">
                <label for="apellido" class="form-label text-white">Apellido</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-user-tag"></i></span>
                    <input type="text" class="form-control" id="apellido" name="apellido" value="<?= htmlspecialchars($datos_usuario['apellido']) ?>" placeholder="Apellido">
                </div>
            </div>
            <div class="mb-3">
                <label for="usuario" class="form-label text-white">Usuario (email)</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                    <input type="email" class="form-control" id="usuario" name="usuario" value="<?= htmlspecialchars($datos_usuario['usuario']) ?>" placeholder="Correo Electrónico">
                </div>
            </div>
            <button type="submit" class="btn btn-custom">
                <i class="fas fa-save"></i> Actualizar Datos
            </button>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="public/js/editar-usuario.js"></script>
