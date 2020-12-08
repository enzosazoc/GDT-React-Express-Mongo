import { useState, useRef } from 'react';

function Itemtarea(props) {

    const [modificado, setModificado] = useState(false);
    const inputNombre = useRef(null);
    const inputDescripcion = useRef(null);

    const onSubmitNombre = (e) => {
        e.preventDefault();
        inputNombre.current.blur();
    }

    const onSubmitDescripcion = (e) => {
        e.preventDefault();
        inputDescripcion.current.blur();
    }

    const onChange = (index, e) => {
        props.onChange(index, e);
        setModificado(true);
    }

    const onBlur = () => {
        if (modificado) {
            props.actualizarTareas();
        }
        setModificado(false);
    }

    return (
        <div className="bg-white text-secondary d-flex flex-wrap align-items-center p-0 rounded shadow-sm">
            <div className="col-12 p-0 d-flex align-items-center">
                <div className="p-2 pl-3">
                    {
                        props.tar.estado 
                        ? 
                        <h5 className="text-primary m-0"><i className="fas fa-check-square" onClick={() => props.actualizarEstado(props.tar)} role="button"></i></h5> 
                        : 
                        <h5 className="text-secondary m-0"><i className="far fa-square" onClick={() => props.actualizarEstado(props.tar)} role="button"></i></h5>
                    }
                </div>
                <form className="p-2 flex-fill overflow-hidden" onSubmit={onSubmitNombre}>
                    <input ref={inputNombre} name="nombre" className="col-12 h6 text-secondary m-0 text-truncate border-0 p-1" title={props.tar.nombre} 
                        value={props.tar.nombre} onChange={(e) => onChange(props.index, e)} onBlur={onBlur}
                    />
                </form>
                <div className="d-flex">
                    <div className="py-2 pl-1 pr-1">
                        <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="collapse" href={"#collapseTarea"+props.index}>
                            <i className="fas fa-list-ul"></i>
                        </button>
                    </div>
                    <div className="py-2 pl-1 pr-2">
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => props.eliminarTarea(props.index)}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                    <div className="py-0 pl-3 pr-4 d-flex align-items-center" style={{color: "#cfd8dc"}} {...props.provided.dragHandleProps} title="Arrastrar tarea">
                        <div className="pl-1 pr-2">
                            <i className="h5 fas fa-arrows-alt-v m-0"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="collapse" id={"collapseTarea"+props.index}>
                    <div className="p-2">
                        <form className="d-flex- flex-wrap pb-2" onSubmit={onSubmitDescripcion}>
                            <label className="text-secondary small m-0 font-weight-bold">Descripción</label>
                            <textarea ref={inputDescripcion} name="descripcion" className="form-control text-secondary small" title={props.tar.descripcion} 
                                value={props.tar.descripcion} onChange={(e) => onChange(props.index, e)} onBlur={onBlur}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Itemtarea;