const express = require('express');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

const app = express();
app.use(express.json());

const dataList = [];

app.get('/hello', (req, res) => {
    res.status(200).send(dataList);

});

app.post('/data', (req, res) => {
    let data = req.body;
    dataList.push(data);
    res.status(201).send(data);

});
app.listen({ port: 8080 }, () => {
    try{
        sequelize.authenticate();
        console.log('Connected to database')
    }
    catch(error){
        console.log('Could not connected to database', error)
    }
    console.log('Server is running');
})