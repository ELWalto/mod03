const express = require("express");



const app = express();

const port = 3000;
const usuarioModel = require("./models/usuario");

const Conn = require("./conn/conn");

Conn();

// falar para o node ir no bd e criar a tabela modelo
const Usuario = mongoose.model("Usuario", usuarioModel);

// cadastrando o primeiro usuario manualmente sem API
const usuario3 = new Usuario({
  nome: "Walt",
  sobrenome: "Carvalho",
  cpf: 12345678925,
  idade: "1992-03-14",
  senha: "abacate123",
});


// pega o usuario por id (Find é um filtro)
Usuario.findOne({ nome: "waltinho" }) // vazio é para pegar todos os dados no bd
  .then((usuarios) => {
    console.log(usuarios);
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Ola Mundo!!!");
});
usuario3.save() //SAVE insere os dados no mongo promisses é uma forma de trabalhar com funções que sendo executadas ou não fica no background aguardando;

  .then(() => {
    console.log("informações salvas");
  }) // essa é um função JS para OK
  .catch((err) => {
    console.error(err);
  }); // esse é para ERRO
// econtrar e excluir por id do banco
Usuario.findByIdAndDelete("612d6f91e5b8d44570f1ad03")
.then((usuarios) => {
    console.log('excluido');
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(port, () => {
  console.info(`app rodando na porta ${port}`);
});
