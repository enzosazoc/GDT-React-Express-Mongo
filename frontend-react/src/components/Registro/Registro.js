import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Form, Alert } from 'react-bootstrap';
import authService from '../../services/auth.service';
import LoadingNav from '../Otros/LoadingNav';

function Registro(props){

    const [usuario, setUsuario] = useState({username: '', password: '', passwordConfirmacion: ''});
    const [esInvalido, setEsInvalido] = useState({username: false, password: false, passwordConfirmacion: false});
    const [errores, setErrores] = useState({});
    const [errorServidor, setErrorServidor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.actualizarEstado();
        const logueado = authService.obtenerUsuario();
        if (logueado) {
            props.history.push("/");
        } else {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onChange = (e) => {
        const {name, value} = e.target;
        setUsuario({...usuario, [name]: value});
        setEsInvalido({...esInvalido, [name]: false});
    }

    const validar = () => {
        const errores = {};
        const esInvalido = {username: false, password: false}
        // Validaciones username
        if (/\s/g.test(usuario.username)) errores.username = 'El usuario no debe tener espacios en blanco';
        if (usuario.username.length < 5 ) errores.username = 'El usuario debe tener mínimo 5 caracteres';
        if (usuario.username.length > 15 ) errores.username = 'El usuario debe tener máximo 15 caracteres';
        if (!usuario.username) errores.username = 'Ingrese un usuario';
        // Validaciones password
        if (/\s/g.test(usuario.password)) errores.password = 'La contraseña no debe tener espacios en blanco';
        if (usuario.password.length < 5 ) errores.password = 'La contraseña debe tener mínimo 5 caracteres';
        if (usuario.password.length > 25 ) errores.password = 'La contraseña debe tener máximo 25 caracteres';
        if (!usuario.password) errores.password = 'Ingrese una contraseña';
        // Validaciones password de confirmación
        if (!usuario.passwordConfirmacion) errores.passwordConfirmacion = 'Ingrese una contraseña';
        if (usuario.password !== usuario.passwordConfirmacion) errores.passwordConfirmacion = 'La contraseñas no son iguales';

        if (errores.username) esInvalido.username = true;
        if (errores.password) esInvalido.password = true;
        if (errores.passwordConfirmacion) esInvalido.passwordConfirmacion = true;

        setErrores(errores);
        setEsInvalido(esInvalido);

        if (Object.keys(errores).length) {
            return false;
        } else {
            return true;
        }
    }

    const RegistrarUsuario = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (!validar()) {
            setLoading(false);
            return;
        }
        const res = await authService.registrarUsuario(usuario.username, usuario.password);
        if (res === 0) {
            setErrorServidor(null);
            props.actualizarEstado();
            props.history.push("/");
        } if (res === 1) {
            setErrorServidor('El usuario ya existe');
        } else {
            setErrorServidor('Lo sentimos, ocurrió un error durante el registro');
        }
        setLoading(false);
    }
    
    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div className="col-12">
                    <br/>
                    <form className="col-12 col-md-6 col-lg-4 bg-white p-3 m-auto rounded shadow-sm" onSubmit={RegistrarUsuario}>
                        <div>
                            <h5 className="text-secondary"><i className="fas fa-user-plus"></i> Registro</h5>
                            <hr></hr>
                        </div>
                        <Form.Group>
                            <Form.Label className="text-secondary small m-0"><i className="fas fa-user"></i> Usuario</Form.Label>
                            <Form.Control isInvalid={esInvalido.username} className="text-secondary" name="username" value={usuario.username} onChange={onChange}/>
                            <Form.Control.Feedback type="invalid">{errores.username}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="text-secondary small m-0"><i className="fas fa-key"></i> Contraseña</Form.Label>
                            <Form.Control type="password" isInvalid={esInvalido.password} className="text-secondary" name="password" value={usuario.password} onChange={onChange}/>
                            <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="text-secondary small m-0"><i className="fas fa-key"></i> Confirmar contraseña</Form.Label>
                            <Form.Control type="password" isInvalid={esInvalido.passwordConfirmacion} className="text-secondary" name="passwordConfirmacion" value={usuario.passwordConfirmacion} onChange={onChange}/>
                            <Form.Control.Feedback type="invalid">{errores.passwordConfirmacion}</Form.Control.Feedback>
                        </Form.Group>
                        <div className="text-muted small">Ya tengo una cuenta, <Link to="/login">iniciar sesión</Link></div>
                        <br/>
                        { errorServidor && <Alert variant="danger" className="small">{errorServidor}</Alert> }
                        <div className="col-12 p-0 text-right">
                            <button type="submit" className="btn btn-primary btn-sm">Crear cuenta</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Registro;