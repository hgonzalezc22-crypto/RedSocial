document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const contrasenia = document.getElementById('contrasenia').value;

    try {
        const respuesta = await fetch('/api/usuario-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, contrasenia })
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            localStorage.setItem('token', resultado.token);
            //localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
            window.location.href = 'index.html';
        } else {
            alert(resultado.error || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('Error al intentar conectar con el servidor.');
    }
});