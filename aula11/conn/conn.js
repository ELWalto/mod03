const mongoose = require("mongoose");
// url de conexão mongodb://sevidor:porta/nomeBanco

function Conn(){
    mongoose.connect("mongodb://localhost:27017/usuarios", {
  // conecta no bd com as configurações setadas
  useNewUrlParser: true,
  useUnifiedTopology: true, // mecanismo de monitoramento de dados
});
};


module.exports = Conn();