const express = require('express');
const app = express();
const PORT = 3001;
const fs = require('fs');


app.get('/', (req, res) => {
    res.send('Servidor da API de estoque está rodando com sucesso!');
});

function lerProdutos(){
    const dados = fs.readFileSync('produtos.json', 'utf-8');

    return JSON.parse(dados);
};

app.get('/produtos', (req, res) => {
    const produtos = lerProdutos();
    res.JSON(produtos);
});

app.post('/produtos', (req, res) => {

    const { nome, descricao, preco, quantidade, categoria } = req.body;
    const produtos = lerProdutos();
    const novo = { id: produtos.length+1, nome, descricao, preco, quantidade, categoria };

    produtos.push(novo);

    fs.writeFileSync('produtos.json', JSON.stringify(produtos, null, 2));

    res.status(201).json(novo);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});