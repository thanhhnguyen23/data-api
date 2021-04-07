const express = require('express');

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
    console.log('Server is running');
})