import { useState, useEffect } from 'react';
import proyectoService from '../../../services/proyecto.service';
import AgregarTarea from './AgregarTarea';
import ItemTarea from './ItemTarea'
import Guardando from '../../Otros/Guardando'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Tareas(props) {

    const [tareas, setTareas] = useState(props.proyecto.tareas);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        setTareas(props.proyecto.tareas)
    }, [props.proyecto])

    const onChange = (i, e) => {
        let name = e.target.name
        let value = e.target.value
        let tareasModificadas = Object.assign([], tareas);
        tareasModificadas[i][name] = value;
        setTareas(tareasModificadas);
    }

    const actualizarTareas = async () => {
        setGuardando(true);
        let proyectoModificado = Object.assign({}, props.proyecto);
        proyectoModificado.tareas = tareas;
        const res = await proyectoService.actualizarProyecto(proyectoModificado._id, proyectoModificado);
        if (!res || res === 1 || res === 9) {
            props.setErrorServidor('No se logró actualizar la tarea');
        }
        setGuardando(false);
    }

    const actualizarEstado = async (tareaSeleccionada) => {
        if (tareaSeleccionada.estado) {
            tareaSeleccionada.estado = false;
        } else {
            tareaSeleccionada.estado = true;
        }
        const tareasModificadas = tareas.map(tar => tar._id === tareaSeleccionada._id ? tareaSeleccionada : tar);
        props.setProyecto({...props.proyecto, tareas: tareasModificadas});
        actualizarTareas();
    }

    const eliminarTarea = async (index) => { 
        setGuardando(true);       
        let tareas = props.proyecto.tareas
        tareas.splice(index, 1);
        props.setProyecto({...props.proyecto, tareas: tareas});
        const res = await proyectoService.actualizarProyecto(props.proyecto._id, props.proyecto);
        if (!res || res === 1 || res === 9) {
            props.setErrorServidor('No se logró eliminar la tarea')
            setGuardando(false);
            return;
        }
        setGuardando(false);
    }

    const handleOnDragEnd = async (result) => {
        if(!result.destination) return;
        if (result.source.index === result.destination.index) return;
        const pro = Object.assign({}, props.proyecto);
        const [itemActualizado] = pro.tareas.splice(result.source.index, 1);
        pro.tareas.splice(result.destination.index, 0, itemActualizado);
        props.setProyecto(pro);
        actualizarTareas();
    }

    return (
        <div className="col-12 p-0">
            <div className="col-12 d-flex flex-wrap align-content-start p-0">
                
                {/* Lista de Tareas */}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="tareas">
                        { (provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="col-12 p-0">
                                
                                { tareas.map((tar, index) => {
                                    return (
                                        <Draggable key={tar._id} draggableId={tar._id} index={index}>
                                            { (provided) => (
                                                <div className="col-12 p-1" ref={provided.innerRef} {...provided.draggableProps}>
                                                    <ItemTarea index={index} tar={tar} provided={provided} actualizarTareas={actualizarTareas} actualizarEstado={actualizarEstado} eliminarTarea={eliminarTarea} onChange={onChange}/>
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
                <AgregarTarea proyecto={props.proyecto} setProyecto={props.setProyecto} setErrorServidor={props.setErrorServidor} setGuardando={setGuardando}/>

                {/* Mensaje guardando */}
                <Guardando visible={guardando} />
                
            </div>
        </div>
    )
}

export default Tareas;