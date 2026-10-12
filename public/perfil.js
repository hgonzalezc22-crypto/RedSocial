(async () => {
    const token = localStorage.getItem('token');
    if (!token) return (window.location.href = 'login.html');

    function decodificarToken(t) {
        try {
            const base64 = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
            const json = decodeURIComponent(
                atob(base64).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join('')
            );
            return JSON.parse(json);
        } catch {
            return null;
        }
    }

    const elUsername = document.getElementById('username');
    const elNombre = document.getElementById('nombre-real');
    const elRol = document.getElementById('rol-texto');
    const elBio = document.getElementById('biografia');
    const elFecha = document.getElementById('fecha-ingreso');
    const elAvatar = document.getElementById('avatar-circulo');

    function pintarPerfil(u) {
        elUsername.textContent = u.username || '';
        elNombre.textContent = u.nombre || u.username || '';
        elRol.textContent = u.es_mod ? 'moderador' : 'usuario';
        elBio.textContent = u.biografia || 'Este usuario aún no ha escrito una biografía.';

        if (u.fecha_creacion) {
            const fecha = new Date(u.fecha_creacion).toLocaleDateString('es-GT');
            elFecha.textContent = `Se unió en: ${fecha}`;
        }

        const pfp = u.pfpUrl || 'pfp_default.png';
        elAvatar.style.backgroundImage = `url('/uploads/${pfp}')`;
        elAvatar.style.backgroundSize = 'cover';
        elAvatar.style.backgroundPosition = 'center';
    }

    // 1. Pintar al instante con los datos del token
    const payload = decodificarToken(token);
    if (!payload || payload.exp * 1000 <= Date.now()) {
        localStorage.clear();
        return (window.location.href = 'login.html');
    }
    pintarPerfil(payload);

    // 2. Validar con el servidor y refrescar con datos actuales de la BD
    try {
        const respuesta = await fetch('/api/usuario-perfil', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!respuesta.ok) {
            localStorage.clear();
            return (window.location.href = 'login.html');
        }

        const { usuario } = await respuesta.json();
        pintarPerfil(usuario);
    } catch (error) {
        console.error('Error al cargar el perfil:', error);
    }

    // Filtro publicaciones / comentarios
    const filtro = document.getElementById('filtro-publicaciones');
    const listado = document.getElementById('seccion-listado');

    filtro.addEventListener('change', () => {
        listado.innerHTML = `<p>Mostrando ${filtro.value}...</p>`;
    });
})();