// Librerías React
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Servicios, utils, etc
import config from './config';
import authService from './services/auth.service';
// Componentes
import PrivateRoute from './components/Otros/PrivateRoute';
import Navbar from './components/Otros/Navbar'
import Login from './components/Login/Login'
import Registro from './components/Registro/Registro'
import Home from './components/Home/Home';
import Proyectos from './components/Proyectos/Proyectos'
import Proyecto from './components/Proyectos/Proyecto';
import Admin from './components/Admin/Admin';
import Perfil from './components/Perfil/Perfil';

export default class App extends Component {

    state = {
        logueado: false,
        esUsuario: false,
        esAdmin: false,
        loading: false,
        username: null
    }

    componentDidMount() {
        this.actualizarEstado();
    }

    actualizarEstado = () => {
        const usuario = authService.obtenerUsuario();
        if (!usuario) {
            this.setState({
                logueado: false,
                esUsuario: false,
                esAdmin: false,
                roles: null
            })
        } else {
            this.setState({logueado: true, roles: usuario.roles});

            if (usuario.roles.includes('ROLE_USUARIO')) {
                this.setState({esUsuario: true});
            } else {
                this.setState({esUsuario: false});
            }

            if (usuario.roles.includes('ROLE_ADMIN')) {
                this.setState({esAdmin: true});
            } else{
                this.setState({esAdmin: false});
            }
        }
    }

    render() {
        return (
            <div className="position-relative">
                <Router className="">
                    <Navbar state={this.state} actualizarEstado={this.actualizarEstado}/>

                    
                    <div className="position-relative container p-2">
                        <Switch>
                            <Route exact path="/" render={(props) => <Home {...props} state={this.state} actualizarEstado={this.actualizarEstado}/> } />
                            <Route path="/login" render={(props) => <Login {...props} logueado={this.state.logueado} actualizarEstado={this.actualizarEstado}/> } />
                            <Route path="/registro" render={(props) => <Registro {...props} logueado={this.state.logueado} actualizarEstado={this.actualizarEstado}/> } />
                            <PrivateRoute exact path="/proyectos" component={Proyectos} roles={[config.rol.USUARIO, config.rol.ADMIN]} />
                            <PrivateRoute path="/proyectos/:id" component={Proyecto} roles={[config.rol.USUARIO, config.rol.ADMIN]}/>
                            <PrivateRoute path="/admin" component={Admin} roles={[config.rol.ADMIN]}/>
                            <PrivateRoute path="/perfil" component={Perfil} roles={[config.rol.USUARIO, config.rol.ADMIN]}/>
                        </Switch>
                        <br/>
                        <br/>
                        <br/>
                    </div>
                </Router>
            </div>
        )
    }
}