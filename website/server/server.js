const express = require('express');
const path = require('path');
const fs = require('fs');
const http = require('http');
const https = require('https');


const PORT = process.env.EXPRESS_PORT || 3000;
const app = express();

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true,
};
const cors = require('cors')(corsOptions);

// app.enable('trust proxy')
// app.use((req, res, next) => {
//     req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })

// Serve the client build
app.use('/build', express.static(path.resolve(__dirname, '../build')));
// app.use('/inventorydemo/build', express.static(path.resolve(__dirname, '../inventorydemo/build')));
// app.use('/storedemo/build', express.static(path.resolve(__dirname, '../storedemo/build')));

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/', 'index.html'));
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


