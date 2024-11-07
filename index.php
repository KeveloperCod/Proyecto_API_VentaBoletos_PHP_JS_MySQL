<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Boletos de Viaje</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="container">
        <h1>Venta de Boletos de Viaje</h1>

        <form id="boletoForm">
            <input type="text" name="dni" id="dni" placeholder="Ingrese DNI" required>
            <button type="button" onclick="consultarDNI()">Consultar DNI</button>
            <input type="text" name="nombre" id="nombre" placeholder="Nombre" readonly required>
            <input type="text" name="apellido" id="apellido" placeholder="Apellido" readonly required>
            <input type="date" name="fecha_viaje" id="fecha_viaje" required>
            <input type="text" name="destino" id="destino" placeholder="Destino" required>
            <button type="submit">Registrar Boleto</button>
        </form>
        
        <table>
            <thead>
                <tr>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Fecha Viaje</th>
                    <th>Destino</th>
                </tr>
            </thead>
            <tbody id="boletosTable"></tbody>
        </table>
    </div>

    <script src="js/script.js"></script>
</body>
</html>
