import { ROLES } from '../models/Rol';
import Usuario from '../models/Usuario';

export const validarUsuarioDuplicado = async (req, res, next) => {
    const usuario = await Usuario.findOne({username: req.body.username});
    if (usuario) return res.status(409).json({mensaje: 'El usuario ya existe'})
    next()
}

export const validarRoles = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                 return res.status(400).json({
                     mensaje: `El rol ${req.body.roles[i]} no es válido`
                 });
            }
        }
    }
    next();
}