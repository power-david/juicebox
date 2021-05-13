// CRUD Web Server

//         HTTP         SQL
// Create   --> POST    --> INSERT
// Retrieve --> GET     --> SELECT
// Update   --> PUT     --> UPDATE
// Delete   --> DELETE  --> DELETE

const PORT = 3000;
const express = require('express');
const server = express();

// const bodyParser = require('body-parser');
// server.use(bodyParser.json());
server.use(express.json());

const morgan = require('morgan');
server.use(morgan('dev'));

server.use((req, res, next) => {
    console.log("<____Body Logger START____>");
    console.log(req.body);
    console.log("<_____Body Logger END_____>");
  
    next();
});

// server.get('/', (req, res, next) => {
//     res.send("Alex hearts Brian");
// })

server.use('/api', (req, res, next) => {
    console.log("A request was made to /api");
    next();
  });

server.get('/api', (req, res, next) => {
    console.log("A get request was made to /api (this is the middleware.)");
    res.send({ message: "success" });
  });

const apiRouter = require('./api');
server.use('/api', apiRouter);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});