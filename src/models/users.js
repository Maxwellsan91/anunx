import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'O campo "Nome" é obrigatório.']
    },
    email: {
        type: String,
        required: [true, 'O campo "E-mail" é obrigatório.']
    },
    password: {
        type: String,
        required: [true, 'O campo "Senha" é obrigatório.']
    },
})

export default mongoose.models.users || mongoose.model('users', schema)