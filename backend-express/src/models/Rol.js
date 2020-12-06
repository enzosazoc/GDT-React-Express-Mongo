import { Schema, model } from 'mongoose';

const rolSchema = new Schema({
    nombre: String
}, {
    versionKey: false,
    collection: 'roles'
});

export default model('Rol', rolSchema);
export const ROLES = ["ROLE_USUARIO", "ROLE_ADMIN"]