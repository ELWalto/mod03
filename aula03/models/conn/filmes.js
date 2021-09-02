const mongoose = require('mongoose');

const filmesModel = new mongoose.Schema({
    nome: {type:String,required:true},
    imagemUrl: { type:String,required:true},
    sinopse: { type:String,required:true},
    duracao: { type:String},
    lançamento: { type:String},
    dataCriacao: { type:Date, default:Date.now}
    
});

const Filme = mongoose.model("filmes",filmesModel);

module.exports = Filme;