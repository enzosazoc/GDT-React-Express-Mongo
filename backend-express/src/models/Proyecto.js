import { Schema, model } from 'mongoose';

const TareaSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        default: '',
        maxlength: 100
    },
    descripcion: {
        type: String,
        default: '',
        maxlength: 1000
    },
    estado: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: false,
    versionKey: false
})

const ProyectoSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        default: '',
        maxlength: 100
    },
    descripcion: {
        type: String,
        default: '',
        maxlength: 2000
    },
    tareas: [TareaSchema],
    usuario: {
        ref: "Usuario",
        type: Schema.Types.ObjectId
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model('Proyecto', ProyectoSchema)