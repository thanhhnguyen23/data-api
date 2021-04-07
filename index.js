const express = require('express');

const app = express();


app.get('/hello', (req, res) => {
    res.status(200).send('hello');

});

app.listen({ port: 8080 }, () => {
    console.log('Server is running');
})