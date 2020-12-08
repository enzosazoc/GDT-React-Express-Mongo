import { useState, useEffect } from 'react';
import proyectoService from '../../services/proyecto.service';
import CrearProyecto from './CrearProyecto';
import LoadingNav from '../Otros/LoadingNav';

function Proyectos(props) {

    const [proyectos, setProyectos] = useState([]);
    const [proyectosFiltrados, setProyectosFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [modal, setModal] = useState(false);
    const [errorServidor, setErrorServidor] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerProyectos();
    }, []);
    
    useEffect(() => {
        filtrar();
    }, [busqueda]);

    const onChange = (e) => {
        const { value } = e.target;
        setBusqueda(value);
    }

    const abrirModal = () => {
        setModal(true);
    }

    const obtenerProyectos = async () => {
        const proyectos = await proyectoService.obtenerProyectosPorUsuario();
        if (!proyectos || proyectos === 1 || proyectos === 9) {
            setErrorServidor(true)
            setLoading(false);
            return;
        }
        setProyectos(proyectos);
        setProyectosFiltrados(proyectos);
        setLoading(false);
    }

    const filtrar = () => {
        const proFiltrados = proyectos.filter(pro => {
            return pro.nombre.toLowerCase().includes(busqueda.toLowerCase());
        });
        setProyectosFiltrados(proFiltrados);
    }

    const abrirProyecto = async (id) => {
        props.history.push(`/proyectos/${id}`);
    }

    const obtenerFecha = (fecha) => {
        const fechaDate = new Date(fecha);
        const fechaStr = fechaDate.getDate() + "-" + fechaDate.getMonth() + "-" + fechaDate.getFullYear();
        return fechaStr;
    }

    const recargar = () => {
        setLoading(true);
        setErrorServidor(null);
        obtenerProyectos();
    }

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div>
                    <br/>
                    <h2 className="text-secondary">Mis proyectos</h2>

                    <hr></hr>

                    {/* Opciones */}
                    <div className="p-1 d-flex flex-wrap justify-content-between">
                        <div className="col-12 col-sm-auto p-0">
                            <button type="button" className="col col-sm-auto btn btn-primary btn-sm shadow-sm" onClick={abrirModal}>
                                <i className="fas fa-folder-plus"></i> Crear Proyecto
                            </button>
                        </div>
                        <div className="col-12 col-sm-auto p-0 d-flex mt-3 mt-sm-0">
                            <input className="form-control form-control-sm" placeholder="Buscar" onChange={onChange}/>
                        </div>
                    </div>

                    <hr></hr>

                    {/* Lista de proyectos */}
                    <div className="d-flex flex-wrap">
                        { proyectos.length > 0 ? 
                            proyectosFiltrados.map( (pro, index) => {
                                return <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-3 p-1">
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-body text-secondary">
                                            <h5 className="card-title text-truncate mb-2" title={pro.nombre}>{pro.nombre}</h5>
                                            <div className="text-truncate small" title={"Número de tareas creadas: " + pro.tareas.length}>
                                                <i className="fas fa-tasks" style={{width:"15px"}}></i> Tareas: <div className="d-inline-block text-primary">{pro.tareas.length}</div>
                                            </div>
                                            <div className="text-truncate small" title={"Fecha de creación: " + obtenerFecha(pro.createdAt)}>
                                                <i className="far fa-calendar-plus" style={{width:"15px"}}></i> Creado el: <div className="d-inline-block text-primary">{obtenerFecha(pro.createdAt)}</div>
                                            </div>
                                            <div className="mt-3">
                                                <button className="btn btn-primary btn-sm btn-block" onClick={() => abrirProyecto(pro._id)}>Abrir Proyecto</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })
                            :
                            ( errorServidor ?
                                <div className="col-12 mt-5 text-center">
                                    <div className="text-danger h4"><i className="far fa-dizzy"></i> Problemas de conexión con la base de datos. No se logró obtener los proyectos.</div>
                                    <div className="mt-4">
                                        <button className="btn btn-primary btn-lg" onClick={recargar}>Recargar</button>
                                    </div>
                                </div>
                                : 
                                <div className="col-12 mt-5 text-center">
                                    <div className="h4" style={{color: "#b0bec5"}}><i className="far fa-folder-open"></i> Sin proyectos</div>
                                </div> 
                            )
                        }
                        
                    </div>

                    {/* Modal: crear proyecto */}
                    <CrearProyecto modal={modal} setModal={setModal} obtenerProyectos={obtenerProyectos} history={props.history} />
                </div>
            )}
        </div>
    );
}

export default Proyectos;