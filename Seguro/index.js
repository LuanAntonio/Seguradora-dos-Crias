const express = require("express");
const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://Murilo:paulo@murilo.qtim0.mongodb.net/?retryWrites=true&w=majority&appName=Murilo")
const alunoModel = require("./models/seguroModel");


app.get("/", function(req, res){
    res.render("index");
});

app.get("/seguros", async function(req, res){
    const status = req.query.s;
    const seguros = await seguroModel.find();
    res.render("seguro/listagem", {seguros, status});
})

app.post("/seguros", async function(req, res){
    const novoSeguro = new seguroModel({
        preco: req.body.preco,
        tipo : req.body.tipo,
        distribuidora : req.body.distribuidora
    });

    await novoSeguro.save();
    res.redirect("/seguros?s=1");
})

app.get("/seguros/cadastrar", function(req, res){
    res.render("seguro/cadastrar");
})

app.get("/seguros/:preco", async function(req, res){
    const preco = req.params.matricula;
    const seguro = await seguroModel.findOne({preco});
    res.render("seguro/detalhar", {seguro: seguro});
})

app.listen("999", function(){
    console.log("rodando...");
})