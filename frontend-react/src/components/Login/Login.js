import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Alert } from 'react-bootstrap'
import authService from '../../services/auth.service';
import LoadingNav from '../Otros/LoadingNav';

function Login(props) {
    
    const [usuario, setUsuario] = useState({username: '', password: ''});
    const [esInvalido, setEsInvalido] = useState({username: false, password: false});
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
        if (!usuario.username) errores.username = 'Ingrese un usuario';
        if (usuario.username.length > 15) errores.username = 'El usuario debe tener máximo 15 caracteres';
        if (!usuario.password) errores.password = 'Ingrese una contraseña';
        if (usuario.password.length > 25) errores.password = 'La contraseña debe tener máximo 25 caracteres';
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

    const iniciarSesion = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorServidor(null);
        if (!validar()) {
            setLoading(false);
            return;
        }
        const res = await authService.iniciarSesion(usuario.username, usuario.password);
        if (res === 0) {
            props.actualizarEstado();
            props.history.push("/");
        } else if (res === 1 || res === 2) {
            setErrorServidor('El usuario o la contraseña, no es válido');
            setLoading(false);
        } else {
            setErrorServidor('Lo sentimos, ocurrió un error al iniciar sesión');
            setLoading(false);
        }
    }
    
    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div className="col-12 p-0">
                    <br/>
                    <div className="col-12 col-lg-8 col-xl-7 d-flex flex-wrap mx-auto">
                        <div className="col-12 p-2">
                            <h4 className="text-secondary"><i className="fas fa-sign-in-alt"></i> Login</h4>
                            <hr></hr>
                        </div>
                        <div className="col-12 col-md-5 col-lg-5 p-3">
                            <div className="p-2">
                                <h6 className="text-secondary"><i className="fas fa-users"></i> Usuarios de prueba</h6>
                            </div>
                            <div>
                                <div className="text-secondary p-2">
                                    <div className="">Rol Administrador</div>
                                    <table className="small">
                                        <tbody>
                                            <tr>
                                                <td><b>Username:</b></td><td className="text-primary"> admin</td>
                                            </tr>
                                            <tr>
                                                <td><b>Password:</b></td><td className="text-primary"> password</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr/>
                                </div>
                                <div className="text-secondary p-2">
                                    <div>Rol Usuario</div>
                                    <table className="small">
                                        <tbody>
                                            <tr>
                                                <td><b>Username:</b></td><td className="text-primary"> usuario</td>
                                            </tr>
                                            <tr>
                                                <td><b>Password:</b></td><td className="text-primary"> password</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr/>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-7 col-lg-7 p-2">
                            <form className="col-12 p-3 bg-white rounded shadow-sm " onSubmit={iniciarSesion}>
                                <div>
                                    <h6 className="text-secondary"><i className="fas fa-align-left"></i> Formulario</h6>
                                    <br/>
                                </div>
                                <Form.Group>
                                    <Form.Label className="text-secondary small m-0"><i className="fas fa-user"></i> Usuario</Form.Label>
                                    <Form.Control isInvalid={esInvalido.username} className="text-secondary" name="username" value={usuario.username} onChange={onChange}/>
                                    <Form.Control.Feedback type="invalid">{errores.username}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="text-secondary small m-0"><i className="fas fa-key"></i> Contraseña</Form.Label>
                                    <Form.Control type="password" isInvalid={esInvalido.password} className="text-secondary"  name="password" value={usuario.password} onChange={onChange}/>
                                    <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
                                </Form.Group>
                                <div className="text-muted small">No estoy registrado, <Link to="/registro">crear cuenta</Link></div>
                                <br/>
                                { errorServidor && <Alert variant="danger" className="small">{errorServidor}</Alert> }
                                <div className="col-12 p-0 text-right">
                                    <button type="submit" className="btn btn-primary btn-sm">Iniciar sesión</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            ) }
        </div>
    )
}

export default Login;