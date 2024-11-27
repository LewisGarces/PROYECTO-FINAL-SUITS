<?php
require_once '../config/conexion.php';

class Registro extends Conexion{
    public function iniciar_registro(){
        $nombre = $_POST['nombre'];
        $apellido = $_POST['apellido'];
        $usuario = $_POST['usuario'];
        $password = $_POST['password'];

        // Expresión regular para validar el correo electrónico
        $regex_email = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/";
        // Expresión regular para validar la contraseña (mínimo 8 dígitos numéricos)
        $regex_password = "/^\d{8}$/";

        // Validar el correo electrónico
        if (!preg_match($regex_email, $usuario)) {
            echo json_encode([0, "Por favor, ingrese un correo electrónico válido."]);
            return;
        }

        // Verificar si el usuario ya existe en la base de datos
        $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_usuario WHERE usuario = :usuario");
        $consulta->bindParam(":usuario", $usuario);
        $consulta->execute();
        $datos = $consulta->fetch(PDO::FETCH_ASSOC);

        if(!$datos){
            // Insertar el nuevo usuario en la base de datos
            $insercion = $this->obtener_conexion()->prepare("INSERT INTO t_usuario (nombre, apellido, usuario, password) VALUES(:nombre, :apellido, :usuario, :password)");
            $insercion->bindParam(":nombre", $nombre);
            $insercion->bindParam(":apellido", $apellido);
            $insercion->bindParam(":usuario", $usuario);
            $pass = password_hash($password, PASSWORD_BCRYPT);
            $insercion->bindParam(":password", $pass);

            if($insercion->execute()){
                echo json_encode([1, "Usuario registrado con éxito."]);
            } else {
                echo json_encode([0, "Hubo un error al registrar el usuario."]);
            }
        } else {
            echo json_encode([0, "El usuario ya está registrado."]);
        }
    }
}

// Crear instancia y ejecutar el método de registro
$consulta = new Registro();
$metodo = $_POST['metodo'];
$consulta->$metodo();
?>
