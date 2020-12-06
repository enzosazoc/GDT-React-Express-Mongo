import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller';
import * as validaciones from '../middlewares/validaciones';

const router = Router();

router.post('/signup', validaciones.validarUsuarioDuplicado, validaciones.validarRoles, authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;