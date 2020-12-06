import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import authService from '../../services/auth.service';
import usuarioService from '../../services/usuario.service';
import LoadingNav from '../Otros/LoadingNav';

function EliminarCuenta(props) {

    const [usuario, setUsuario] = useState({username: '', password: ''});
    const [esInvalido, setEsInvalido] = useState({username: false, password: false});
    const [errores, setErrores] = useState({username: '', password: ''});
    const [errorServidor, setErrorServidor] = useState(null);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const {name, value} = e.target;
        setUsuario({...usuario, [name]: value});
        setEsInvalido({...esInvalido, [name]: false});
    }

    const validar = () => {
        const errores = {};
        const esInvalido = {username: false, password: false}
        if (!usuario.username) errores.username = 'Ingrese un usuario';
        if (!usuario.password) errores.password = 'Ingrese una contraseña';
        if (errores.username) esInvalido.username = true;
        if (errores.password) esInvalido.password = true;
        setErrores(errores);
        setEsInvalido(esInvalido);
        if (Object.keys(errores).length) {
            return false;
        } else {
            return true;
        }
    }

    const eliminarCuenta = async () => {
        limpiarMensajes();
        if (!validar()) return;
        if (!validarUsuarioPrueba()) return;
        setLoading(true);
        const res = await usuarioService.eliminarCuenta(usuario);
        if (res === 0) {
            setModal(true);
        } else if (res === 1) {
            setErrorServidor('El usuario ingresado es incorrecto');
        } else if (res === 2) {
            setErrorServidor('La contraseña ingresada es inválida');
        } else {
            setErrorServidor('Lo sentimos, ocurrió un error al eliminar la cuenta');
        }
        setLoading(false);
    }

    const limpiarMensajes = () => {
        setErrorServidor(null);
    }

    const cerrarModal = () => {
        authService.cerrarSesion();
        props.props.history.push('/login');
    }

    const validarUsuarioPrueba = () => {
        const usuario = authService.obtenerUsuario();
        if (usuario.username === 'admin' || usuario.username === 'usuario') {
            setErrorServidor('No se pueden modificar los dos usuarios de prueba: "admin" y "usuario"');
            return false;
        } else {
            return true;
        }
    }

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div> 
                    <div className="bg-white shadow-sm rounded p-4">
                        <h5 className="text-secondary">Eliminar Cuenta</h5>
                        <hr className="mt-0 mb-4"/>
                        <div className="form-group">
                            <label className="text-secondary small mb-1">Usuario</label>
                            <Form.Control isInvalid={esInvalido.username} name="username" className="text-secondary" value={usuario.username} onChange={onChange} />
                            <Form.Control.Feedback type="invalid">{errores.username}</Form.Control.Feedback>
                        </div>
                        <div className="form-group">
                            <label className="text-secondary small mb-1">Contraseña</label>
                            <Form.Control type="password" isInvalid={esInvalido.password} name="password" className="text-secondary" value={usuario.password} onChange={onChange} />
                            <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
                        </div>
                        { errorServidor && <div className="alert alert-danger small" role="alert">{errorServidor}</div> }
                        <div className="text-right">
                            <button type="button" className="btn btn-danger btn-sm" onClick={eliminarCuenta}>Eliminar</button>
                        </div>
                    </div>
        
                    <Modal show={modal} backdrop="static" keyboard={false} animation={false} centered>
                        <Modal.Body className="text-center">
                            <div className="text-primary h5">Cuenta eliminada</div>
                            <div className="text-secondary">Su cuenta se eliminó correctamente.</div>
                        </Modal.Body>
                        <Modal.Footer className="p-1">
                            <button type="button" className="btn btn-primary btn-sm" onClick={cerrarModal}>Salir</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default EliminarCuenta;