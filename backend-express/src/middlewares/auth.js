import jwt from 'jsonwebtoken';
import config from '../config';
import Rol from '../models/Rol';

import Usuario from '../models/Usuario';

export const verificarToken = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) return res.status(403).json({mensaje: 'No se proporcionó un token'});
        const decoded = jwt.verify(token, config.SECRET);
        req.idUsuario = decoded.id;
        const usuario = await Usuario.findById(req.idUsuario, {password: 0});
        if (!usuario) return res.status(404).json({mensaje: 'Usuario no encontrado'});
        next();
    } catch (error) {
        return res.status(500).json({mensaje: 'Error del servidor'});
    }
}

export const esAdmin = async (req, res, next) => {
    try {
        const usuario = await Usuario.findById(req.idUsuario);
        const roles = await Rol.find({_id: {$in: usuario.roles}});
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].nombre === 'ROLE_ADMIN') {
                next();
                return;
            }
        }
        return res.status(403).json({mensaje: 'Se requiere el rol: admin'})
    } catch (error) {
        return res.status(500).json({mensaje: 'Error del servidor'});
    }
}