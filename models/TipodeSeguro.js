const mongoose = require('mongoose');

const TipoSeguroSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    descricao: { type: String, required: true },
    preco: { type: Number, required: true },
});

module.exports = mongoose.model('TipodeSeguro', TipoSeguroSchema);
