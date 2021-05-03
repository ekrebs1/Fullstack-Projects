require('dotenv').config();

const { PORT = 3000 } = process.env;
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const apiRouter = require('./api');

//Middleware
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use('/api', apiRouter);


//connects to client
const { client } = require('./db');
client.connect();

server.get("/", (req, res) => {
  res.send("hello world");
});



server.listen(PORT, () => {
  console.log('The server is up on port', PORT)
});


