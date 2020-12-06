import { useState } from 'react';
import { Form } from 'react-bootstrap';
import authService from '../../services/auth.service';
import usuarioService from '../../services/usuario.service';
import LoadingNav from '../Otros/LoadingNav';

function CambiarPassword() {
    
    const [usuario, setUsuario] = useState({passwordActual: '', passwordNueva: '', passwordNuevaConfirmacion: ''});
    const [esInvalido, setEsInvalido] = useState({passwordActual: '', passwordNueva: false, passwordNuevaConfirmacion: false});
    const [errores, setErrores] = useState({passwordActual: '', passwordNueva: '', passwordNuevaConfirmacion: ''});
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
        const esInvalido = {passwordNueva: false, passwordNuevaConfirmacion: false};
        // Validaciones password
        if (!usuario.passwordActual) errores.passwordActual = 'Ingrese una contraseña';
        // Validaciones password nueva
        if (/\s/g.test(usuario.passwordNueva)) errores.passwordNueva = 'La contraseña no debe tener espacios en blanco';
        if (usuario.passwordNueva.length < 5 ) errores.passwordNueva = 'La contraseña debe tener mínimo 5 caracteres';
        if (!usuario.passwordNueva) errores.passwordNueva = 'Ingrese una contraseña';
        // Validaciones password nueva confirmación
        if (!usuario.passwordNuevaConfirmacion) errores.passwordNuevaConfirmacion = 'Ingrese una contraseña';
        if (usuario.passwordNueva !== usuario.passwordNuevaConfirmacion) errores.passwordNuevaConfirmacion = 'La contraseñas no son iguales';

        if (errores.passwordActual) esInvalido.passwordActual = true;
        if (errores.passwordNueva) esInvalido.passwordNueva = true;
        if (errores.passwordNuevaConfirmacion) esInvalido.passwordNuevaConfirmacion = true;
        setErrores(errores);
        setEsInvalido(esInvalido);
        if (Object.keys(errores).length) {
            return false;
        } else {
            return true;
        }
    }

    const cambiarPassword = async () => {
        limpiarMensajes();
        if (!validar()) return;
        if (!validarUsuarioPrueba()) return;
        setLoading(true);
        const res = await usuarioService.cambiarPassword(usuario);
        if (res === 0) {
            setMensajeServidor('La contraseña se actualizó correctamente');
        } else if (res === 1) {
            setErrorServidor('Contraseña actual incorrecta');
        } else if (res === 2) {
            setErrorServidor('La contraseña nueva y la confirmación, no son iguales');
        } else {
            setErrorServidor('Lo sentimos, ocurrió un error al cambiar la contraseña');
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
                    <h5 className="text-secondary">Cambiar contraseña</h5>
                    <hr className="mt-0 mb-4"/>
                    <div className="form-group">
                        <label className="text-secondary small mb-1">Contraseña Actual</label>
                        <Form.Control type="password" isInvalid={esInvalido.passwordActual} name="passwordActual" className="text-secondary" value={usuario.passwordActual} onChange={onChange} />
                        <Form.Control.Feedback type="invalid">{errores.passwordActual}</Form.Control.Feedback>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary small mb-1">Nueva contraseña</label>
                        <Form.Control type="password" isInvalid={esInvalido.passwordNueva} name="passwordNueva" className="text-secondary" value={usuario.passwordNueva} onChange={onChange} />
                        <Form.Control.Feedback type="invalid">{errores.passwordNueva}</Form.Control.Feedback>
                    </div>
                    <div className="form-group">
                        <label className="text-secondary small mb-1">Confirmar nueva contraseña</label>
                        <Form.Control type="password" isInvalid={esInvalido.passwordNuevaConfirmacion} name="passwordNuevaConfirmacion" className="text-secondary" value={usuario.passwordNuevaConfirmacion} onChange={onChange} />
                        <Form.Control.Feedback type="invalid">{errores.passwordNuevaConfirmacion}</Form.Control.Feedback>
                    </div>
                    { errorServidor && <div className="alert alert-danger small" role="alert">{errorServidor}</div> }
                    { mensajeServidor && <div className="alert alert-primary alert-dismissible fade show small" role="alert">{mensajeServidor}</div> }
                    <div className="text-right">
                        <button type="button" className="btn btn-primary btn-sm" onClick={cambiarPassword}>Cambiar contraseña</button>
                    </div>
                </div>
            )}
        </div>
        
    )
}

export default CambiarPassword;