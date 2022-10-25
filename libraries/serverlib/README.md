# Using the back-end library

useSubscribe won't work until you pass information about your MongoDB and Redis into a function that opens a web socket and connects everything. Require the module in wherever you instantiate an http server, for example server.js. Feel free to give it a label or to to simply invoke the required-in function with the necessary arguments.

```js
const liveStateDB = require('@livestatedb/server');
liveStateDB(httpServer, databaseInfo);
```
OR
```js
require('@livestatedb/server')(httpServer, databaseInfo);
```

The second paramater, databaseInfo, must be an object with two key-value pairs - these are for passing in information about your MongoDB database and Redis, respectively. The values are both objects that contain connection information for each database. See example below.

```js
const databaseInfo = 
  {
    mongoDbOptions: 
      {
        uri: "mongodb+srv://name:12345678910abcde@cluster0.aabbcc.mongodb.net/?retryWrites=true&w=majority"
      },
    redisDbOptions: 
      {
        host: 'redis-00000.c00.us-east-0-0.ec2.cloud.redislabs.com', 
        port: 15711, 
        password: 'lkajsdf092j3jlsdfmop3jfspdkgpoi',
        family: 4
      },
  }
```