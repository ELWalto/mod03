const mongoose = require("mongoose");
// url de conexão mongodb://sevidor:porta/nomeBanco

function Conn(url,porta,banco){
    mongoose.connect(`mongodb+srv://dbadministrador:8Lw8J1PIfM1rN5Y1@blue-db.upw3m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
        // conecta no bd com as configurações setadas
        useNewUrlParser: true,
        useUnifiedTopology: true, // mecanismo de monitoramento de dados
    }).then(() =>{
        console.log('Banco connected: ');
    }).catch((err) =>{
        console.error(err);
    })
};


module.exports = Conn;