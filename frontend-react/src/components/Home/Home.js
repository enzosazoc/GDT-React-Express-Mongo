import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoadingNav from '../Otros/LoadingNav';
import Item1 from './Item1';
import Item2 from './Item2';

function Home(props) {
    
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        props.actualizarEstado();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div>
                    <br/>

                    <div className=" text-secondary p-4 pt-4 pb-5">
                        <h1 className="display-4">Gestor de tareas</h1>
                        <p className="lead">Aplicación básica, realizada con el objetivo de aprender y practicar algunas tecnologías de programación web.</p>
                        <hr/>
                        { !props.state.logueado && (
                            <div className="d-flex flex-wrap">
                                <div className="col-12 col-xl-6 p-2">
                                    <Link className="text-decoration-none" to="/login">
                                        <Item1 logo="fas fa-play" titulo="Comenzar" descripcion="Iniciar sesión para crear proyectos y tareas." />
                                    </Link>
                                </div>
                                <div className="col-12 col-xl-6 p-2">
                                    <a className="text-decoration-none" href="https://github.com/enzosazoc/GDT-React-Express-Mongo" target="_blank" rel="noopener noreferrer">
                                        <Item1 logo="fab fa-github" titulo="Github" descripcion="Ingresa al repositorio, para ver el código de la aplicación." />
                                    </a>
                                </div>                                
                            </div>
                        )}

                        { props.state.logueado && (
                            <div className="col-12 p-0 d-flex flex-wrap justify-content-center">
                                <div className="col-12 col-md-4 p-2">
                                    <Item2 to="/proyectos" logo="fas fa-folder" titulo="Mis proyectos" descripcion="Crear proyectos para guardar tareas"/>
                                </div>
                                <div className="col-12 col-md-4 p-2">
                                    <Item2 to="/perfil" logo="fas fa-user-edit" titulo="Perfil de usuario" descripcion="Editar datos de la cuenta"/>
                                </div>
                                { props.state.esAdmin && (
                                    <div className="col-12 col-md-4 p-2">
                                        <Item2 to="/admin" logo="fas fa-chart-bar" titulo="Administardor" descripcion="Ver información del la app"/>
                                    </div>
                                ) }
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home