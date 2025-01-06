const mongoose = require('mongoose');

const consultorSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: Number, required: true },
    email: { type: String, required: true },
});

module.exports = mongoose.model('Consultor', consultorSchema);
