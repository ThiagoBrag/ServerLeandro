const express = require('express');
const cors = require('cors');
const server = express();
const port = 3000;

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('leandro', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('FOII');
}).catch(err => {
    console.log('DEU ERRO: ', err);
});

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.json({message: '/Home'})
});

server.listen(port, () => {
    console.log(`Escutando na porta http://localhost:${port}`)
});