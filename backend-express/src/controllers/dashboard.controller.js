import Proyecto from '../models/Proyecto';
import Usuario from '../models/Usuario';

// Función para obtener los datos para el dashboard.
export const obtenerDatos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find(null, 'nombre usuario tareas.nombre tareas._id');
        const usuarios = await Usuario.find(null, 'username');
        let datos = {};
        let proyectosPorUsuario = [];

        usuarios.forEach(usu => {
            const proyectosDelUsuario = proyectos.filter(pro => pro.usuario.toString() === usu._id.toString())
            proyectosPorUsuario.push({usuario: usu.username, proyectos: proyectosDelUsuario.length});
        })

        proyectosPorUsuario.sort( (a, b) => (a.proyectos > b.proyectos) ? -1 : ((a.proyectos < b.proyectos) ? 1 : 0) );

        const primerosCinco = proyectosPorUsuario.slice(0, 5);

        datos.usuarios = usuarios.length;
        datos.proyectos = proyectos.length;
        datos.proyectosPorUsuario = primerosCinco;

        res.status(200).json(datos);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Dashboard',
            funcion: 'obtenerDatos'
        });
    }
}