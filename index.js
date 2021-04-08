const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const helmet = require('helmet');
const compression = require('compression');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions:{
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const SensorData = sequelize.define('sensor-data', {
    serial: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    temperature: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

const app = express();
app.use(helmet());
app.use(compression());
app.use(express.json());

const dataList = [];

app.get('/data', async (req, res) => {
    const allData = await SensorData.findAll();
    res.status(200).send(dataList);
    return;

});

app.post('/data', async (req, res) => {
    let data = req.body;
    const sensorData = await SensorData.create(data);
    dataList.push(data);
    res.status(201).send(sensorData);
    return;

});
app.listen({ port: 8080 }, () => {
    try{
        sequelize.authenticate();
        console.log('Connected to database')

        sequelize.sync({ alter: true });
        console.log('Sync to database')
    }
    catch(error){
        console.log('Could not connected to database', error)
    }
    console.log('Server is running');
})