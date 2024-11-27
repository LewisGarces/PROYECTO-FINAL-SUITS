<?php
    require_once '../config/conexion.php';
    session_start();

    class Login extends Conexion{
        private function crear_sesion($datos){
            $_SESSION['usuario'] = $datos;            
        }

        public function cerrar_sesion(){
            session_unset();
            session_destroy();
            echo json_encode([1,"Sesion finalizada!"]);
        }

        public function iniciar_sesion(){
            $usuario = $_POST['usuario'];
            $password = $_POST['password'];

            // Validar que el usuario y la contraseña no estén vacíos
            if (empty($usuario) || empty($password)) {
                echo json_encode([0, "El correo y la contraseña no pueden estar vacíos."]);
                return;
            }

            // Consulta a la base de datos para verificar las credenciales
            $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_usuario WHERE usuario = :usuario");
            $consulta->bindParam(":usuario", $usuario);
            $consulta->execute();
            $datos = $consulta->fetch(PDO::FETCH_ASSOC);
            
            if ($datos) {
                if (password_verify($password, $datos['password'])) {
                    $this->crear_sesion($datos);
                    echo json_encode([1, "Sesión iniciada!"]);
                } else {
                    echo json_encode([0, "Error en credenciales de acceso!"]);
                }
            } else {
                echo json_encode([0, "No se encontró el usuario!"]);
            }
        }
    }

    // Ejecutar el método correspondiente según lo que se le pase por POST
    $consulta = new Login();
    $metodo = $_POST['metodo'];
    $consulta->$metodo();
?>
