import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 15
    },
    password: {
        type: String,
        required: true
    },
    proyectos: {
        ref: "Proyecto",
        type: Schema.Types.ObjectId
    },
    roles: [{
        ref: "Rol",
        type: Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    versionKey: false
});

usuarioSchema.statics.encriptarPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

usuarioSchema.statics.compararPassword = async (passwordRecibida, passwordEncontrada) => {
    return await bcrypt.compare(passwordRecibida, passwordEncontrada);
}

export default model('Usuario', usuarioSchema);