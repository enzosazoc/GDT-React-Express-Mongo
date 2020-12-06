
import { Modal, Button } from 'react-bootstrap';

function ModalConfirmacion(props) {

    const cerrarModal = () => {
        props.setModal(false);
    }

    return (
        <Modal show={props.modal} onHide={cerrarModal} animation={false} centered> 
            <Modal.Body className="text-center">
                <div className="text-primary h5">Confirmación</div>
                <div className="text-secondary">{props.mensaje}</div>
                <b className="text-secondary d-block text-truncate" title={props.nombre} >{props.nombre}</b>
            </Modal.Body>
            <Modal.Footer className="p-1">
                <Button variant="outline-secondary" size="sm" onClick={cerrarModal}>Cancelar</Button>
                <Button variant="primary" size="sm" onClick={props.ejecutar}>Confirmar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalConfirmacion;