import { useState } from 'react';

function Item1(props){

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
        <div className={"rounded shadow-sm p-3 " + estilo.bg} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{transition: '0.2s'}}>
            <h3 className={estilo.logo}><i className={props.logo}></i> {props.titulo}</h3>
            <p className={" " + estilo.texto} title={props.descripcion} >{props.descripcion}</p>
        </div>
    )
}

export default Item1;