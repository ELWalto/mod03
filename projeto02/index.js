//No inicio temos que utilizar os comandos:
// npm init -y (Cria o arquivo package.json)
//npm install express (instalar o express no projeto)
//npm i -D nodemon  (Para atualizar o servidor apos as modificações automaticamente)

const express = require('express'); //importa express
const app = express(); // instancio o express em APP 

const port = 3010; //const com a porta de serviço que vamos utilizar
app.use(express.json()); ///falar para o app usar as requisições do JSON

const games = [ // lista com os jogos
    'Sonic',
    'Super Mario Bros 3',
    'Counter Strike',
    'Pac man'
];
const msgInicio = [ // lista com a mensagem de boas vindas para ser usada random
    'Bem vindo',
    'Bem vindo a nosso site de Jogos',
    'Steam de pobre',
    
];
function randomMinMax(min, max) { // Função para pegar aleatoriamente alguma informação
    return Math.floor(Math.random() * (max - min )) + min;
};
function frase(num){ // funçao que pega uma frase na cons msginicio e atribui um numero(indice)
    return msgInicio[num];
};

function randomGame(num){ // função que pega aleatoriamente um game na lista de Games
    return games[num];

}    
console.log(frase(randomMinMax(0,msgInicio.length))); //exibe aleatoriamente a frase no console

app.get('/', (req, res) =>{ //criamos a rota '/' inicial e vamos enviar uma mensagem inicial.
    res.send(`<h1>${frase(randomMinMax(0,msgInicio.length))}</h1>`);
});

app.get('/games', (req, res) =>{ //criamos a rota /games e dentro dela a lista de jogos
    res.send(`<h1>${randomGame(randomMinMax(0,games.length))}</h1>`); // exibe aleatoriamente 1 game da lista games
});
app.get('/listarTodos',(req, res)=>{
    res.send(games);

});

app.post('/games', (req,res) => {
    const game = req.body.game; //recebendo a requisição de um novo jogo no array
    const id = games.length;//aumentando o compromento do array
    games.push(game); //add o jogo no array
    res.send(`O ${game} adicionado com sucesso, ID: ${id}.`); // Msg resposta
});


app.put('/games/:id', (req, res) => { // atualizando game pelo id usando o app.put
    const id = req.params.id - 1; // id faz request usando o paramento id - 1 
    const game = req.body.game; // game recebe a requisição body do json game
    const gameAntigo = games[id];
    games[id] = game; // aqui a lista de games no id pego recebe a requisição do json com a atualização do novo game
    res.send(`O game:  ${gameAntigo}. foi atualizado para:  ${game}.`);

});

app.delete('/games/:id',(req,res) => {
    const id = req.params.id - 1; 
    const game = games[id];
    if(!game){ // se id do game não existir retorna não encontrado e se existir retorna o game
        res.send('Jogo não encontrado');
    }else{
    delete games[id];
    res.send("O jogo foi excluido")};
});



app.get('/games/:id', (req, res) => { // pegar um game pelo id
    const id = req.params.id; // id recebe o parametro id
    const game = games[id-1]; // const game recebe o id -1
    if (id > games.length || id < 1){ // validação do id
        res.send("ID invalido, tente novamente"); // se falso entra aqui
    }else {
        res.send(game); // exibe o game pelo id
    }
});

games.forEach(function (item, indice){ //"For como em Python" em games para pegar item e indice
    console.log(indice, item); // exibe o item e o id
});

app.listen(port,function(){ // Listen serve para indicar onde as conexões estão sendo feitas
    console.log(`App rodando na porta http://localhost:${port}/`);
});

//Roda com nodemon index.js