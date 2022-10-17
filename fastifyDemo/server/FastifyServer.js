//initalize stateServer 
const fs = require('fs');
const path = require('path');
const stateServer = require('./FastifyLaunch');
const stateServerOptions = 
  {
    https: {
      allowHTTP1: true,
      key: fs.readFileSync(path.resolve(__dirname, './keys/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './keys/server.crt')),
    },
    mongoDbOptions: 
      {
        uri: "mongodb+srv://kevin:yZ3BdpdAgYaCsI6K@cluster0.cf7qs2t.mongodb.net/?retryWrites=true&w=majority"
      },
    redisDbOptions: 
      { host: 'redis-12753.c84.us-east-1-2.ec2.cloud.redislabs.com', 
        port: 12753, 
        password: 'YET7NOQHLnHgL9Yrktjz5Czb8rQL1ezH',
        family: 4
      },
    port: 3001
  }


stateServer(stateServerOptions);
