// comandos de inicialização e instalação de todas as dependencias
// npm init -y
// npm i express
// npm i -D nodemon
// npm i mongoose@5.13.8
const express = require("express");
const Conn = require("./models/conn/conn");
const app = express();


app.use(express.json()); // Falar para as requisições do express que estamos utilizando json

const Connection = require('./models/conn/conn')

Conn("localhost",27017,"filmes");

const port = 3001;

const filme = require("./routers/filmes.routes")
app.use("/filmes",filme);



// Funções de validação///
const getFilmesValidos = () => filmes.filter(Boolean); // filter para "excluir os ids invalidos no get "Null, undefined, False"

const getFilmesById = (id) =>
  getFilmesValidos().find((filme) => filme.id == id); // passo uma funçao getbyid  que apos retornar a lista de filmes validos compara o id fornecido com o id recebido do filme e quando encontra o id igual retorna o objeto encontrado

const getIndexByFilme = (id) =>
  getFilmesValidos().findIndex((filme) => filme.id === id); // retorna o indice da lista usando como parametro o id da lista.
/// Fim funções validação ///

app.get("/filmes", (req, res) => {
  // Rota que retorna a lista de filmes
  res.send(getFilmesValidos()); // filter para "excluir os ids invalidos no get "Null, undefined, False"
}); // Endpoint Filmes

app.get("/filmes/:id", (req, res) => {
  const id = req.params.id; // informamos -1 para 'arrumar' o indice pois a lista inicia no 0
  const filme = getFilmesById(id);
  if (!filme) {
    // se id do filme não existir retorna não encontrado e se existir retorna o filme
    res.send("Filme não encontrado");
  }
  res.send(filme);
}); // depois dos : da rota informamos o parametro no caso ID

// Rota para cadastrar um novo filme Para listar dados usamos GET e para criar usamos o POST atualizar usamos o PUT e deletar DELETE

// A API não sabe qual filme esta vindo
app.post("/filmes", (req, res) => {
  const filme = req.body; // json completo da requisição
  if (!filme || !filme.nome || !filme.imagemUrl) {
    // validação do nome e url imagem
    res.status(400).send({
      message: "Filme inválido. Tente novamente",
    });
    return;
  }

  const ultimoFilme = filmes[filmes.length - 1];

  if (filmes.length) {
    filme.id = ultimoFilme.id + 1;
    filmes.push(filme);
  } else {
    filme.id = 1;
    filmes.push(filme);
  }

  //   const id = filmes.length;
  //   filmes.push(filme);

  res.send(
    `Filme ${filme.nome} adicionado com sucesso . O ID do filme é ${filme.id}`
  );
});

app.put("/filmes/:id", (req, res) => {
  // atualizando filme pelo id usando o app.put///
  const id = +req.params.id - 1; // id faz request usando o paramento id - 1 O + converte a string em numero

  const filmeIndex = getIndexByFilme(id);

  if (filmeIndex < 0) {
    res.status(404).send({
      message: " O filme não foi encontrado, tente novamente.",
    });
    return;
  }
  const novoFilme = req.body;
  if (!Object.keys(filme).length) {
    // se não tiver nenhuma chave  dentro do objeto entra no if
    res.status(400).send({
      message: " O Body está vazio!",
    });
  }

  if (!novoFilme || !novoFilme.nome || !novoFilme.imagemUrl) {
    res.status(400).send({
      message: "Filme inválido, tente novamente!",
    });
    return;
  }
  const filme = getFilmesById(id);
  filmes[filmeIndex] = {
    ...filme, //espread espelha a estrutura do objeto(nome url etc, para o novo objeto "novo filme"
    ...novoFilme,
  };
  res.send(filmes[filmeIndex]);

  //   const filme = req.body.filme; // filme recebe a requisição body do json filme
  //   const filmeAntigo = filmes[id];
  //   filmes[id] = filme; // aqui a lista de filmes no id pego recebe a requisição do json com a atualização do novo filme
  //   res.send(`O filme:  ${filmeAntigo}. foi atualizado para:  ${filme}.`);
});

app.delete("/filmes/:id", (req, res) => {
  const id = +req.params.id;
  const filmeIndex = getIndexByFilme(id);

  if (filmeIndex < 0) {
    res.status(404).send({
      message: "filme não encontrado",
    });
    return;
  }

  filmes.splice(filmeIndex, 1); // splice remove a partir do que eu passei até o que eu informar no segundo parametro que no caso foi 1 ///
  res.send({
    message: "filme removido com sucesso!!!",
  });

  //   const filme = filmes[id];
  //   if (!filme) {
  //     // se id do filme não existir retorna não encontrado e se existir retorna o filme
  //     res.send("Filme não encontrado");
  //   } else {
  //     delete filmes[id];
  //     res.send("O filme foi excluido");
  //   }
});

app.listen(port, ()=> {
  // Listen serve para indicar onde as conexões estão sendo feitas
  console.info(`App rodando em http://localhost:${port}/`);
});
