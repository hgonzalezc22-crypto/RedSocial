document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const contrasenia = document.getElementById('contrasenia').value;
    const contrasenia2 = document.getElementById('contrasenia2').value; // 1. Obtener el valor del segundo campo
    const correo = document.getElementById('correo').value;

    // 2. Verificar si coinciden las contraseñas
    if (contrasenia !== contrasenia2) {
        alert('Las contraseñas no coinciden');
        return; // Detiene la ejecución y evita el fetch
    }

    // El payload solo incluye una sola propiedad de contraseña
    const payloadUser = {
        username: username,
        contrasenia: contrasenia,
        correo: correo 
    };

    try {
        const responseCrear = await fetch('/api/usuario-crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadUser) 
        });

        const dataCrear = await responseCrear.json();

        if (!responseCrear.ok) {
            alert(dataCrear.mensaje || 'Hubo un error al agregar el usuario');
            return;
        }

        console.log("USUARIO CREADO CORRECTAMENTE");
        // 3. Redirigir únicamente si la petición fue exitosa
        window.location.href = 'login.html';

    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
    }
});