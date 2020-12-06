import { useState, useEffect } from 'react';
import proyectoService from '../../../services/proyecto.service';
import { Form, Modal } from 'react-bootstrap';
import LoadingNav from '../../Otros/LoadingNav';

function EditarTarea(props) {

    const [tarea, setTarea] = useState({nombre: '', descripcion: ''});
    const [esInvalido, setEsInvalido] = useState({nombre: false, descripcion: false});
    const [errores, setErrores] = useState({});
    const [errorServidor, setErrorServidor] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTarea(props.tarea);
    }, [props.tarea])

    const onChange = (e) => {
        const { name, value } = e.target;
        setTarea({...tarea, [name]: value});
        setEsInvalido({...esInvalido, [name]: false});
    }

    const validar = () => {
        let errores = {};
        let esInvalido = {nombre: false, descripcion: false};
        if (!tarea.nombre) errores.nombre = 'Ingrese el nombre de la tarea';
        if (tarea.nombre.length > 100) errores.nombre = 'El nombre debe tener máximo 100 caracteres';
        if (tarea.descripcion.length > 1000) errores.descripcion = 'La descripción debe tener máximo 1000 caracteres';
        if (errores.nombre) esInvalido.nombre = true;
        if (errores.descripcion) esInvalido.descripcion = true;
        setErrores(errores);
        setEsInvalido(esInvalido);
        if (Object.keys(errores).length) {
            return false;
        } else {
            return true;
        }
    }

    const actualizarTarea = async () => {
        setLoading(true);
        setErrorServidor(null);
        if (!validar()) {
            setLoading(false);
            return;
        }
        const tareasModificadas = props.proyecto.tareas.map(tar => tar._id === tarea._id ? tarea : tar);
        props.proyecto.tareas = tareasModificadas;
        const pro = await proyectoService.actualizarProyecto(props.proyecto._id, props.proyecto);
        if (!pro || pro === 1 || pro === 9) {
            setErrorServidor('Lo sentimos, ocurrió un error al actualizar la tarea');
            setLoading(false);
            return;
        }
        props.setProyecto(pro);
        props.setModal(false);
        setLoading(false);
    }

    const cerrarModal = () => {
        setEsInvalido({nombre: false, descripcion: false});
        setTarea(props.tarea);
        props.setModal(false);
    }

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div>
                    <Modal show={props.modal} onHide={cerrarModal} animation={false}> 
                        <Modal.Header>
                            <h5 className="text-secondary mb-0"><i className="fas fa-edit"></i> Editar tarea</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <label className="text-secondary small mb-1">Nombre</label>
                                <Form.Control name="nombre" className="text-secondary" isInvalid={esInvalido.nombre} value={tarea.nombre} maxLength="100" onChange={onChange} />
                                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <label className="text-secondary small mb-1">Descripción</label>
                                <Form.Control as="textarea" name="descripcion" className="text-secondary" isInvalid={esInvalido.descripcion} value={tarea.descripcion} maxLength="1000" onChange={onChange} />
                                <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
                            </Form.Group>
                            { errorServidor && <div className="alert alert-danger small" role="alert">{errorServidor}</div> }
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-secondary btn-sm" onClick={cerrarModal} style={{width: "80px"}}>Cancelar</button>
                            <button className="btn btn-primary btn-sm" onClick={actualizarTarea} style={{width: "80px"}}>Guardar</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default EditarTarea;