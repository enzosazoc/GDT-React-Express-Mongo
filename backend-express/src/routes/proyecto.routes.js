import { Router } from 'express';
import * as proyectoCtrl from '../controllers/proyecto.controller';
import * as auth from '../middlewares/auth';

const router = Router();

// Rutas
router.get('/', auth.verificarToken, proyectoCtrl.obtenerProyectos);
router.get('/:id', auth.verificarToken, proyectoCtrl.obtenerProyectoPorID);
router.post('/', auth.verificarToken, proyectoCtrl.crearProyecto);
router.put('/:id', auth.verificarToken, proyectoCtrl.actualizarProyecto);
router.delete('/:id', auth.verificarToken, proyectoCtrl.eliminarProyecto);

export default router;