import { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import usuarioService from '../../services/usuario.service';
import dashboardService from '../../services/dashboard.service';
import LoadingNav from '../Otros/LoadingNav';

function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [datos, setDatos] = useState({proyectos: 0, usuarios: 0});
    const [datosGrafico, setDatosGrafico] = useState({});
    const [errorServidor, setErrorServidor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        functionesIniciales();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const functionesIniciales = async () => {        
        const res = await Promise.all([dashboardService.obtenerDatos(), usuarioService.obtenerUsuarios()])
        const resDatos = res[0];
        const resUsuarios = res[1];
        setearDatos(resDatos);
        setearUsuarios(resUsuarios)
        setLoading(false);
    }

    const setearDatos = (res) => {
        if (!res || res === 1 || res === 9) {
            setErrorServidor('No se logró obtener los datos');
            return;
        }
        setDatos({proyectos: res.proyectos, usuarios: res.usuarios});
        setDatosGrafico({
            labels: res.proyectosPorUsuario.map(obj => obj.usuario),
            datasets: [{
                label: 'Proyectos',
                backgroundColor: '#00bfa5',
                barThickness: '15',
                data: res.proyectosPorUsuario.map(obj => obj.proyectos),
            }]
        })
    }

    const setearUsuarios = (res) => {
        if (!res || res === 1 || res === 9) {
            setErrorServidor('No se logró obtener los datos');
            return;
        }
        setUsuarios(res);
    }

    const obtenerFecha = (fecha) => {
        const fechaDate = new Date(fecha);
        const fechaStr = fechaDate.getDate() + "-" + (fechaDate.getMonth() + 1) + "-" + fechaDate.getFullYear();
        return fechaStr;
    }

    const recargar = () => {
        setLoading(true);
        setErrorServidor(null);
        functionesIniciales();
    }

    return (
        <div>
            <LoadingNav visible={loading}/>

            { !loading && ( 
                
                errorServidor ?
                    <div className="col-12 p-0 pt-4">
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <i className="far fa-dizzy"></i> <b>Problemas de conexión con la base de datos.</b> {errorServidor}
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <button className="btn btn-primary btn-lg" onClick={recargar}>Recargar</button>
                    </div>
                :
                <div className="d-flex flex-wrap">
                    <div className="col-12 p-0">
                        <br/>
                        <h2 className="text-secondary">Mini dashboard</h2>
                        <hr/>
                    </div>

                    <div className="d-flex flex-wrap col-12 col-lg-3 col-xl-2 p-0">
                        <div className="col-12 col-md-6 col-lg-12 p-1">
                            <div className="rounded shadow-sm bg-white" style={{height: "141px"}}>
                                <div className="text-secondary h6 m-0 p-2" style={{height: "41px"}}>
                                    <i className="fas fa-user-alt"></i> Usuarios creados
                                </div>
                                <div className="text-primary text-center" style={{height: "100px"}}>
                                    <div className="display-4">{datos.usuarios}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-12 p-1">
                            <div className="rounded shadow-sm bg-white" style={{height: "141px"}}>
                                <div className="text-secondary h6 m-0 p-2" style={{height: "41px"}}>
                                    <i className="fas fa-folder"></i> Proyectos creados
                                </div>
                                <div className="text-primary text-center" style={{height: "100px"}}>
                                    <div className="display-4">{datos.proyectos}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-9 col-xl-10 p-1">
                        <div className="bg-white p-2 rounded shadow-sm">
                            <h5 className="text-secondary"><i className="fas fa-chart-bar"></i> Proyectos por usuario (Top 5)</h5>
                            <div>
                                <HorizontalBar 
                                    data={datosGrafico} 
                                    width={600} 
                                    height={242} 
                                    options={{ 
                                        maintainAspectRatio: false , 
                                        scales: { 
                                            xAxes: [{ 
                                                stacked: true,
                                                ticks: {
                                                    precision: 0
                                                }
                                            }], 
                                        },
                                    }} 
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-12 p-1">
                        <div className="bg-white rounded shadow-sm overflow-hidden">
                            <div className="p-2">
                                <h5 className="text-secondary m-0"><i className="fas fa-users"></i> Usuarios</h5>
                            </div>
                            <div className="p-2 table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr className="text-secondary small">
                                            <th className="border-top-0">Username</th>
                                            <th className="border-top-0">Roles</th>
                                            <th className="border-top-0 text-right">Fecha de creación</th>
                                            <th className="border-top-0 text-right">Última actualización</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            usuarios.map((usu, index) => {
                                                return <tr key={index} className="text-secondary small">
                                                    <td className="text-truncate">{usu.username}</td>
                                                    <td className="text-truncate">{usu.roles.map(rol => rol.nombre).toString()}</td>
                                                    <td className="text-truncate text-right">{obtenerFecha(usu.createdAt)}</td>
                                                    <td className="text-truncate text-right">{obtenerFecha(usu.updatedAt)}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Usuarios;