import Proyecto from '../models/Proyecto';

// Obtener todos los proyectos almacenados
export const obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find().populate('tareas');
        res.status(200).json(proyectos);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Proyecto',
            funcion: 'obtenerProyectos'
        });
    }
}

// Obtener un proyecto por su ID
export const obtenerProyectoPorID = async (req, res) => {
    try {
        const proyecto = await Proyecto.findById(req.params.id).populate('tareas');
        res.status(200).json(proyecto);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Proyecto',
            funcion: 'obtenerProyectoPorID'
        });
    }
}

// Obtener un proyecto por la id del usuario
export const obtenerProyectosPorUsuario = async (req, res) => {
    try {
        const proyecto = await Proyecto.find({usuario: req.params.id}).populate('tareas');
        res.status(200).json(proyecto);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Proyecto',
            funcion: 'obtenerProyectoPorID'
        });
    }
}

// Crear proyecto
export const crearProyecto = async (req, res) => {
    try {
        const {_id, nombre, descripcion, estado, tareas, usuario} = req.body;
        const nuevoProyecto = new Proyecto({_id, nombre, descripcion, estado, tareas, usuario});
        const proyectoCreado = await nuevoProyecto.save();
        res.status(201).json(proyectoCreado);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Proyecto',
            funcion: 'crearProyecto'
        });
    }
}

// Actualizar proyecto
export const actualizarProyecto = async (req, res) => {
    try {
        const idProyecto = req.params.id;
        const proyectoActualizado = await Proyecto.findByIdAndUpdate(idProyecto, req.body, {new: true});
        res.status(200).json(proyectoActualizado);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Proyecto',
            funcion: 'actualizarProyecto'
        });
    }
}

// Eliminar proyecto
export const eliminarProyecto = async (req, res) => {
    try {
        const idProyecto = req.params.id;
        await Proyecto.findByIdAndDelete(idProyecto);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Proyecto',
            funcion: 'eliminarProyecto'
        });
    }
}