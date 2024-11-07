<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'boletos';
$username = 'root'; 
$password = ''; 

$id = $_GET['id'];
$data = json_decode(file_get_contents('php://input'), true);

$dni = $data['dni'];
$nombre = $data['nombre'];
$apellido = $data['apellido'];
$fecha_viaje = $data['fecha_viaje'];
$destino = $data['destino'];

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("UPDATE boletos SET dni = ?, nombre = ?, apellido = ?, fecha_viaje = ?, destino = ? WHERE id = ?");
    $stmt->execute([$dni, $nombre, $apellido, $fecha_viaje, $destino, $id]);

    echo json_encode(['success' => true, 'message' => 'Boleto actualizado exitosamente']);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
