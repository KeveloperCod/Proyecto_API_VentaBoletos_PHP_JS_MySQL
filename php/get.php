<?php
include 'db.php';

$result = $conn->query("SELECT * FROM boletos");

$boletos = [];
while ($row = $result->fetch_assoc()) {
    $boletos[] = $row;
}

echo json_encode($boletos);

$conn->close();
?>
