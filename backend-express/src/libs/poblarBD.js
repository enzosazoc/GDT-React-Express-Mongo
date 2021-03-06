import Rol from '../models/Rol';/*  */
import Usuario from '../models/Usuario';/*  */
import Proyecto from '../models/Proyecto'

const crearRoles = async () => {
    try {
        const count = await Rol.estimatedDocumentCount();
        if (count > 0) return;
        await Promise.all([
            new Rol({_id: '5fc93b688c76b1341cc1ddd6', nombre: 'ROLE_USUARIO',}).save(),
            new Rol({_id: '5fc93b688c76b1341cc1ddd7', nombre: 'ROLE_ADMIN',}).save()
        ])
        console.log('Roles ingresados a la BD')
    } catch (error) {
        console.error(error);
    }
}

const crearUsuarios = async () => {
    try {
        const count = await Usuario.estimatedDocumentCount();
        if (count > 0) return;
        await Promise.all([
            new Usuario({
                _id: "5fb96de54ecd1532e8d88ab9", 
                username: 'admin', 
                password: '$2a$10$TnKVPZ38428a53LRF1hBXOmEN6qesBu9KF.QQGZIZxkdPQ4l7auEa',
                roles: [
                    {
                        _id: "5fc93b688c76b1341cc1ddd6"
                    },
                    {
                        _id: "5fc93b688c76b1341cc1ddd7"
                    }
                ]
            }).save(),
            new Usuario({
                _id: "5fb97c1c08b5731228f99b5e", 
                username: 'usuario', 
                password: '$2a$10$Ha8yGL/t/kOoUqRl8Ehv/ea3nQ8VWW4/pdRk8evvKcq3f2g7lnf7a',
                roles: [
                    {
                        _id: "5fc93b688c76b1341cc1ddd6"
                    }
                ]
            }).save()
        ])
        console.log('Usuarios ingresados a la BD')
    } catch (error) {
        console.error(error);
    }
}

const crearProyectos = async () => {
    try {
        const count = await Proyecto.estimatedDocumentCount();
        if (count > 0) return;
        await Promise.all([
            new Proyecto({
                nombre: 'Proyecto 1', 
                descripcion: 'Prueba descripción proyecto 1', 
                tareas: [
                    {
                        nombre: 'Prueba tarea 1', 
                    },
                    {
                        nombre: 'Prueba tarea 2', 
                    },
                    {
                        nombre: 'Prueba tarea 3', 
                    },
                    {
                        nombre: 'Prueba tarea 4', 
                    }
                ],
                usuario: {
                    _id: "5fb96de54ecd1532e8d88ab9"
                }
            }).save(),
            new Proyecto({
                nombre: 'Proyecto 2', 
                descripcion: 'Prueba descripción proyecto 2',
                usuario: {
                    _id: "5fb96de54ecd1532e8d88ab9"
                }
            }).save(),
            new Proyecto({
                nombre: 'Proyecto 1', 
                descripcion: 'Proyecto de prueba - usuario',
                tareas: [
                    {
                        nombre: 'Prueba tarea 1', 
                    },
                    {
                        nombre: 'Prueba tarea 2', 
                    },
                    {
                        nombre: 'Prueba tarea 3', 
                    },
                    {
                        nombre: 'Prueba tarea 4', 
                    }
                ],
                usuario: {
                    _id: "5fb97c1c08b5731228f99b5e"
                }
            }).save(),
        ])
        console.log('Proyectos ingresados a la BD')
    } catch (error) {
        console.log(error)
    }
}

export const poblarTablas = () => {
    crearRoles();
    crearUsuarios();
    crearProyectos();
}