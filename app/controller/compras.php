<?php
    require_once '../config/conexion.php';
    class Productos extends Conexion{
        public function obtener_datos(){
            $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_productoS");
            $consulta->execute();
            $datos = $consulta->fetchAll(PDO::FETCH_ASSOC);
            $this->cerrar_conexion();
            echo json_encode($datos);
        }

        public function insertar_datos(){
            $insercion = $this->obtener_conexion()->prepare("INSERT INTO t_productoS(nombre_cliente, producto, precio, unidades, fecha_entrega) VALUES(:nombre_cliente, :producto, :precio, :unidades, :fecha_entrega)");
            $nombre_cliente = $_POST['nombre_cliente'];	
            $producto = $_POST['producto'];	
            $precio = $_POST['precio'];	
            $unidades = $_POST['unidades'];
            $fecha_entrega = $_POST['fecha_entrega'];
            $insercion->bindParam(':nombre_cliente',$nombre_cliente);	
            $insercion->bindParam(':producto',$producto);
            $insercion->bindParam(':precio',$precio);
            $insercion->bindParam(':unidades',$unidades);
            $insercion->bindParam(':fecha_entrega',$fecha_entrega);
            $insercion->execute();
            if($insercion){
                echo json_encode([1,"Los productos se visualizaran en la tabla"]);
            }else{
                echo json_encode([0,"insercion no realizada"]);
            }
        }

        public function actualizar_datos(){
            $actualizacion = $this->obtener_conexion()->prepare("UPDATE t_productos SET nombre_cliente = :nombre_cliente, producto = :producto, precio = :precio, unidades = :unidades, fecha_entrega = :fecha_entrega WHERE id_producto = :id_producto");
            $nombre_cliente = $_POST['nombre_cliente'];	
            $producto = $_POST['producto'];	
            $precio = $_POST['precio'];	
            $unidades = $_POST['unidades'];
            $fecha_entrega = $_POST['fecha_entrega'];
            $id_producto = $_POST['id_producto'];
            $actualizacion->bindParam(':nombre_cliente',$nombre_cliente);	
            $actualizacion->bindParam(':producto',$producto);
            $actualizacion->bindParam(':precio',$precio);
            $actualizacion->bindParam(':unidades',$unidades);
            $actualizacion->bindParam(':fecha_entrega',$fecha_entrega);
            $actualizacion->bindParam(':id_producto',$id_producto);
            if($actualizacion->execute()){
                echo json_encode([1,"Actualizacion correcta",$id_producto]);
            }else{
                echo json_encode([0,"Actualizacion no realizada"]);
            }
        }

        public function eliminar_datos(){
            $eliminar = $this->obtener_conexion()->prepare("DELETE FROM t_productos WHERE id_producto = :id_producto");
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
            $consulta = $this->obtener_conexion()->prepare("SELECT * FROM t_productos WHERE id_producto = :id_producto");
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