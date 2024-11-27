<?php
if (isset($_SESSION['usuario'])) {
    header("location:inicio");
    exit();
}
?>
<nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
        <!-- Logo y nombre de la empresa -->
        <a class="navbar-brand mx-auto fw-bold text-white" style="background: linear-gradient(90deg, #8B0000, #00008B); -webkit-background-clip: text; color: transparent; border: 2px solid transparent; padding: 5px 10px; font-size: 1.5rem; letter-spacing: 1px;" href="#">
        INICIAR SESION
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
<link rel="stylesheet" href="./public/css/style.css">
<form id="frm_login" class="container mt-3">
    <div class="row justify-content-center">
        <div class="col-4 fondo p-4" style="border-radius: 15px; border: 4px solid; border-image: linear-gradient(45deg, #4682B4, #000000) 1;">
            <h3 class="text-center">Login</h3>
            <img src="<?= IMG . "lg.jpg" ?>" class="mx-auto d-block rounded-circle" width="40%" alt="Login">
            <div class="form-floating mb-3">
                <input class="form-control" id="usuario" name="usuario" type="text" placeholder="e-mail">
                <label for="usuario"><i class="fa-solid fa-envelope me-2"></i>usuario (e-mail)</label>
            </div>
            <div class="form-floating mb-3">
                <input id="password" name="password" type="password" class="form-control" placeholder="Password">
                <label for="password"><i class="fa-solid fa-lock me-2"></i>Password</label>
            </div>
            <button class="btn btn-primary w-100 mb-3" type="button" id="btn_iniciar">
                <i class="fa-solid fa-door-open me-2"></i>Iniciar sesión
            </button>
            <a href="#" class="btn btn-danger w-100" id="btn_registrar">
                <i class="fa-solid fa-chalkboard-user me-2"></i>Registro
            </a>
            <p class="text-center mt-3">
                <a href="#" id="recuperar_contrasena" style="color: #87CEEB; text-decoration: underline;">Olvidaste tu contraseña</a>
            </p>
        </div>
    </div>
</form>
<script src="./public/js/login.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- Asegúrate de tener SweetAlert2 -->
