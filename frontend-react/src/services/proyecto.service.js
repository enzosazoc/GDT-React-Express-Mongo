import auth from '../utils/auth';
import authService from '../services/auth.service';
import config from '../config';

const obtenerProyectos = async () => {
    try {
        const res = await fetch(`${config.apiUrl}/proyectos`, { headers: { 'x-access-token': auth.obtenerToken() } });
        const proyectos = await res.json();

        if (res.status === 200) {
            return proyectos;
        } else {
            return 1;
        }
    } catch (error) {
        return 9;
    }
}

const obtenerProyectosPorUsuario = async () => {
    try {
        const usuario = authService.obtenerUsuario()
        const res = await fetch(`${config.apiUrl}/usuarios/${usuario.id}/proyectos`, { headers: { 'x-access-token': auth.obtenerToken() } });
        const proyectos = await res.json();

        if (res.status === 200) {
            return proyectos;
        } else {
            return 1;
        }
    } catch (error) {
        return 9;
    }
}

const obtenerProyecto = async (id) => {
    try {
        const res = await fetch(`${config.apiUrl}/proyectos/${id}`, { headers: { 'x-access-token': auth.obtenerToken() } });
        const proyecto = await res.json();

        if (res.status === 200) {
            return proyecto;
        } else {
            return 1
        }
    } catch (error) {
        return 9;
    }
}

const crearProyecto = async (proyecto) => {
    try {
        const usuarioObtenido = authService.obtenerUsuario();
        if (!usuarioObtenido) return 2;
        const usuario = {_id : usuarioObtenido.id};
        proyecto.usuario = usuario;
        const parametros = {
            method: 'POST',
            body: JSON.stringify(proyecto),
            headers: {
                'Content-type': 'application/json',
                'x-access-token': auth.obtenerToken()
            }
        }

        const res = await fetch(`${config.apiUrl}/proyectos`, parametros);
        if (res.status === 201) {
            return 0;
        } else {
            return 1;
        }
    } catch (error) {
        return 9;
    }
}

const actualizarProyecto = async (id, proyecto) => {
    try {
        const parametros = {
            method: 'PUT',
            body: JSON.stringify(proyecto),
            headers: {
                'Content-type': 'application/json',
                'x-access-token': auth.obtenerToken()
            }
        }

        const res = await fetch(`${config.apiUrl}/proyectos/${id}`, parametros);
        const proyectoActualizado = await res.json()
        if (res.status === 200) {
            return proyectoActualizado;
        } else {
            return 1;
        }
    } catch (error) {
        return 9;
    }
}

const eliminarProyecto = async (id) => {
    try {
        const parametros = {
            method: 'DELETE',
            headers: { 'x-access-token': auth.obtenerToken() }
        }
        
        const res = await fetch(`${config.apiUrl}/proyectos/${id}`, parametros);

        if (res.status === 204) {
            return 0;
        } else {
            return 1;
        }
    } catch (error) {
        return 9;
    }
}

const proyectoService = {
    obtenerProyectos,
    obtenerProyectosPorUsuario,
    obtenerProyecto,
    crearProyecto,
    actualizarProyecto,
    eliminarProyecto
}

export default proyectoService;