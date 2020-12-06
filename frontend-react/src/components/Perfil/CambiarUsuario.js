import { useState } from 'react';
import { Form } from 'react-bootstrap';
import authService from '../../services/auth.service';
import usuarioService from '../../services/usuario.service';
import LoadingNav from '../Otros/LoadingNav';

function CambiarUsuario() {

    const [usuario, setUsuario] = useState({username: ''});
    const [esInvalido, setEsInvalido] = useState({username: false});
    const [errores, setErrores] = useState({username: ''});
    const [errorServidor, setErrorServidor] = useState(null);
    const [mensajeServidor, setMensajeServidor] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const {name, value} = e.target;
        setUsuario({...usuario, [name]: value});
        setEsInvalido({...esInvalido, [name]: false});
    }

    const validar = () => {
        const errores = {};
        const esInvalido = {username: false};
        if (/\s/g.test(usuario.username)) errores.username = 'El usuario no debe tener espacios en blanco';
        if (usuario.username.length < 5 ) errores.username = 'El usuario debe tener mínimo 5 caracteres';
        if (!usuario.username) errores.username = 'Ingrese un usuario';
        if (errores.username) esInvalido.username = true;
        setErrores(errores);
        setEsInvalido(esInvalido);
        if (Object.keys(errores).length) {
            return false;
        } else {
            return true;
        }
    }

    const cambiarUsername = async () => {
        limpiarMensajes();
        if (!validar()) return;
        if (!validarUsuarioPrueba()) return;
        setLoading(true);
        const res = await usuarioService.cambiarUsername(usuario);
        if (res === 0) {
            setMensajeServidor('El usuario se actualizó correctamente');
        } else {
            setErrorServidor('Lo sentimos, ocurrió un error al cambiar el usuario');
        }
        setLoading(false);
    }

    const limpiarMensajes = () => {
        setErrorServidor(null);
        setMensajeServidor(null);
    }

    const validarUsuarioPrueba = () => {
        const usuario = authService.obtenerUsuario();
        if (usuario.username === 'admin' || usuario.username === 'usuario') {
            setErrorServidor('No se pueden modificar los usuarios de prueba: "admin" y "usuario"');
            return false;
        } else {
            return true;
        }
    }

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div className="bg-white shadow-sm rounded p-4">
                    <h5 className="text-secondary">Cambiar usuario</h5>
                    <hr className="mt-0 mb-4"/>
                    <div className="form-group">
                        <label className="text-secondary small mb-1">Nuevo usuario</label>
                        <Form.Control isInvalid={esInvalido.username} name="username" className="text-secondary" value={usuario.username} onChange={onChange} />
                        <Form.Control.Feedback type="invalid">{errores.username}</Form.Control.Feedback>
                    </div>
                    { errorServidor && <div className="alert alert-danger small" role="alert">{errorServidor}</div> }
                    { mensajeServidor && <div className="alert alert-primary alert-dismissible fade show small" role="alert">{mensajeServidor}</div> }
                    <div className="text-right">
                        <button type="button" className="btn btn-primary btn-sm" onClick={cambiarUsername}>Guardar usuario</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CambiarUsuario;