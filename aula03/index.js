const express = require("express");
const app = express();

const port = 3001;

app.use(express.json()); // Falar para as requisições do express que estamos utilizando json

const filmes = [
  {
    id: 1,
    nome: "Capitão America o primeiro vingador",
    imagemUrl:
      "https://play-lh.googleusercontent.com/9LAzip_XWe8eVWEUGCnSJ4xf706RmYtSu5bZRAfvqbs2aW6YVlLbPF7UVTfMpJKQUioKGw",
  },
  {
    id: 2,
    nome: "Capitã Marvel",
    imagemUrl:
      "https://br.web.img2.acsta.net/pictures/19/02/04/18/35/1468867.jpg",
  },
  {
    id: 3,
    nome: "O incrivel Hulk",
    imagemUrl:
      "https://br.web.img2.acsta.net/c_310_420/pictures/210/485/21048566_20131010182211313.jpg",
  },
  {
    id: 4,
    nome: "Homem de ferro",
    imagemUrl:
      "https://images-na.ssl-images-amazon.com/images/I/81vTHovrz%2BL._AC_SY606_.jpg",
  },
  {
    id: 5,
    nome: "Homem de ferro 2",
    imagemUrl:
      "https://media.fstatic.com/SFp4c8GT3GTGYok7_526qDSHTns=/290x478/smart/media/movies/covers/2018/09/66432b37ed80464274a58239b695007f95c79155.jpg",
  },
];

app.get("/", (req, res) => {
  // Rota que retorna apenas hello world
  res.send("Hello, World!");
}); // Endpoint principal

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

app.listen(port, function () {
  // Listen serve para indicar onde as conexões estão sendo feitas
  console.log(`App rodando na porta http://localhost:${port}/`);
});
