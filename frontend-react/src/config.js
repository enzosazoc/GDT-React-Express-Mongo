
/* Para desarrollo ------> http://localhost:4000/api */
/* Para producción ------> https://node-gdt.herokuapp.com/api */

const config = {
    apiUrl: 'http://localhost:4000/api',
    token: 'token',
    rol: {
        USUARIO: 'ROLE_USUARIO',
        ADMIN: 'ROLE_ADMIN'
    }
}

export default config;