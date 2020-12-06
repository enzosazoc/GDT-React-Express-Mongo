import config from '../config'

function obtenerToken() {

    const token = sessionStorage.getItem(config.token);
    
    if (token) {
        return token;
    } else {
        return '';
    }
}

const auth = {
    obtenerToken
}

export default auth;