const mongoose = require("mongoose");
// url de conexão mongodb://sevidor:porta/nomeBanco

function Conn(url,porta,banco){
    mongoose.connect(`mongodb://${url}:${porta}/${banco}`, {
        // conecta no bd com as configurações setadas
        useNewUrlParser: true,
        useUnifiedTopology: true, // mecanismo de monitoramento de dados
    }).then(() =>{
        console.log('Banco conectado: ');
    }).catch((err) =>{
        console.error(err);
    })
};


module.exports = Conn;