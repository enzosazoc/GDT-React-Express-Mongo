import { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';

function Guardando(props) {

    const [estilo, setEstilo] = useState({visibility: "hidden"});

    useEffect(() => {
        if (props.visible) {
            setEstilo(estiloVisible)
        }else {
            setEstilo(estiloOculto);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visible])

    const estiloVisible = {
        visibility: "visible",
        opacity: 1,
        transition: 'all 0.4s',
        marginTop: "60px",
        zIndex: "1010"
    }

    const estiloOculto = {
        visibility: "hidden",
        opacity: 0,
        transition: 'all 0.4s 1s',
        marginTop: "60px",
        zIndex: "1010"
    }

    return (

        <div className="d-flex justify-content-center fixed-top text-right" role="alert" style={estilo}>
            <div className="d-flex align-items-center alert alert-primary p-1 pl-4 pr-5 shadow-sm" role="alert" style={{borderRadius: "0px"}}>
                <PulseLoader color={"#00bfa5"} size="5px" margin="2px" /><div className="small pl-2"> Guardando...</div>
            </div>
        </div>
    )
}

export default Guardando;