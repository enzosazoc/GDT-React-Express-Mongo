

function Itemtarea(props) {

    return (
        <div className="bg-white text-secondary d-flex flex-wrap align-items-center p-2 rounded shadow-sm" {...props.provided.dragHandleProps}>
            <div className="col-12 d-flex align-items-center">
                <div className="p-2">
                    {
                        props.tar.estado 
                        ? 
                        <h5 className="text-primary m-0"><i className="fas fa-check-square" onClick={() => props.actualizarEstado(props.tar)} role="button"></i></h5> 
                        : 
                        <h5 className="text-secondary m-0"><i className="far fa-square" onClick={() => props.actualizarEstado(props.tar)} role="button"></i></h5>
                    }
                </div>
                <div className="p-2 flex-fill overflow-hidden ">
                    <input name="nombre" className="col-12 h6 text-secondary m-0 text-truncate border-0 p-1" value={props.tar.nombre} onChange={(e) => props.onChange(props.index, e)} onBlur={props.actualizarTareas}/>
                </div>
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
                    <div className="py-0 pl-3 pr-1 d-flex align-items-center" style={{color: "#cfd8dc"}}>
                        <i className="h5 fas fa-arrows-alt-v m-0"></i>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <div className="collapse" id={"collapseTarea"+props.index}>
                    <div className="p-2">
                        <hr className="m-0 mb-2"></hr>
                        <div className="d-flex- flex-wrap">
                            <label className="text-secondary small m-0 font-weight-bold">Descripción</label>
                            <textarea name="descripcion" className="form-control text-secondary small" value={props.tar.descripcion} onChange={(e) => props.onChange(props.index, e)} onBlur={props.actualizarTareas}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Itemtarea;