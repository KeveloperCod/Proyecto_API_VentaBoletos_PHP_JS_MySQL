async function consultarDNI() {
    const dni = document.getElementById("dni").value;
    if (dni.length !== 8) {
        alert("El DNI debe tener 8 dígitos.");
        return;
    }
    
    const response = await fetch(`php/reniec_api.php?dni=${dni}`);
    const data = await response.json();
    
    if (data.error) {
        alert(data.error);
    } else {
        document.getElementById("nombre").value = `${data.nombre}`;
        document.getElementById("apellido").value = `${data.apellidoPaterno} ${data.apellidoMaterno}`;
    }
}

document.getElementById("boletoForm").onsubmit = function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch("php/create.php", {
        method: "POST",
        body: formData,
    }).then(() => {
        alert("Boleto registrado con éxito.");
        location.reload();
    });
};

function formatDateToInputFormat(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${year}-${month}-${day}`; 
}

function formatDateFromInputFormat(dateStr) {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`; 
}

function loadBoletos() {
    fetch('php/get.php')
        .then(response => response.json())
        .then(boletos => {
            const tableBody = document.getElementById('boletosTable');
            tableBody.innerHTML = '';

            boletos.forEach(boleto => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${boleto.dni}</td>
                    <td>${boleto.nombre}</td>
                    <td>${boleto.apellido}</td>
                    <td>${boleto.fecha_viaje}</td>
                    <td>${boleto.destino}</td>
                    <td>
                        <div class="botones-container">
                            <button class="botone1" onclick="editBoleto(${boleto.id})" >Editar</button>
                            <button class="botone2" onclick="deleteBoleto(${boleto.id})" >Eliminar</button>
                        </div>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}



document.addEventListener('DOMContentLoaded', loadBoletos);

function editBoleto(id) {
    fetch(`php/get.php?id=${id}`)
        .then(response => response.json())
        .then(boletos => {
            const boleto = Array.isArray(boletos) ? boletos.find(b => b.id === String(id)) : boletos;

            if (boleto && boleto.fecha_viaje) {
                document.getElementById('dni').value = boleto.dni;
                document.getElementById('nombre').value = boleto.nombre;
                document.getElementById('apellido').value = boleto.apellido;

                document.getElementById('fecha_viaje').value = formatDateToInputFormat(boleto.fecha_viaje);

                document.getElementById('destino').value = boleto.destino;

                document.getElementById('boletoForm').onsubmit = function (e) {
                    e.preventDefault();
                    updateBoleto(id);
                };
            } else {
                console.error("No se encontró la fecha del boleto:", boleto);
            }
        })
        .catch(error => console.error('Error:', error));
}

function updateBoleto(id) {
    const dni = document.getElementById('dni').value;
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const fecha_viaje = formatDateFromInputFormat(document.getElementById('fecha_viaje').value); // Convertir la fecha a 'yyyy-MM-dd'
    const destino = document.getElementById('destino').value;

    if (!dni || !nombre || !apellido || !fecha_viaje || !destino) {
        alert("Todos los campos son requeridos.");
        return;
    }

    const data = {
        dni,
        nombre,
        apellido,
        fecha_viaje,
        destino
    };

    fetch(`php/update.php?id=${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert("Boleto actualizado exitosamente.");
            loadBoletos();
            document.getElementById('boletoForm').reset();
        } else {
            alert("Error al actualizar el boleto.");
        }
    })
    .catch(error => console.error('Error:', error));
}

function deleteBoleto(id) {
    if (confirm("¿Estás seguro de que quieres eliminar este boleto?")) {
        fetch(`php/delete.php?id=${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                alert("Boleto eliminado exitosamente.");
                loadBoletos();
            } else {
                alert("Error al eliminar el boleto.");
            }
        })
        .catch(error => console.error('Error:', error));
    }
}
