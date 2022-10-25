# Using the hook useSubscribe( )

First import the module into the file you wish to use it.

```js
import { useSubscribe } from '@livestatedb/client';
```

When useSubscribe is called, it will open a web socket through which database updates get passed when changes occur that state is 'subscribed to'.

useSubscribe takes one argument: an object with three key-value pairs that correspond with the database name, collection name, and query to a database. Here's an example.

```js
const options = {
  database: 'DBname',
  collection: 'someCollectionName',
  query: {}
};
```

useSubscribe returns the way to reference state in your front-end code, and a function that ends that piece of state's subscription to the database.

```js
const [ state, endSubscription ] = useSubscribe(options);
```