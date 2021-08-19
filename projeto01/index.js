const express = require('express'); // importação do express
const app = express(); // Instanciando app recebendo express

const port = 3000; // porta de serviço que utilizamos

const filmes = [ // criando uma lista de filmes
    'Matrix',
    'Mortal Kombat',
    'As Branquelas',
    'Jhon Wick',
    'Vingadores',
];

// GET /Home Rota principal onde exibira o titulo
app.get('/', (req, res) =>{
    res.send('Bem vindos ao site Sessão da Tarde');
});

app.get('/filmes', (req, res) =>{ // Rota que exibi a lista de filmes criada usando lista anteriormente
    res.send(filmes);
});

app.get('/filmes/:id', (req, res) =>{ // pegando um filme pelo id e exibindo na tela
    const id = req.params.id -1;
    const filme = filmes[id];
    res.send(filme);
});

app.listen(port, () =>{ // Porta que está sendo 'Escutada'
    console.info(`App esta rodando em: http://localhost:${port}/`); // exibe a info na tela que esta rodando o app na porta configurada no inicio do código
});