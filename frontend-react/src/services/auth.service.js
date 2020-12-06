import config from '../config'

const iniciarSesion = async (username, password) => {
    try {
        const parametros = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username: username, password: password, })        
        }

        const res = await fetch( `${config.apiUrl}/auth/signin`, parametros);

        if (res.status === 200) {
            const tok = await res.json()
            sessionStorage.setItem('token', tok.token);
            return 0; // Login correcto
        } else if (res.status === 400) {
            return 1; // usuario incorrecto
        } else if (res.status === 401) {
            return 2; // password incorrecto
        } else {
            return 3;
        }
    } catch (error) {
        return 9;
    }
}

const cerrarSesion = () => {
    try {
        sessionStorage.removeItem('token');
        return 0;
    } catch (error) {
        return 9;
    }
}

const registrarUsuario = async (username, password) => {
    try {
        const parametros = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ username: username, password: password})      
        }

        const res = await fetch( `${config.apiUrl}/auth/signup`, parametros);

        if (res.status === 200) {
            const tok = await res.json()
            sessionStorage.setItem('token', tok.token);
            return 0; // Usuario creado
        } else if (res.status === 409) {
            return 1; // Usuario ya existe
        } else {
            return 3;
        }
    } catch (error) {
        return 9
    }
}

const obtenerUsuario = () => {
    const token = sessionStorage.getItem('token');
    const usuario =  obtenerPayload(token);
    /* console.log(usuario); */
    return usuario;
}

const obtenerPayload = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const authService = {
    iniciarSesion,
    registrarUsuario,
    cerrarSesion,
    obtenerUsuario
}

export default authService;

