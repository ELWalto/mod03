const express = require("express");
const app = express();
app.use(express.json()); // Falar para as requisições do express que estamos utilizando json


const getFilmesValidos = () => filmes.filter(Boolean); // filter para "excluir os ids invalidos no get "Null, undefined, False"
const getFilmesById = (id) =>
  getFilmesValidos().find((filme) => filme.id == id); // passo uma funçao getbyid  que apos retornar a lista de filmes validos compara o id fornecido com o id recebido do filme e quando encontra o id igual retorna o objeto encontrado
  const getIndexByFilme = (id) =>
  getFilmesValidos().findIndex((filme) => filme.id === id); // retorna o indice da lista usando como parametro o id da lista.
/// Fim funções validação ///

const ultimoFilme = filmes[filmes.length - 1];

  if (filmes.length) {
    filme.id = ultimoFilme.id + 1;
    filmes.push(filme);
  } else {
    filme.id = 1;
    filmes.push(filme);
  }
  res.send(
    `Filme ${filme.nome} adicionado com sucesso . O ID do filme é ${filme.id}`
  );
