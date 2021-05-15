// CRUD Web Server

//         HTTP         SQL
// Create   --> POST    --> INSERT
// Retrieve --> GET     --> SELECT
// Update   --> PUT     --> UPDATE
// Delete   --> DELETE  --> DELETE

const { PORT = 3000 } = process.env;
// const port = process.env.PORT || 3000;

const express = require('express');
const server = express();

// const bodyParser = require('body-parser');
server.use(express.json());

const morgan = require('morgan');
server.use(morgan('dev'));

require("dotenv").config()

server.use((request, response, next) =>{
    console.log("<_____ Body Logger START_____>");
    console.log(request.body);
    console.log("<_____ Body Logger END_____>");

    next();
});

const { client } = require('./db');
client.connect();

const apiRouter = require('./api');
server.use('/api', apiRouter);

// server.get('/', (request, response, next) => {
//     response.send("Alex + Mom");
// })

// server.use('/api', (request, response, next) => {
//     console.log("A request was made to /api (this is the middleware).");
//     next();
// });

// server.get('/api', (request, response, next) => {
//   console.log("A get request was made to /api");
//   response.send({message: "success"});
// });

// server.post('/api/burrito', (request, response, next) => {
//     response.send({message: "Carne Asada con Salsa"});
// });

server.listen(PORT, () => {
  console.log('The server is up on port', PORT);
});