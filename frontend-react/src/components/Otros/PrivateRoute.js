import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../../services/auth.service'

const PrivateRoute = ({component: Component, roles, ...rest}) => (

    <Route {...rest} render={props => {

        const usuario = authService.obtenerUsuario();

        if (!usuario) {
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        if (roles && !roles.some(r => usuario.roles.indexOf(r) >= 0)) {
            return <Redirect to={{ pathname: '/login'}} />
        }

        return <Component {...props} />
    }} />
);

export default PrivateRoute;