import { useState, useEffect } from 'react';
import CambiarUsuario from './CambiarUsuario';
import CambiarPassword from './CambiarPassword';
import EliminarCuenta from './EliminarCuenta';
import LoadingNav from '../Otros/LoadingNav';

function Perfil(props) {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <LoadingNav visible={loading}/>
            
            { !loading && (
                <div>
                    <br/>
                    <h2 className="text-secondary">Perfil de usuario</h2>
                    <hr/>
                    <div className="d-flex flex-wrap">

                        <div className="col-12 col-lg-12 d-flex flex-wrap p-0">
                            
                            <div className="col-12 col-lg-4 p-1">
                                <CambiarUsuario/>
                            </div>

                            <div className="col-12 col-lg-4 p-1">
                                <CambiarPassword/>
                            </div>

                            <div className="col-12 col-lg-4 p-1">
                                <EliminarCuenta props={props}/>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
        
    )
}

export default Perfil;