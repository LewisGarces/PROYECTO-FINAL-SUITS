<?php
    if(!isset($_SESSION['usuario'])){
        header("location:login");
        exit();
    }
?>
<link rel="stylesheet" href="./public/css/fondo2.css">
<!-- Barra de Navegación -->
<nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
        <!-- Logo y nombre de la empresa -->
        <a class="navbar-brand mx-auto fw-bold text-white" style="background: linear-gradient(90deg, #8B0000, #00008B); -webkit-background-clip: text; color: transparent; border: 2px solid transparent; padding: 5px 10px; font-size: 1.5rem; letter-spacing: 1px;" href="#">
            Sistema de compras CRUD
        </a>
        
        <!-- Botón de navegación en dispositivos pequeños -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- Menú de navegación -->
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link text-white" href="inicio" style="font-size: 1.1rem;">
                        <i class="fas fa-home" style="font-size: 1.3rem;"></i> Inicio
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link text-white" href="compras" style="font-size: 1.1rem;">
                    <i class="fas fa-cart-shopping text-warning" style="font-size: 1.3rem;"></i>
                    Compras
                    </a>
                </li>
                
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
                          <li><hr class="dropdown-divider"></li>
                            <button class="dropdown-item text-danger" id="btn_cerrar">
                                <i class="fas fa-sign-out-alt"></i> Cerrar sesión
                            </button>
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
            <h2>Lista de compras</h2>
        </div>
        <div class="col-10 text-end mt-3">
        <button type="button" class="btn" 
                 style="background-color: #003366; color: #ffffff; border-color: #003366;" 
                 data-bs-toggle="modal" data-bs-target="#agregarModal">
             Añadir compras
        </button>
        <button type="button" class="btn" onclick="confirmarVisualizarPasteles()" 
                style="background-color: #FFA500; color: #000000; border-color: #FFA500;">
                Pasteles
            </button>

            <table id="myTable" class="display table text-white">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre del cliente</th>
                        <th scope="col">productos</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Unidades</th>
                        <th scope="col">Fecha de entrega</th>
                        <th scope="col">Acciones</th>
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
<div class="modal fade" id="editarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style="color: black;">Actualizar producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

            <div class="modal-body">
                <div class="row">
                    <div class="col-md-10">
                        <input type="text" hidden id="id_prodcuto_act">
                        <div class="form-floating mb-3">
                            <input class="form-control" id="edit_nombre_cliente" name="edit_nombre_cliente" type="text"
                                placeholder="Nombre_cliente">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Nombre del cliente</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="edit_producto" name="edit_producto" type="text"
                                placeholder="Producto">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Producto</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="edit_precio" name="edit_precio" type="text"
                                placeholder="Precio">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Precio</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="edit_unidades" name="edit_unidades" type="text"
                                placeholder="Unidades">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Unidades</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="edit_fecha_entrega" name="edit_fecha_entrega" type="date"
                                placeholder="Fecha_entrega">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Fecha de entrega</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btn_actualizar">Actualizar</button>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="agregarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" style="color: black;" id="exampleModalLabel">Agregar compra</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-10">
                    <div class="form-floating mb-3">
                            <input class="form-control" id="nombre_cliente" name="nombre_cliente" type="text"
                                placeholder="Nombre_cliente">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Nombre del cliente</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="producto" name="producto" type="text"
                                placeholder="Producto">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Producto</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="precio" name="precio" type="text" placeholder="Precio">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Precio</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="unidades" name="unidades" type="text"
                                placeholder="Unidades">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Unidades</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input class="form-control" id="fecha_entrega" name="fecha_entrega" type="date"
                                placeholder="Fecha_entrega">
                            <label class="text-primary" for="usuario"><i
                                    class="fa-solid fa-envelope me-2"></i>Fecha de entrega</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="btn_agregar">Añadir</button>
            </div>
        </div>
    </div>
</div>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="./public/js/boton-editar.js"></script>
<script src="./public/js/compras.js"></script>
