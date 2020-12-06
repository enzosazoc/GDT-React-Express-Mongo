import auth from '../utils/auth';
import config from '../config';

const obtenerUsuarios = async () => {
    try {
        const res = await fetch(`${config.apiUrl}/usuarios`, { headers: { 'x-access-token': auth.obtenerToken() } });
        const usuarios = await res.json();

        if (res.status === 200) {
            return usuarios;
        } else {
            return 1;
        }
    } catch (error) {
        return 9;
    }
}

const crearUsuario = async (usuario) => {
    try {
        const parametros = {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: {
                'Content-type': 'application/json',
                'x-access-token': auth.obtenerToken()
            }
        }

        const res = await fetch(`${config.apiUrl}/usuarios`, parametros);
        if (res.status === 201) {
            return 0;
        } else {
            return 1;
        }
    } catch (error) {
        return 9;
    }
}

const cambiarUsername = async (body) => {
    try {
        const parametros = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'x-access-token': auth.obtenerToken()
            }
        }

        const res = await fetch(`${config.apiUrl}/usuarios/cambiar-username`, parametros);
        if (res.status === 204) {
            return 0;
        } else {
            return 1;
        }
    } catch (error) {
        return 9
    }
}

const cambiarPassword = async (body) => {
    try {
        const parametros = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'x-access-token': auth.obtenerToken()
            }
        }
        
        const res = await fetch(`${config.apiUrl}/usuarios/cambiar-password`, parametros);
        if (res.status === 204) {
            return 0;
        } else if (res.status === 401) {
            return 1; // password actual incorrecta
        } else if (res.status === 422) {
            return 2; // password y password de confirmación, no son iguales
        } else {
            return 3;
        }
    } catch (error) {
        return 9;
    }
}

const eliminarCuenta = async (body) => {
    try {
        const parametros = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-type': 'application/json',
                'x-access-token': auth.obtenerToken()
            }
        }

        const res = await fetch(`${config.apiUrl}/usuarios/eliminar-cuenta`, parametros);
        if (res.status === 204) {
            return 0;
        } else if (res.status === 400) {
            return 1 // Usuario no encontrado
        } else if (res.status === 401) {
            return 2; // Password incorrecta
        } else {
            return 3;
        }
    } catch (error) {
        return 9;
    }
}

const usuarioService = {
    obtenerUsuarios,
    crearUsuario,
    cambiarUsername,
    cambiarPassword,
    eliminarCuenta
}

export default usuarioService;