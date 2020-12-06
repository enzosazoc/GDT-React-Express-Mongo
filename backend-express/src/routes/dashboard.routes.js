import { Router } from 'express';
import * as dashboardCtrl from '../controllers/dashboard.controller';
import * as auth from '../middlewares/auth';

const router = Router();

// Rutas
router.get('/', auth.verificarToken, auth.esAdmin, dashboardCtrl.obtenerDatos);

export default router;