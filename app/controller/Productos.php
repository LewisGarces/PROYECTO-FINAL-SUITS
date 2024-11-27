<?php
    require_once '../config/conexion.php';
    class Productos extends Conexion{
        public function obtener_datos(){
            $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_producto");
            $consulta->execute();
            $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
            $this->cerrar_conexion();
            echo json_encode($datos);
        }

        public function insertar_datos(){
            $insercion = $this->obtener_conexion()->prepare("INSERT INTO t_producto(producto, disponibilidad) VALUES(:producto, :disponibilidad)");
            $producto = $_POST['producto'];	
            $disponibilidad = $_POST['disponibilidad'];
            $insercion->bindParam(':producto',$producto);
            $insercion->bindParam(':disponibilidad',$disponibilidad);
            $insercion->execute();
            if($insercion){
                echo json_encode([1,"Los productos se visualizaran en la tabla"]);
            }else{
                echo json_encode([0,"insercion no realizada"]);
            }
        }

        public function actualizar_datos() {
            $conexion = $this->obtener_conexion();
            $actualizacion = $conexion->prepare(
                "UPDATE t_producto SET producto = :producto, disponibilidad = :disponibilidad WHERE id_producto = :id_producto"
            );
        
            $producto = $_POST['producto'];
            $disponibilidad = $_POST['disponibilidad'];
            $id_producto = $_POST['id_producto'];
        
            $actualizacion->bindParam(':producto', $producto);
            $actualizacion->bindParam(':disponibilidad', $disponibilidad);
            $actualizacion->bindParam(':id_producto', $id_producto);
        
            if ($actualizacion->execute()) {
                echo json_encode([1, "Actualización correcta", $id_producto]);
            } else {
                echo json_encode([0, "Actualización no realizada"]);
            }
        }
        
        public function eliminar_datos(){
            $eliminar = $this->obtener_conexion()->prepare("DELETE FROM t_producto WHERE id_producto = :id_producto");
            $id_producto = $_POST['id_producto'];
            $eliminar->bindParam(':id_producto',$id_producto);
            $eliminar->execute();
            if($eliminar){
                echo json_encode([1,"Eliminacion correcta"]);
            }else{
                echo json_encode([0,"Eliminacion no realizada"]);
            }
        }

        public function precargar_datos(){
            $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_producto WHERE id_producto = :id_producto");
            $id_producto = $_POST['id_producto'];
            $consulta->bindParam("id_producto",$id_producto);
            $consulta->execute();
            $datos = $consulta->fetch(PDO::FETCH_ASSOC);
            echo json_encode($datos);
        }
    }

    $consulta = new Productos();
    $metodo = $_POST['metodo'];
    $consulta->$metodo();
    
?>