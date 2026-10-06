document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const contrasenia = document.getElementById('contrasenia').value;

    try {
        const respuesta = await fetch('/api/usuario-buscar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, contrasenia })
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            // Si la búsqueda coincide en la BD, redirige a index
            window.location.href = 'index.html';
        } else {
            alert(resultado.error || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('Error al intentar conectar con el servidor.');
    }
});