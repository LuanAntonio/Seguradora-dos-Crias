const express = require('express');
const router = express.Router();
const Consultor = require('../models/consultor');

// Rota para exibir formulário de edição
router.get('/edit/:id', async (req, res) => {
    const consultor = await Consultor.findById(req.params.id);
    res.render('consultores/edit', { consultor });
});

// Excluir um consultor
router.delete('/:id', async (req, res) => {
  await Consultor.findByIdAndDelete(req.params.id);
  res.redirect('/consultores');
});

// Rota para processar a atualização
router.post('/edit/:id', async (req, res) => {
    const { nome, idade, email } = req.body;
    await Consultor.findByIdAndUpdate(req.params.id, { nome, idade, email });
    res.redirect('/consultores');
});

// Rota para exibir a confirmação de exclusão
router.get('/delete/:id', async (req, res) => {
    const consultor = await Consultor.findById(req.params.id);
    res.render('consultores/delete', { consultor });
});

// Rota para processar a exclusão
router.post('/delete/:id', async (req, res) => {
    await Consultor.findByIdAndDelete(req.params.id);
    res.redirect('/consultores');
});

module.exports = router;
