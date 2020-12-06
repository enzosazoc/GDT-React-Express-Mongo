import jwt from 'jsonwebtoken';
import config from '../config';
import Usuario from '../models/Usuario';
import Rol from '../models/Rol';

export const signUp = async (req, res) => {
    try {
        const { username, password , roles } = req.body;
        
        const nuevoUsuario = new Usuario({
            username,
            password: await Usuario.encriptarPassword(password)
        });
        
        if (roles) {
            const rolesEncotrados = await Rol.find({nombre: {$in: roles}});
            nuevoUsuario.roles = rolesEncotrados.map(rol => rol._id);
        } else {
            const rol = await Rol.findOne({nombre: "ROLE_USUARIO"});
            nuevoUsuario.roles = [rol._id];
        }
        
        /* await nuevoUsuario.validate(); */
        const usuarioCreado = await nuevoUsuario.save();
        
        const rolesUsuarioCreado = await Rol.find({_id: {$in: usuarioCreado.roles}});
        const rolesPayload = rolesUsuarioCreado.map(rol => rol.nombre);

        const payload = {
            id: usuarioCreado._id,
            username: usuarioCreado.username,
            roles: rolesPayload
        }

        const token = jwt.sign(payload, config.SECRET, { expiresIn: 86400 });  // 24 hrs

        res.status(200).json({token});
    } catch (error) {
        console.log(error)
        res.status(500).json({
            mensaje: 'Error del servidor',
            funcion: 'signUp'
        });
    }
}

export const signIn = async (req, res) => {
    
    try {
        const usuarioEncontrado = await Usuario.findOne({username: req.body.username}).populate('roles');
        if(!usuarioEncontrado) return res.status(400).json({token: null, mensaje: 'Usuario no encontrado'});

        const passwordEncontrada =  await Usuario.compararPassword(req.body.password, usuarioEncontrado.password);
        if(!passwordEncontrada) return res.status(401).json({token: null, message: 'Password incorrecta'});

        const rolesPayload = usuarioEncontrado.roles.map(rol => rol.nombre);
        const payload = { id: usuarioEncontrado._id, username: usuarioEncontrado.username, roles: rolesPayload }
        const token = jwt.sign(payload, config.SECRET, { expiresIn: 86400 });

        res.json({token})
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error del servidor',
            funcion: 'signIn'
        });
    }
}