const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

let db = null;
const url = 'mongodb://localhost:27017';
const dbName = 'RestAPIdb';
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//conexão com o mongodb
MongoClient.connect(url, {useNewUrlParser: true}, (error, client) => {
    if(error) {
        console.log('ERRO de conexão:', error); 
        return false;
    }

    console.log('Banco de dados conectado com sucesso');
    db = client.db(dbName);
});

app.listen(port, () => {
    console.log(`Rodando na porta ${port}` );
});

function getCode() {
    try {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();
        const values = year+''+month+''+day+''+hours+''+minutes+''+seconds+''+milliseconds
        const result = Number(parseFloat(Number(values)).toFixed(0))
        return result;
    } catch (error) {
        console.log({erro: error});
        return 0;
    }
}

app.get('/', (req, res) => {
    try {
        res.send({resposta: 'Seja muito bem vindo a nossa RESTful API com NodeJS.'})
    } catch (error) {
        console.log({erro: error});
    }
});

app.get('/pessoas', (req, res) => {
    try {
        const collection = db.collection('pessoas');
        collection.find().toArray((error, pessoas) => {
            res.send({pessoas});
        });
    } catch (error) {
        console.log({erro: error});
    }
});

app.post('/pessoas/insert', (req, res) => {
    try {
        let objJSON = {};
        const pessoas = db.collection('pessoas');

        if(req.body.codigo) objJSON.codigo = Number(req.body.codigo);
        else objJSON.codigo = getCode();

        if(req.body.nome) objJSON.nome = req.body.nome.toString().trim();
        else objJSON.nome = 'Anônimo';

        if(req.body.idade) objJSON.idade = Number(req.body.idade);
        else objJSON.idade = 18;

        if(req.body.email) objJSON.email = req.body.email.toString().trim();
        else objJSON.email = '';

        pessoas.insertOne(objJSON, (error, pessoa) => {
            if(error) res.send({ error: error});

            res.send(pessoa);
        });

    } catch (error) {
        console.log({erro: error});
    }
});

app.get('/pessoas/find/:codigo', (req, res) => {
    try {
        let codigo = 0;
        const pessoas = db.collection('pessoas');
        if(req.params.codigo) codigo = Number(req.params.codigo);

        pessoas.findOne({codigo: codigo}, (error, pessoa) => {
            if(error) res.send({ error: error});

            res.send(pessoa);
        });
        
        
    } catch (error) {
        const err = {erro: error};
        console.log(err);
        res.send(err);
    }
});

app.delete('/pessoas/delete/:codigo', async (req, res) => {
    try {
        let codigo = 0;
        const pessoas = db.collection('pessoas');
        if(req.params.codigo) codigo = Number(req.params.codigo);

        const pessoa = await pessoas.findOne({codigo: codigo});

        if(!pessoa) res.send({error: 'Pessoa inexistente'});

        pessoas.deleteOne({_id: pessoa._id}, (error) => {
            if(error) res.send({ error: error});

            res.send({ message: 'Pessoa exlcuída com sucesso'});
        });
        
        
    } catch (error) {
        const err = {erro: error};
        console.log(err);
        res.send(err);
    }
});

app.put('/pessoas/update/:codigo', async (req, res) => {
    try {
        let codigo = 0;
        const pessoas = db.collection('pessoas');
        if(req.params.codigo) codigo = Number(req.params.codigo);

        const pessoa = await pessoas.findOne({ codigo: codigo});
        
        if(!pessoa) res.send({error: 'Pessoa inexistente'});

        pessoas.updateOne({_id: pessoa._id}, { '$set': req.body }, (error) => {
            if(error) res.send({error: error});

            res.send({ message: 'Pessoa alterada com sucesso!'});
        });
        
        
    } catch (error) {
        const err = {error: error};
        console.log(err);
        res.send(err);
    }
});
