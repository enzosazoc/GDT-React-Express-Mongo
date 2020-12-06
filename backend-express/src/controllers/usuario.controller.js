import Rol from '../models/Rol';
import Usuario from '../models/Usuario';

// Función para obtener todos los usuairos almacenados
export const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().populate('roles');
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Usuario',
            funcion: 'obtenerUsuarios'
        });
    }
}

// Función para obtener un usuario por su ID
export const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Usuario',
            funcion: 'obtenerUsuarioPorId'
        });
    }
}

// Función para crear un usuario
export const crearUsuario = async (req, res) => {
    try {
        const {_id, username, password, roles} = req.body;
        const nuevoUsuario = new Usuario({
            _id,
            username, 
            password: await Usuario.encriptarPassword(password)
        })

        if (roles) {
            const rolesEncotrados = await Rol.find({nombre: {$in: roles}});
            nuevoUsuario.roles = rolesEncotrados.map(rol => rol._id);
        } else {
            const rol = await Rol.findOne({nombre: "usuario"});
            nuevoUsuario.roles = [rol._id];
        }

        const usuarioCreado = await nuevoUsuario.save();
        res.status(201).json(usuarioCreado);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Usuario',
            funcion: 'crearUsuario'
        });
    }
}

// Función para actualizar usuario
export const actualizarUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.id;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(idUsuario, req.body, {new: true});
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Usuario',
            funcion: 'actualizarUsuario'
        });
    }
}

// Función para eliminar un usuario
export const eliminarUsuario = async (req, res) => {
    try {
        const idUsuario = req.params.id
        await Usuario.findByIdAndDelete(idUsuario)
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Usuario',
            funcion: 'eliminarUsuario'
        });
    }
}

// Función para cambiar el nombre de usuario del usuario logueado
export const cambiarUsername = async (req, res) => {
    try {
        const idUsuario = req.idUsuario;
        const {username} = req.body;
        
        await Usuario.findByIdAndUpdate(idUsuario, {username: username}, { runValidators: true });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Usuario',
            funcion: 'cambiarUsername'
        });
    }
}

// Función para cambiar la contraseña del usuario logueado
export const cambiarPassword = async (req, res) => {
    try {
        const idUsuario = req.idUsuario;
        const {passwordActual, passwordNueva, passwordNuevaConfirmacion} = req.body;
        const usuarioEncontrado = await Usuario.findOne({_id: idUsuario});
        
        const passwordEncontrada =  await Usuario.compararPassword(passwordActual, usuarioEncontrado.password);
        if (!passwordEncontrada) return res.status(401).json({mensaje: 'Password actual incorrecta'});
        
        if (passwordNueva !== passwordNuevaConfirmacion) return res.status(422).json({mensaje: 'Password y Password de Confirmación, no son iguales'});

        const passwordEncriptada =  await Usuario.encriptarPassword(passwordNueva);
        await Usuario.findByIdAndUpdate(idUsuario, {password: passwordEncriptada});
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Usuario',
            funcion: 'cambiarPassword'
        });
    }
}

// Función para eliminar la cuenta del usuario logueado
export const eliminarCuenta = async (req, res) => {
    try {        
        const idUsuario = req.idUsuario;
        const {username, password} = req.body;  

        const usuarioEncontrado = await Usuario.findOne({username: username});
        if(!usuarioEncontrado) return res.status(400).json({mensaje: 'Usuario incorrecto'});

        const passwordEncontrada =  await Usuario.compararPassword(password, usuarioEncontrado.password);
        if(!passwordEncontrada) return res.status(401).json({message: 'Password incorrecta'});
        
        await Usuario.findByIdAndDelete(idUsuario);
        res.status(204).json();
    } catch (error) {
        res.status(500).json({
            error: 'Error del servidor',
            entidad: 'Usuario',
            funcion: 'eliminarCuenta'
        });
    }
}