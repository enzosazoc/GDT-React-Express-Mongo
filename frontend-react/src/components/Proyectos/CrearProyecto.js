import { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import proyectoService from '../../services/proyecto.service';
import LoadingNav from '../Otros/LoadingNav';

function CrearProyecto(props) {

    const [proyecto, setProyecto] = useState({nombre: '', descripcion: ''});
    const [esInvalido, setEsInvalido] = useState({nombre: false, descripcion: false});
    const [errores, setErrores] = useState({});
    const [errorServidor, setErrorServidor] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const {name, value} = e.target;
        setProyecto({...proyecto, [name]: value});
        setEsInvalido({...esInvalido, [name]: false});
    }

    const validar = () => {
        let errores = {};
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

    const crearProyecto = async () => {
        setLoading(true);
        setErrorServidor(null);
        if (!validar()) {
            setLoading(false);
            return;
        }
        const res = await proyectoService.crearProyecto(proyecto);
        if (res === 1 || res === 9) setErrorServidor('Lo sentimos, ocurrió un error al crear proyecto');
        if (res === 0) cerrarModal();
        setLoading(false);
    }

    const cerrarModal = async () => {
        props.obtenerProyectos();
        setEsInvalido({nombre: false, descripcion: false});
        setErrorServidor(null);
        setProyecto({nombre: '', descripcion: ''});
        props.setModal(false);
    }

    const onHide = () => {
        cerrarModal();
    }

    return (
        <div>
            <LoadingNav visible={loading}/>
            { !loading && (
                <div className="position-relative">
                    <Modal show={props.modal} onHide={onHide} animation={false}> 
                        <Modal.Header>
                            <h5 className="text-secondary mb-0"><i className="fas fa-folder-plus"></i> Crear proyecto</h5>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group>
                                <label className="text-secondary small mb-1">Nombre del proyecto</label>
                                <Form.Control name="nombre" className="text-secondary" isInvalid={esInvalido.nombre} value={proyecto.nombre} maxLength="100" onChange={onChange} />
                                <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <label className="text-secondary small mb-1">Descripción del proyecto (opcional)</label>
                                <Form.Control as="textarea" rows="4"  name="descripcion"  className="text-secondary" isInvalid={esInvalido.descripcion} value={proyecto.descripcion} maxLength="2000" onChange={onChange} />
                                <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
                            </Form.Group>
                            { errorServidor && <div className="alert alert-danger small" role="alert">{errorServidor}</div> }
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-outline-secondary btn-sm" onClick={cerrarModal} style={{width: "80px"}}>Cancelar</button>
                            <button className="btn btn-primary btn-sm" onClick={crearProyecto} style={{width: "80px"}}>Crear</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            )}
        </div>
        
    )
}

export default CrearProyecto;