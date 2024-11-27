<?php
    if(!isset($_SESSION['usuario'])){
        header("location:login");
        exit();
    }
?>
<link rel="stylesheet" href="./public/css/disponible.css">
<!-- Barra de Navegación -->
<nav class="navbar navbar-expand-lg navbar-dark">

    <div class="container-fluid">
        <!-- Logo y nombre de la empresa -->
        <a class="navbar-brand mx-auto fw-bold text-white" style="background: linear-gradient(90deg, #8B0000, #00008B); -webkit-background-clip: text; color: transparent; border: 2px solid transparent; padding: 5px 10px; font-size: 1.5rem; letter-spacing: 1px;" href="#">
            Sistema de Pasteles Disponibles
        </a>
        
        <!-- Botón de navegación en dispositivos pequeños -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Menú de navegación -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                
                <!-- Menú desplegable con el nombre del usuario y cerrar sesión -->
                <li class="nav-item dropdown">
                     <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="font-size: 1.1rem;">
                         <i class="fas fa-user-circle" style="font-size: 1.3rem;"></i>
                          Mi cuenta
                         </a>
                     <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li class="dropdown-item">
                     <i class="fas fa-user" style="font-size: 1rem;"></i>
                <span class="navbar-text text-dark">
                <?= isset($_SESSION['usuario']) ? $_SESSION['usuario']['nombre'] . ' ' . $_SESSION['usuario']['apellido'] : 'Usuario'; ?>
                </span>
                </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</nav>



<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-10 text-center mt-3">
            <h2>Lista de pasteles disponibles</h2>
        </div>
        <div class="col-10 text-end mt-3">
        <button 
            type="button" 
            class="btn" 
            onclick="confirmarRedireccion()" 
            style="background-color: #FFA500; color: #000000; border-color: #FFA500;">
            Regresar a comprar
        </button>

             <table id="myTable" class="display table text-white">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Productos</th>
                        <th scope="col">disponibilidad</th>
                    </tr>
                </thead>
                <tbody id="contenido_producto">
                </tbody>
            </table>

        </div>
        <div class="col-10 text-end">
            <hr class="text-primary">
        </div>
    </div>
</div>
        </div>
    </div>
</div>
<script src="./public/js/disponibles.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- Asegúrate de tener SweetAlert2 -->