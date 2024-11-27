<?php
if (isset($_SESSION['usuario'])) {
    header("location:inicio");
    exit();
}
?>
<link rel="stylesheet" href="./public/css/registro.css">
<nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
        <!-- Logo y nombre de la empresa -->
        <a class="navbar-brand mx-auto fw-bold text-white" style="background: linear-gradient(90deg, #8B0000, #00008B); -webkit-background-clip: text; color: transparent; border: 2px solid transparent; padding: 5px 10px; font-size: 1.5rem; letter-spacing: 1px;" href="#">
        REGISTRAR NUEVOS EMPLEADOS
        </a>
        
        <!-- Botón de navegación en dispositivos pequeños -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Menú de navegación -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link text-white" href="#" style="font-size: 1.1rem;">
                        <i class="fas fa-home" style="font-size: 1.3rem;"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="#" style="font-size: 1.1rem;">
                        <i class="fas fa-cogs" style="font-size: 1.3rem;"></i> 
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
<form class="container mt-0.1">
    <div class="row justify-content-center">
        <div class="col-4 fondo p-4" style="border-radius: 15px; border: 4px solid; border-image: linear-gradient(45deg, #4682B4, #000000) 1;">
            <div class="py-4">
                <h3 class="text-center text-white">Registro</h3>
                <img src="<?= IMG . "lg.jpg" ?>" class="mx-auto d-block rounded-circle" width="40%" alt="Login">
                <div class="form-floating mb-3">
                    <input class="form-control input-transparente" name="nombre" id="nombre" type="text" placeholder="Nombre">
                    <label for="nombre"><i class="fa-solid fa-user me-2"></i>Nombre</label>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control input-transparente" name="apellido" id="apellido" type="text" placeholder="Apellido">
                    <label for="apellido"><i class="fa-regular fa-address-book me-2"></i>Apellido</label>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control input-transparente" name="usuario" id="usuario" type="email" placeholder="Usuario">
                    <label for="usuario"><i class="fa-solid fa-envelope me-2"></i>usuario (email)</label>
                </div>
                <div class="form-floating mb-3">
                    <input class="form-control input-transparente" name="password" id="password" type="password" placeholder="Password">
                    <label for="password"><i class="fa-solid fa-lock me-2"></i>Password</label>
                </div>
                <button type="button" class="btn btn-gradiente w-100 mb-3" id="btn_registro">
                    <i class="fa-solid fa-chalkboard-user me-2"></i>Registrar
                </button>
                <a href="#" class="btn btn-gradiente w-100" id="btn_inicio">
                    <i class="fa-solid fa-door-open me-2"></i>Inicio de sesión
                </a>
            </div>
        </div>
    </div>
</form>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="./public/js/registro.js"></script>
