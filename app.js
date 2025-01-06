const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Consultor = require('./models/consultor');
const TipoSeguro = require('./models/TipodeSeguro');

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://serginhocure7:0202254212A@cluster0.pdnmg.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conexão com MongoDB estabelecida!");
}).catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error);
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.render('layout', { title: 'Sistema de Seguradora' });
});

app.get('/consultores', async (req, res) => {
    const consultores = await Consultor.find();
    res.render('consultores/index', { title: 'Consultores', consultores });
});

app.post('/consultores', async (req, res) => {
    const { nome, idade, email } = req.body;
    await Consultor.create({ nome, idade, email });
    res.redirect('/consultores');
});

app.get('/consultores/:id', async (req, res) => {
    const consultor = await Consultor.findById(req.params.id);
    res.render('consultores/detalhe', { title: 'Detalhes do Consultor', consultor });
});


app.get('/tipos-seguro', async (req, res) => {
    const tipos = await TipoSeguro.find();
    res.render('tipos-seguro/index', { title: 'Tipos de Seguro', tipos });
});

app.post('/tipos-seguro', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    await TipoSeguro.create({ nome, descricao, preco });
    res.redirect('/tipos-seguro');
});

app.get('/tipos-seguro/:id', async (req, res) => {
    const tipoSeguro = await TipoSeguro.findById(req.params.id);
    res.render('tipos-seguro/detalhe', { title: 'Detalhes do Tipo de Seguro', tipoSeguro });
});

app.get('/consultores/edit/:id', async (req, res) => {
    const consultor = await Consultor.findById(req.params.id);
    res.render('consultores/edit', { title: 'Editar Consultor', consultor });
});

app.post('/consultores/edit/:id', async (req, res) => {
    const { nome, idade, email } = req.body;
    await Consultor.findByIdAndUpdate(req.params.id, { nome, idade, email });
    res.redirect('/consultores');
});

app.get('/consultores/delete/:id', async (req, res) => {
    const consultor = await Consultor.findById(req.params.id);
    res.render('consultores/delete', { title: 'Excluir Consultor', consultor });
});

app.post('/consultores/delete/:id', async (req, res) => {
    await Consultor.findByIdAndDelete(req.params.id);
    res.redirect('/consultores');
});


// Tipo de Seguro Routes
app.get('/tipos-deSeguro/edit/:id', async (req, res) => {
    const tipoDeSeguro = await TipoSeguro.findById(req.params.id);
    res.render('tipos-deSeguro/edit', { title: 'Editar Tipo de Seguro', tipoDeSeguro });
});

app.post('/tipos-deSeguro/edit/:id', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    await TipoSeguro.findByIdAndUpdate(req.params.id, { nome, descricao, preco });
    res.redirect('/tipos-deSeguro');
});

app.get('/tipos-deSeguro/delete/:id', async (req, res) => {
    const tipoDeSeguro = await TipoSeguro.findById(req.params.id);
    res.render('tipos-deSeguro/delete', { title: 'Excluir Tipo de Seguro', tipoDeSeguro });
});

app.post('/tipos-deSeguro/delete/:id', async (req, res) => {
    await TipoSeguro.findByIdAndDelete(req.params.id);
    res.redirect('/tipos-deSeguro');
});




app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

