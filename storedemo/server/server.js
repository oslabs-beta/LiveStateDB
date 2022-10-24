const express = require('express');
const path = require('path');
const inventory = require('./routes/inventory');
const fs = require('fs')

//initalize stateServer
const stateServer = require('./serverlib/stateServer');
const stateServerOptions = 
  {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './keys/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './keys/server.crt')),
    },
    mongoDbOptions: 
      {
        uri: "mongodb+srv://kevin:yZ3BdpdAgYaCsI6K@cluster0.cf7qs2t.mongodb.net/?retryWrites=true&w=majority"
      },
    redisDbOptions: 
      { host: 'redis-15711.c82.us-east-1-2.ec2.cloud.redislabs.com', 
        port: 15711, 
        password: 'o1dMUq5WaZLQUVvJDCcIJJEfxDCJwTAw',
        family: 4
      },
    port: 3005
  }

stateServer(stateServerOptions);

const PORT = process.env.EXPRESS_PORT || 3004;
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
app.use('/inventory', inventory);

//Server Side Event Handler Test
// app.use('/event', event);


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



// Fire it up
app.listen(PORT, () => {
  console.log(`Express Node server listening on ${PORT}`);
});
