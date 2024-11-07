<?php
$dni = $_GET['dni'];
$api_url = "https://api.apis.net.pe/v2/dni?numero=" . $dni;
$token = "";

$options = [
    "http" => [
        "method" => "GET",
        "header" => "Authorization: Bearer " . $token
    ]
];

$context = stream_context_create($options);
$response = @file_get_contents($api_url, false, $context);

if ($response === FALSE) {
    echo json_encode(["error" => "No se pudo conectar con la API externa."]);
    exit;
}

$data = json_decode($response, true);

if (isset($data["error"])) {
    echo json_encode(["error" => $data["error"]]);
    exit;
}

echo json_encode([
    "nombre" => $data["nombres"],
    "apellidoPaterno" => $data["apellidoPaterno"],
    "apellidoMaterno" => $data["apellidoMaterno"],
]);
?>
