const express = require('express');
const app = express();

const port = 3001;

app.use(express.json()) // Falar para as requisições do express que estamos utilizando json

const filmes = [
    'Capitão América',
    'Thor',
    'Batman',
    'Aquaman',
    'Hulk',
    'Superman'

];

app.get('/',(req,res)=>{ // Rota que retorna apenas hello world
    res.send('Hello, World!');

}) // Endpoint principal

app.get('/filmes',(req,res)=>{ // Rota que retorna a lista de filmes
    res.send(filmes);

}) // Endpoint Filmes

app.get('/filmes/:id',(req,res)=>{ 
    const id = req.params.id - 1; // informamos -1 para 'arrumar' o indice pois a lista inicia no 0
    const filme = filmes[id];
    if(!filme){ // se id do filme não existir retorna não encontrado e se existir retorna o filme
        res.send('Filme não encontrado');
    }
    res.send(filme);

}) // depois dos : da rota informamos o parametro no caso ID

// Rota para cadastrar um novo filme Para listar dados usamos GET e para criar usamos o POST atualizar usamos o PUT e deletar DELETE

// A API não sabe qual filme esta vindo
app.post('/filmes', (req, res) => {
    const filme = req.body.filme;
    const id = filmes.length;
    filmes.push(filme);

    res.send(`Filme ${filme} adicionado com sucesso . O ID do filme é ${id}`);
})


app.put('/filmes/:id', (req, res) => { // atualizando filme pelo id usando o app.put
    const id = req.params.id - 1; // id faz request usando o paramento id - 1 
    const filme = req.body.filme; // filme recebe a requisição body do json filme
    const filmeAntigo = filmes[id];
    filmes[id] = filme; // aqui a lista de filmes no id pego recebe a requisição do json com a atualização do novo filme
    res.send(`O filme:  ${filmeAntigo}. foi atualizado para:  ${filme}.`);

});

app.delete('/filmes/:id',(req,res) => {
    const id = req.params.id - 1; 
    const filme = filmes[id];
    if(!filme){ // se id do filme não existir retorna não encontrado e se existir retorna o filme
        res.send('Filme não encontrado');
    }else{
    delete filmes[id];
    res.send("O filme foi excluido")};
});


app.listen(port,function(){ // Listen serve para indicar onde as conexões estão sendo feitas
    console.log(`App rodando na porta http://localhost:${port}/`);
});


