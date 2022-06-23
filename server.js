const express = require('express');
const cors = require('cors');
const server = express();
const port = 3000;

server.use(cors());
server.use(express.json());

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize('leandro', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('FOII');
}).catch(err => {
    console.log('DEU ERRO: ', err);
});

const User = sequelize.define('users', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobrenome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false
});

server.post('/user', (req, res) => {
    const { nome, sobrenome } = req.body;

    User.create({nome, sobrenome}).then(() => {
        res.json({message: "Success"});
    }).catch(err => {
        res.json({err: "Error"})
    });
});

server.listen(port, async () => {
    await sequelize.sync();
    console.log(`Escutando na porta http://localhost:${port}`)
});