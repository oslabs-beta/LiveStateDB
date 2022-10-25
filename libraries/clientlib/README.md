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

_**NOTE!**_<br>
useSubscribe will only receive updates from the database that match the options passed-in _at the time it was called_. If a database change occurs that would match the query parameters, it will not automatically be included in what useSubscribe is subscribed to. You would need to re-render the page to call useSubscribe again to capture this.

Additionally, your query filter parameters should be constant. For example, if you are building a dashboard for managing inventory, your filter parameters could include condition: (new, like new, fair, poor), but should not include parameters such as quantity: (>50, <=50). In this example, if you wanted to be subscribed to data that had a certain quantity, you would need write your options object, and specifically your query parameters, to include all of the data you're interested in, regardless of quantity. You would then be able to filter out only the data you're interested in in your front-end codebase.