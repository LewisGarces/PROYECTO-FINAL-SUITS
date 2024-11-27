<?php
require_once '../config/conexion.php';
session_start();

class Usuario extends Conexion {
    public function editar_usuario() {
        if (!isset($_SESSION['usuario'])) {
            echo json_encode([0, "No hay sesión activa."]);
            return;
        }

        // Obtener los nuevos datos desde la solicitud POST
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $usuario = $_POST['usuario'];

        // Validar los datos (por ejemplo, si el email es válido)
        if (!filter_var($usuario, FILTER_VALIDATE_EMAIL)) {
            echo json_encode([0, "El correo electrónico proporcionado no es válido."]);
            return;
        }

        // Actualizar los datos en la base de datos
        $consulta_sql = "UPDATE t_usuario SET nombre = :nombre, apellido = :apellido, usuario = :usuario WHERE usuario = :usuario_antiguo";

        $consulta = $this->obtener_conexion()->prepare($consulta_sql);
        $consulta->bindParam(":nombre", $nombre);
        $consulta->bindParam(":apellido", $apellido);
        $consulta->bindParam(":usuario", $usuario);
        $consulta->bindParam(":usuario_antiguo", $_SESSION['usuario']['usuario']);  // Usamos el usuario antiguo para actualizar

        if ($consulta->execute()) {
            // Si la actualización es exitosa, actualizar la sesión
            $_SESSION['usuario']['nombre'] = $nombre;
            $_SESSION['usuario']['apellido'] = $apellido;
            $_SESSION['usuario']['usuario'] = $usuario;

            echo json_encode([1, "Datos actualizados correctamente."]);
        } else {
            echo json_encode([0, "Error al actualizar los datos."]);
        }
    }
}

$consulta = new Usuario();
$metodo = $_POST['metodo'];
$consulta->$metodo();

?>