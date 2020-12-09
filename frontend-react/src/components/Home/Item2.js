import { Link } from 'react-router-dom';
import { useState } from 'react';

function Item2(props){

    const estiloNormal = {bg: 'bg-white', logo: 'text-primary', texto: 'text-secondary'};
    const estiloHover = {bg: 'bg-primary', logo: 'text-white', texto: 'text-white'};
    const [estilo, setEstilo] = useState(estiloNormal);

    const onMouseEnter = () => {
        setEstilo(estiloHover);
    }

    const onMouseLeave = () => {
        setEstilo(estiloNormal);
    }

    return (
        <Link className="text-decoration-none" to={props.to}>
            <div className={"p-4 py-5 text-center rounded-sm shadow-sm " + estilo.bg} style={{transition: '0.2s'}} role="button" 
                onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
            >
                <div><i className={"h1 " + estilo.logo + " " + props.logo}></i></div>
                <h4 className={estilo.texto} title={props.titulo}>{props.titulo}</h4>
                <div className={"small " + estilo.texto} title={props.descripcion}>{props.descripcion}</div>
            </div>
        </Link>
    )
}

export default Item2;