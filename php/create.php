<?php
include 'db.php';

$dni = $_POST['dni'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$fecha_viaje = $_POST['fecha_viaje'];
$destino = $_POST['destino'];

$sql = "INSERT INTO boletos (dni, nombre, apellido, fecha_viaje, destino) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $dni, $nombre, $apellido, $fecha_viaje, $destino);

if ($stmt->execute()) {
    echo json_encode(["success" => "Boleto registrado exitosamente."]);
} else {
    echo json_encode(["error" => "Error al registrar el boleto: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
