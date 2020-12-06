import express from 'express';
import cors from 'cors';
import pkg from '../package.json';
import { poblarTablas } from './libs/poblarBD';

import authRoutes from './routes/auth.routes';
import proyectoRoutes from './routes/proyecto.routes'
import usuarioRoutes from './routes/usuario.routes';
import dashboardRoutes from './routes/dashboard.routes';

const app = express();
poblarTablas();

// App set
app.set('pkg', pkg);
app.set('port', process.env.PORT || 4000);

// App use
app.use(express.json());
app.use(cors())

// App ruta raíz
app.get('/', (req, res) => {
    res.json({
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        author: pkg.author
    })
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/dashboard', dashboardRoutes);

export default app;
