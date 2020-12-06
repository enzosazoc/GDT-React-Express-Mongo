import { useState, useEffect } from 'react';
import { HashLoader } from 'react-spinners';

function LoadingNav(props) {

    const [estilo, setEstilo] = useState({});

    useEffect(() => {
        if (props.visible) {
            setEstilo(estiloVisible)
        }else {
            setTimeout(() => {
                setEstilo(estiloOculto)
            }, 400);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.visible])

    const estiloVisible = {
        visibility: "visible",
        opacity: 1,
        width: "100%",
        height: "calc(100vh - 56px)",
        zIndex: "1040",
        backgroundColor: "#fafafa"
    }

    const estiloOculto = {
        visibility: "hidden",
        opacity: 0,
        transition: 'all 0.4s',
        width: "100%",
        height: "calc(100vh - 56px)",
        zIndex: "1040",
        backgroundColor: "#fafafa"
    }

    return (
        <div className="position-fixed fixed-bottom d-flex" style={estilo}>
            <div className="m-auto">
                <HashLoader  color={"#00bfa5"}/>
            </div>
        </div>
    )
}

export default LoadingNav;