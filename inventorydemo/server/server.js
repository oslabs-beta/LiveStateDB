const express = require('express');
const path = require('path');
const api = require('./routes/api');
const inventory = require('./routes/inventory');
const event = require('./routes/event')
const spdy = require ('spdy');
const fs = require("fs");
const http2 = require('http2');

const PORT = process.env.EXPRESS_PORT || 3000;
const app = express();

app.use(express.json());

// Log all rquests as we build
app.use((req, res, next) => {
  console.log(`server/app.js: received request ${req.method} ${req.url}`);
  next();
});

// Serve the client build
app.use('/build', express.static(path.resolve(__dirname, '../build')));

// Handle router calls
app.use('/api', api);
app.use('/inventory', inventory);

//Server Side Event Handler Test
app.use('/event', event);


// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/', 'index.html'));
});

// Default 404 handler
app.use((req, res) => {
  console.log(`server/app.js: handler not found for request ${req.method} ${req.url}`);
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

const options = {
  key: fs.readFileSync(path.resolve(__dirname, './keys/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, './keys/server.crt')),
}

spdy.createServer(options, 
  app).listen(3000, (err) => {
  if(err){
    console.log('failed to start server')
  }
  console.log('Listening on port 3000')
})

// Fire it up
// app.listen(PORT, () => {
//   console.log(`Express Node server listening on ${PORT}`);
// });
