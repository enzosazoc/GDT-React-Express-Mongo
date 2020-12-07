import { useState } from 'react';
import proyectoService from '../../../services/proyecto.service';
import AgregarTarea from './AgregarTarea';
import EditarTarea from './EditarTarea';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Tareas(props) {

    const [tarea, setTarea] = useState({nombre: '', descripcion: ''});
    const [modal, setModal] = useState(false);

    const abrirModal = (tar) => {
        setTarea(tar);
        setModal(true);
    }

    const actualizarEstado = async (tareaSeleccionada) => {
        if (tareaSeleccionada.estado) {
            tareaSeleccionada.estado = false;
        } else {
            tareaSeleccionada.estado = true;
        }
        const tareasModificadas = props.proyecto.tareas.map(tar => tar._id === tareaSeleccionada._id ? tareaSeleccionada : tar);
        props.setProyecto({...props.proyecto, tareas: tareasModificadas});
        const pro = await proyectoService.actualizarProyecto(props.proyecto._id, props.proyecto);
        if (!pro || pro === 1 || pro === 9) {
            props.setErrorServidor('No se logró actualizar el estado de la tarea')
            return;
        }
    }

    const eliminarTarea = async (index) => {        
        let tareas = props.proyecto.tareas
        tareas.splice(index, 1);
        props.setProyecto({...props.proyecto, tareas: tareas});
        const res = await proyectoService.actualizarProyecto(props.proyecto._id, props.proyecto);
        if (!res || res === 1 || res === 9) {
            props.setErrorServidor('No se logró eliminar la tarea')
            return;
        }
    }

    const handleOnDragEnd = async (result) => {
        if(!result.destination) return;
        const pro = props.proyecto;
        const [itemActualizado] = pro.tareas.splice(result.source.index, 1);
        pro.tareas.splice(result.destination.index, 0, itemActualizado);
        props.setProyecto(pro);
        const res = await proyectoService.actualizarProyecto(pro._id, pro);
        if (!res || res === 1 || res === 9) {
            props.setErrorServidor('No se logró actualizar las tareas')
            return;
        };
    }

    return (
        <div className="col-12 p-0">
            <div className="col-12 d-flex flex-wrap align-content-start p-0">
                {/* Lista de Tareas */}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tareas">
                        { (provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="col-12 p-0">
                                
                                { props.proyecto.tareas.map((tarea, index) => {
                                    return (
                                        <Draggable key={tarea._id} draggableId={tarea._id} index={index}>
                                            { (provided) => (
                                                <div className="col-12 p-1" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="bg-white text-secondary d-flex flex-wrap align-items-center p-2 rounded shadow-sm">
                                                        <div className="col-12 d-flex align-items-center">
                                                            <div className="p-2">
                                                                {
                                                                    tarea.estado 
                                                                    ? 
                                                                    <h5 className="text-primary m-0"><i className="fas fa-check-square" onClick={() => actualizarEstado(tarea)} role="button"></i></h5> 
                                                                    : 
                                                                    <h5 className="text-secondary m-0"><i className="far fa-square" onClick={() => actualizarEstado(tarea)} role="button"></i></h5>
                                                                }
                                                            </div>
                                                            <div className="p-2 flex-fill overflow-hidden ">
                                                                <h6 className="m-0 text-truncate" title={tarea.nombre}>{tarea.nombre}</h6>
                                                            </div>
                                                            <div className="d-flex">
                                                                <div className="py-2 pl-2 pr-1">
                                                                    <button type="button" className="btn btn-outline-secondary btn-sm" data-toggle="collapse" href={"#collapseTarea"+index}>
                                                                        <i className="fas fa-list-ul"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="py-2 pl-1 pr-1">
                                                                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => abrirModal(tarea)}>
                                                                        <i className="fas fa-pen-alt"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="py-2 pl-1 pr-2">
                                                                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => eliminarTarea(index)}>
                                                                        <i className="fas fa-trash"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-12">
                                                            <div className="collapse" id={"collapseTarea"+index}>
                                                                <div className="p-2">
                                                                    <hr className="m-0 mb-2"></hr>
                                                                    <div className="d-flex- flex-wrap">
                                                                        <label className="text-secondary small m-0 font-weight-bold">Descripción</label>
                                                                        <div className="text-secondary small text-truncate" style={{maxHeight: "100px"}} title={tarea.descripcion}>{tarea.descripcion}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                }) }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {/* Agregar tarea */}
                <AgregarTarea proyecto={props.proyecto} setProyecto={props.setProyecto} setErrorServidor={props.setErrorServidor}/>
                
                {/* Modal Editar Tarea */}
                <EditarTarea proyecto={props.proyecto} setProyecto={props.setProyecto} tarea={tarea} modal={modal} setModal={setModal}/>
                
            </div>
        </div>
        
    )
}

export default Tareas;