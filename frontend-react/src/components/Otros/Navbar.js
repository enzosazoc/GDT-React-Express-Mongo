import { Link, NavLink, withRouter } from 'react-router-dom'
import authService from '../../services/auth.service';

function Navbar(props) {

    const cerrarSesion = (e) => {
        e.preventDefault();
        authService.cerrarSesion();
        props.actualizarEstado();
        props.history.push("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/"><div className="text-primary font-weight-bold font-italic">GDT</div></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" activeClassName="active"><div><i className="fas fa-home"></i> Home</div></NavLink>
                        </li>

                        { (props.state.esAdmin || props.state.esUsuario) && ( 
                            <li className="nav-item">
                                <NavLink to="/proyectos" className="nav-link" activeClassName="active"><div><i className="fas fa-folder"></i> Mis proyectos</div></NavLink>
                            </li>
                        )}
                        
                        { props.state.esAdmin && (
                            <li className="nav-item">
                                <NavLink to="/admin" className="nav-link" activeClassName="active"><div><i className="fas fa-users-cog"></i> Admin</div></NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        { !props.state.logueado && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login" activeClassName="active"><i className="fas fa-sign-in-alt"></i> Login</NavLink>
                            </li>
                        )}

                        { !props.state.logueado && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/registro" activeClassName="active"><i className="fas fa-user-plus"></i> Registro</NavLink>
                            </li>
                        )}
                        
                        { props.state.logueado && (
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-user-circle"></i>
                                </div>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <Link className="dropdown-item text-secondary small" to="/perfil">Perfil</Link>
                                    <div className="dropdown-item text-secondary small" role="button" onClick={cerrarSesion}>Cerrar sesión</div>
                                </div>
                            </li>
                        ) }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar);