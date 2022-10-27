const express = require('express');
const path = require('path');
const inventory = require('./routes/inventory');
const fs = require('fs');
const http = require('http');


const PORT = process.env.EXPRESS_PORT || 3000;
const app = express();

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true,
};
const cors = require('cors')(corsOptions);

// Serve the client build
app.use('/website/build', express.static(path.resolve(__dirname, '../website/build')));
app.use('/inventorydemo/build', express.static(path.resolve(__dirname, '../inventorydemo/build')));
app.use('/storedemo/build', express.static(path.resolve(__dirname, '../storedemo/build')));

// Handle router calls
app.use('/inventory', inventory);

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../website/public/', 'index.html'));
});

app.get('/inventorydemo', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../inventorydemo/public/', 'index.html'));
});

app.get('/storedemo', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../storedemo/public/', 'index.html'));
});

// Default 404 handler
app.use((req, res) => {
  res
    .status(404)
    .send(
      'Page not found'
    );
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    message: { err: 'An error occurred' },
    log: 'Express error handler caught unknown middleware error',
    status: 400,
  };
  const errObj = Object.assign(defaultErr, err);
  console.log('ErrorObject Log: ', errObj.log);
  res.status(errObj.status).send(errObj.message);
});

const server = http.Server(app);
server.listen(80, () => console.log('listening on port 80'));

const changeStreamOptions = 
  {
    mongoDbOptions: 
      {
        uri: "mongodb+srv://vividvoltage:coffeeCup@cluster0.ezvco0o.mongodb.net/test"
      },
    redisDbOptions: 
      { host: 'redis-15711.c82.us-east-1-2.ec2.cloud.redislabs.com', 
        port: 15711, 
        password: 'o1dMUq5WaZLQUVvJDCcIJJEfxDCJwTAw',
        family: 4
      },
  }

require('../libraries/serverlib/setupWebsocket')(server, changeStreamOptions)
  .catch(console.error)