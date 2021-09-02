const express = require('express');
const router = express.Router();
const Filme = require('../models/conn/filmes');

router.get('/',(req, res) => {
    Filme.find({})
    .then((filmes) => {
        res.status(200).send(filmes);
    })
    .catch((err)=>{
        res.status(400),console.error(err);
    })

});

router.post("/add",async (req, res) =>{
    await Filme.create(req.body)
    .then((filme) =>{
        res.status(200).send("Filme adicionado com sucesso!!!");
    }).catch((err) =>{
        res.status(400).send("Algo de errado não está certo!");
    })
});

router.get('/findById/:id',async(req, res) => {
    await Filme.find({_id : req.params.id})
    .then((filme) =>{
        res.status(200).send(filme);
    })
    .catch((err)=>{
        console.error(err);
    })

});

router.get('/findByName/:name', async (req, res) => {
    await Filme.find({nome : req.params.name})
    .then((filme) => {
        res.status(200).send(filme);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.put("/update/:id", async (req, res) =>{
    await Filme.updateOne({_id: req.params.id},req.body)
    .then(() =>{
            res.status(200).send("Atualizado com Sucesso!!!")
    }) .catch((err) => {
        res.status(400).send("Algo de errado não esta certo!!!")
        console.log(err);
    })

  
})

router.delete("/delete/:id",async(req, res) =>{
    await Filme.deleteOne({_id: req.params.id})
    .then(() =>{
            res.status(200).send("Excluido com Sucesso!!!")
    }) .catch((err) => {
        res.status(400).send("Algo de errado não esta certo!!!")
        console.log(err);
    })
});

module.exports = router;