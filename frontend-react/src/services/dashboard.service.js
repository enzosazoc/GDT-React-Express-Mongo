import auth from '../utils/auth';
import config from '../config';

const obtenerDatos = async () => {
    try {
        const res = await fetch(`${config.apiUrl}/dashboard`, { headers: { 'x-access-token': auth.obtenerToken() } });
        const datos = await res.json();

        if (res.status === 200) {
            return datos;
        } else {
            return 1;
        }
    } catch (error) {
        return 9;
    }
}

const dashboardService = {
    obtenerDatos
}

export default dashboardService;