import { Router } from 'express';
import * as usuarioCtrl from '../controllers/usuario.controller';
import * as proyectoCtrl from '../controllers/proyecto.controller';
import * as auth from '../middlewares/auth';
import * as validaciones from '../middlewares/validaciones';

const router = Router();

// Rutas
router.get('/', auth.verificarToken, auth.esAdmin, usuarioCtrl.obtenerUsuarios);
router.get('/:id', auth.verificarToken, auth.esAdmin, usuarioCtrl.obtenerUsuarioPorId);
router.get('/:id/proyectos', auth.verificarToken, proyectoCtrl.obtenerProyectosPorUsuario);
router.post('/', auth.verificarToken, auth.esAdmin, validaciones.validarUsuarioDuplicado, validaciones.validarRoles, usuarioCtrl.crearUsuario);
router.put('/:id', auth.verificarToken, auth.esAdmin, validaciones.validarUsuarioDuplicado, validaciones.validarRoles, usuarioCtrl.actualizarUsuario);
router.delete('/:id', auth.verificarToken, auth.esAdmin, usuarioCtrl.eliminarUsuario);
router.post('/cambiar-username', auth.verificarToken, usuarioCtrl.cambiarUsername);
router.post('/cambiar-password', auth.verificarToken, usuarioCtrl.cambiarPassword);
router.post('/eliminar-cuenta', auth.verificarToken, usuarioCtrl.eliminarCuenta);

export default router;