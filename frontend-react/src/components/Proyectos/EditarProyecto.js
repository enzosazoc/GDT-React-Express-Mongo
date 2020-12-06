import { useState, useEffect } from 'react';
import proyectoService from '../../services/proyecto.service';
import { Modal, Form } from 'react-bootstrap';
import LoadingNav from '../Otros/LoadingNav';

function EditarProyecto(props) {

    const [proyecto, setProyecto] = useState({nombre: '', descripcion: ''});
    const [esInvalido, setEsInvalido] = useState({nombre: false, descripcion: false});
    const [errores, setErrores] = useState({});
    const [errorServidor, setErrorServidor] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setProyecto(props.proyecto)
    }, [props.proyecto])

    const onChange = (e) => {
        const {name, value} = e.target;
        setProyecto({...proyecto, [name]: value});
        setEsInvalido({...esInvalido, [name]: false});
    }

    const validar = () => {
        const errores = {};
        let esInvalido = {nombre: false, descripcion: false};
        if (!proyecto.nombre) errores.nombre = 'Ingrese el nombre del proyecto';
        if (proyecto.nombre.length > 100) errores.nombre = 'El nombre debe tener máximo 100 caracteres';
        if (proyecto.descripcion.length > 2000) errores.descripcion = 'La descripción debe tener máximo 2000 caracteres';
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

    const actualizarProyecto = async () => {
        setLoading(true);
        setErrorServidor(null);
        if (!validar()) {
            setLoading(false);
            return;
        }
        const pro = await proyectoService.actualizarProyecto(proyecto._id, proyecto);
        if (!pro || pro === 1 || pro === 9) {
            setErrorServidor('Lo sentimos, ocurrió un error al editar proyecto');
            setLoading(false);
            return;
        }
        props.setProyecto(pro);
        props.setModal(false);
        setLoading(false);
    }

    const cerrarModal = () => {
        setEsInvalido({nombre: false, descripcion: false});
        setErrorServidor(null);
        setProyecto(props.proyecto);
        props.setModal(false);
    }

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && (
                <div>
                    <Modal show={props.modal} onHide={cerrarModal} animation={false}> 
                        <Modal.Header>
                            <h5 className="text-secondary mb-0"><i className="fas fa-edit"></i> Editar proyecto</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <label className="text-secondary small mb-1">Nombre del proyecto</label>
                                <Form.Control name="nombre" className="text-secondary" isInvalid={esInvalido.nombre} value={proyecto.nombre} maxLength="100" onChange={onChange} />
                                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <label className="text-secondary small mb-1">Descripción del proyecto (opcional)</label>
                                <Form.Control as="textarea" rows="4" name="descripcion" className="text-secondary" isInvalid={esInvalido.descripcion} value={proyecto.descripcion} maxLength="2000" onChange={onChange} />
                                <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
                            </Form.Group>
                            { errorServidor && <div className="alert alert-danger small" role="alert">{errorServidor}</div> }
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-secondary btn-sm" onClick={cerrarModal} style={{width: "80px"}}>Cancelar</button>
                            <button className="btn btn-primary btn-sm" onClick={actualizarProyecto} style={{width: "80px"}}>Guardar</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
    )
}

export default EditarProyecto;