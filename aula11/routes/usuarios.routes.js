const express = require('express');
// organizar o app por rotas
const router = express.Router();
//retorna a lista de usuarios

router.get('/usuarios',() => {
    // logica para listar os usuarios
})


module.exports = router; // exporta todas as rotas que são 'cadastradas' dentro do router