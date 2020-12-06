import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import proyectoService from '../../services/proyecto.service';
import Tareas from './Tareas/Tareas';
import EditarProyecto from './EditarProyecto';
import ModalConfirmacion from '../Otros/ModalConfirmacion';
import LoadingNav from '../Otros/LoadingNav';

function Proyecto(props) {
    const [proyecto, setProyecto] = useState({nombre: '', descripcion:'', tareas: []});
    const [avance, setAvance] = useState(0);
    const [modal, setModal] = useState(false);
    const [modalConfirmacion, setModalConfirmacion] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        obtenerProyecto();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        calcularAvance();
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proyecto])

    const abrirModal = () => {
        setModal(true);
    }

    const abrirModalConfirmación = () => {
        setModalConfirmacion(true);
    }

    const obtenerProyecto = async () => {
        const idProyecto = props.match.params.id;
        const pro = await proyectoService.obtenerProyecto(idProyecto);
        if (!pro || pro === 1 || pro === 9) return;
        setProyecto(pro);
    }

    const eliminarProyecto = async () => {
        const res = await proyectoService.eliminarProyecto(proyecto._id);
        if (res === 1 || res === 9) return;
        if (res === 0) props.history.push('/proyectos');
    }

    const calcularAvance = () => {
        const cantTareas = proyecto.tareas.length;
        let tareasRealizadas = 0;
        proyecto.tareas.forEach(tar => { 
            if (tar.estado) tareasRealizadas += 1;
        });
        const avance = Math.round((100 / cantTareas) * tareasRealizadas);
        cantTareas === 0 ? setAvance(0) : setAvance(avance)
    }

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (            
                <div className="d-flex flex-wrap pt-4">
                    <div className="col-12 col-md-4 col-lg-3 p-1 mb-4">
                        <div className="card text-secondary border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="m-0">Proyecto</h5>
                                <hr className="mt-2"/>
                                <div className="form-group">
                                    <label className="text-secondary small m-0 font-weight-bold">Nombre</label>
                                    <div className="text-secondary small overflow-auto" style={{maxHeight: "60px"}}>{proyecto.nombre}</div>
                                </div>
                                <div className="form-group">
                                    <label className="text-secondary small m-0 font-weight-bold">Descripción</label>
                                    <div className="text-secondary small overflow-auto" style={{maxHeight: "100px"}}>{proyecto.descripcion}</div>
                                </div>
                                <div className="form-group">
                                    <label className="text-secondary small"><b>Avance:</b> {avance + "%"}</label>
                                    <div className="progress">
                                        <div className="progress-bar bg-primary" role="progressbar" style={{width: avance+"%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                                
                                <br/>
                                <h5 className="m-0 p-0">Opciones</h5>
                                <hr className="mt-2"/>
                                <div className="p-1">
                                    <button type="button" className="btn btn-outline-primary btn-sm btn-block" onClick={abrirModal}>
                                        Editar Proyecto
                                    </button>
                                </div>
                                <div className="p-1">
                                    <Link className="btn btn-outline-secondary btn-sm btn-block" to="/proyectos">
                                        Ver mis proyectos
                                    </Link>
                                </div>
                                <div className="p-1">
                                    <button type="button" className="btn btn-outline-danger btn-sm btn-block" onClick={abrirModalConfirmación}>
                                        Eliminar Proyecto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de tareas */}
                    <Tareas proyecto={proyecto} setProyecto={setProyecto}/>

                    {/* Modal Editar proyecto */}
                    <EditarProyecto proyecto={proyecto} setProyecto={setProyecto} modal={modal} setModal={setModal} />

                    {/* Modal confirmación */}
                    <ModalConfirmacion modal={modalConfirmacion} setModal={setModalConfirmacion} mensaje={'Confirme para eliminar el proyecto con nombre:'} nombre={proyecto.nombre} ejecutar={eliminarProyecto}/>

                </div>
            )}
        </div>
    )
}

export default Proyecto;