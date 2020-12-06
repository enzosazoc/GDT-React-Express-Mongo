import { useState } from 'react';
import proyectoService from '../../../services/proyecto.service';
import { Form } from 'react-bootstrap'

function AgregarTarea(props) {

    const [tarea, setTarea] = useState({nombre: ''});
    const [errores, setErrores] = useState({});
    const [esInvalido, setEsInvalido] = useState({nombre: false});
    const [visible, setVisible] = useState({nuevaTarea: 'd-none', btnAgregar: 'd-flex'});

    const onChange = (e) => {
        const { name, value } = e.target;
        setTarea({...tarea, [name]: value});
        setEsInvalido({...esInvalido, [name]: false});
    }

    const validar = () => {
        const errores = {};
        if (!tarea.nombre) errores.nombre = 'Ingrese el nombre de la tarea';
        setErrores(errores);
        if (Object.keys(errores).length) {
            setEsInvalido({nombre: true});
            return false;
        } else {
            setEsInvalido({nombre: false});
            return true;
        }
    }

    const crearTarea = async () => {
        if (!validar()) return;
        ocultar();
        let tareasModificadas = props.proyecto.tareas;
        tareasModificadas.push(tarea);
        props.setProyecto({...props.proyecto, tareas: tareasModificadas });
        const pro = await proyectoService.actualizarProyecto(props.proyecto._id, props.proyecto);
        props.setProyecto(pro);
    }

    const mostrar = () => {
        setVisible({nuevaTarea: 'd-flex', btnAgregar: 'd-none'});
        setEsInvalido({nombre: false});
    }

    const ocultar = () => {
        setTarea({nombre: '', descripcion: ''});
        setVisible({nuevaTarea: 'd-none', btnAgregar: 'd-flex'});
    }

    return ( <div className="col-12 p-0">
        <div className={"col-12 p-1 " + visible.nuevaTarea}>
            <div className="col-12 bg-white text-secondary d-flex align-items-start p-2 rounded shadow-sm">
                <div className="p-2 flex-fill">
                    <Form.Control name="nombre" size="sm" isInvalid={esInvalido.nombre} value={tarea.nombre} placeholder="Nombre de la tarea" onChange={onChange} />
                    <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                </div>
                <div className="py-2 pl-1 pr-2 ">
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={ocultar}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
        <div>
            <div className={"p-1 " + visible.btnAgregar}>
                <button type="button" className="btn btn-primary btn-sm shadow-sm" onClick={mostrar}><i className="fas fa-plus"></i> Agregar Tarea</button>
            </div>
            <div className={"p-1 " + visible.nuevaTarea}>
                <button type="button" className="btn btn-primary btn-sm shadow-sm" onClick={crearTarea}><i className="fas fa-save"></i> Guardar</button>
            </div>
        </div>
    </div>)
}

export default AgregarTarea;