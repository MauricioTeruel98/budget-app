require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { databaseService } = require('./services/databaseServices');

const app = express();

app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


require('./routes')(app,databaseService());

app.listen(3200, function() {
    console.log("App listening on port 3200");
});