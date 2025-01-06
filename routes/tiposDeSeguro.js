const express = require('express');
const router = express.Router();
const TipoDeSeguro = require('../models/TipodeSeguro');

// Rota para exibir formulário de edição
router.get('/edit/:id', async (req, res) => {
    const tipoDeSeguro = await TipoDeSeguro.findById(req.params.id);
    res.render('tipos-deSeguro/edit', { tipoDeSeguro });
});

// Rota para processar a atualização
router.post('/edit/:id', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    await TipoDeSeguro.findByIdAndUpdate(req.params.id, { nome, descricao, preco });
    res.redirect('/tipos-deSeguro');
});

// Rota para exibir a confirmação de exclusão
router.get('/delete/:id', async (req, res) => {
    const tipoDeSeguro = await TipoDeSeguro.findById(req.params.id);
    res.render('tipos-deSeguro/delete', { tipoDeSeguro });
});

// Rota para processar a exclusão
router.post('/delete/:id', async (req, res) => {
    await TipoDeSeguro.findByIdAndDelete(req.params.id);
    res.redirect('/tipos-deSeguro');
});

module.exports = router;
