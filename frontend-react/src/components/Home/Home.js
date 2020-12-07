import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingNav from '../Otros/LoadingNav';

function Home(props) {
    
    const estiloNormal = {bg: 'bg-white', logo: 'text-primary', texto: 'text-secondary'};
    const estiloHover = {bg: 'bg-primary', logo: 'text-white', texto: 'text-white'};
    const transition = {transition: '0.2s'};
    const [estilo, setEstilo] = useState([estiloNormal, estiloNormal, estiloNormal]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.actualizarEstado();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onMouseEnter = (index) => {
        const est = [estiloNormal, estiloNormal, estiloNormal];
        est[index] = estiloHover;
        setEstilo(est);
    }

    const onMouseLeave = () => {
        const est = [estiloNormal, estiloNormal, estiloNormal];
        setEstilo(est);
    }

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div>
                    <br/>

                    { !props.state.logueado && (
                        <div className="jumbotron bg-dark text-white shadow-sm">
                            <h1 className="display-4">Gestor de tareas</h1>
                            <p className="lead">Aplicación básica, realizada con el fin de aprender y practicar algunas tecnologías de programación web.</p>
                            <hr className="my-4"/>
                            <p>Iniciar sesión para crear proyectos y tareas.</p>
                            <Link className="btn btn-primary btn-lg" to="/login">Iniciar sesión</Link>
                        </div>
                    ) }

                    { props.state.logueado && (
                        <div className="col-12 p-0 d-flex flex-wrap justify-content-center">
                            <div className="col-12 col-md-4 p-1">
                                <Link className="text-decoration-none" to="/proyectos">
                                    <div className={"p-4 py-5 text-center rounded shadow-sm " + estilo[0].bg} style={transition} role="button" onMouseEnter={() => onMouseEnter(0)} onMouseLeave={onMouseLeave}>
                                        <div><i className={"fas fa-folder h1 " + estilo[0].logo}></i></div>
                                        <h4 className={estilo[0].texto} title="Mis proyectos">Mis proyectos</h4>
                                        <div className={"small text-truncate " + estilo[0].texto} title="Crear proyectos para guardar tareas">Crear proyectos para guardar tareas</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-12 col-md-4 p-1">
                                <Link className="text-decoration-none" to="/perfil">
                                    <div className={"p-4 py-5 text-center rounded shadow-sm " + estilo[1].bg} style={transition} role="button" onMouseEnter={() => onMouseEnter(1)} onMouseLeave={onMouseLeave}>
                                        <div><i className={"fas fa-user-edit h1 " + estilo[1].logo}></i></div>
                                        <h4 className={estilo[1].texto} title="Perfil de usuario">Perfil de usuario</h4>
                                        <div className={"small text-truncate " + estilo[1].texto} title="Editar datos de la cuenta">Editar o eliminar cuenta</div>
                                    </div>
                                </Link>
                            </div>
                            { props.state.esAdmin && (
                                <div className="col-12 col-md-4 p-1">
                                    <Link className="text-decoration-none" to="/admin">
                                        <div className={"p-4 py-5 text-center rounded shadow-sm " + estilo[2].bg} style={transition} role="button" onMouseEnter={() => onMouseEnter(2)} onMouseLeave={onMouseLeave}>
                                            <div><i className={"fas fa-chart-bar h1 " + estilo[2].logo}></i></div>
                                            <h4 className={estilo[2].texto} title="Administardor">Administardor</h4>
                                            <div className={"small text-truncate " + estilo[2].texto} title="Gestionar usuarios">Ver información del la app</div>
                                        </div>
                                    </Link>
                                </div>
                            ) }
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Home