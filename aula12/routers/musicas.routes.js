const express = require('express');
const router = express.Router();
const Musica = require('../models/musicas');
const Controller = require('../controllers/musicas.controller')

router.post("/add",async (req, res) =>{
    await Musica.create(req.body)
    .then((musica) =>{
        res.status(200).send("Musica adicionada com sucesso!!!");
    }).catch((err) =>{
        res.status(400).send("Algo de errado não está certo!");
    })
});

router.get('/',(req, res) => {
    Musica.find({})
    .then((musicas) =>{
        res.send(musicas);
    })
    .catch((err)=>{
        console.error(err);
    })

});
router.get('/findById/:id',async(req, res) => {
    await Musica.find({_id : req.params.id})
    .then((musica) =>{
        res.send(musica);
    })
    .catch((err)=>{
        console.error(err);
    })

});
router.get('/findByName/:name', async (req, res) => {
    await Musica.find({nome : req.params.name})
    .then((musica) => {
        res.status(200).send(musica);
    })
    .catch((err) => {
        console.log(err);
    })
});

router.put("/update/:id", async (req, res) =>{
    await Musica.updateOne({_id: req.params.id},req.body)
    .then(() =>{
            res.status(200).send("Atualizado com Sucesso!!!")
    }) .catch((err) => {
        res.status(400).send("Algo de errado não esta certo!!!")
        console.log(err);
    })

  
})

router.delete("/delete/:id",async(req, res) =>{
    await Musica.deleteOne({_id: req.params.id})
    .then(() =>{
            res.status(200).send("Excluido com Sucesso!!!")
    }) .catch((err) => {
        res.status(400).send("Algo de errado não esta certo!!!")
        console.log(err);
    })
});


module.exports = router;