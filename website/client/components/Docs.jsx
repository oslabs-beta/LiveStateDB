import React from 'react'
import '../styles/Docs.css';

const Docs = () => {
  return (
    <div className='Docs'>
      {/* <div className='sidebar'>
        Sidebar
      </div> */}
      <div className='documentation-content'>
        <h1>Documentation</h1>
        <div className='documentation-about'>
          <h2>About</h2>
          <p>LiveStateDB is available as an <a href='https://www.npmjs.com/~livestatedb'>npm package</a>.</p>
          <p>LiveStateDB is a database subscription API that enables developers to make state reflect database changes in real time. Developers will have access to a custom hook, <code className='code'>useSubscribe&#40;&#41;</code>, to implement in your front-end codebase, and a back-end library which allows the server to interface with your database. Currently, LiveStateDB only supports MongoDB.</p>
          <p>These libraries can be installed by running <code className='code'>npm/yarn install @livestatedb/client @livestatedb/server</code> respectively.</p>
        </div>

        <div className='documentation-hook'>
          <h2>Using the hook useSubscribe&#40; &#41;</h2>
          <p>First import the module into the file you wish to use it.</p>
          <code className='code'>
            <p>import &#123; useSubscribe &#125; from '@livestatedb/client';</p>
          </code>
          <p>When useSubscribe is called, it will open a web socket through which database updates get passed when changes occur that state is 'subscribed to'.</p>
          <p>useSubscribe takes one argument: an object with three key-value pairs that correspond with the database name, collection name, and query to a database. Here's an example.</p>
          <code className='code'>
            <p>const options = &#123;<br></br>
            &#9;database: 'DBname',<br></br>
            &#9;collection: 'someCollectionName',<br></br>
            &#9;query: &#123;&#125;<br></br>
            &#125;;</p>
          </code>
          <p>useSubscribe returns the way to reference state in your front-end code, and a function that ends that piece of state's subscription to the database.</p>
          <code className='code'>
            <p>const &#91; state, endSubscription &#93; = useSubscribe&#40;options&#41;</p>
          </code>
          <p>See our <a href='https://github.com/oslabs-beta/LiveStateDB'>GitHub</a> for considerations and use case limitations.</p>
        </div>

        <div className='documentation-back-end'>
          <h2>Using the back-end library</h2>
          <p>useSubscribe won't work until you pass information about your MongoDB and Redis into a function that opens a web socket and connects everything. Require the module in wherever you instantiate an http server, for example server.js. Feel free to give it a label or to to simply invoke the required-in function with the necessary arguments.</p>
          <code className='code'>
            <p>const liveStateDB = require&#40;'@livestatedb/server'&#41;;<br></br>
            liveStateDB&#40;httpServer, databaseInfo&#41;;</p>
          </code>
          <p>OR</p>
          <code className='code'>
            <p>require&#40;'@livestatedb/server'&#41;&#40;httpServer, databaseInfo&#41;;</p>
          </code>
          <p>The second paramater, databaseInfo, must be an object with two key-value pairs - these are for passing in information about your MongoDB database and Redis, respectively. The values are both objects that contain connection information for each database. See example below.</p>
          <code className='code'>
            <p>const databaseInfo = &#123;<br></br>
    mongoDbOptions: &#123;<br></br>
        uri: "mongodb+srv://name:12345678910abcde@cluster0.aabbcc.mongodb.net/?retryWrites=true&w=majority"<br></br>
        &#125;,<br></br>
        redisDbOptions: &#123;<br></br>
        host: 'redis-00000.c00.us-east-0-0.ec2.cloud.redislabs.com', <br></br>
        port: 15711, <br></br>
        password: 'lkajsdf092j3jlsdfmop3jfspdkgpoi',<br></br>
        family: 4<br></br>
        &#125;,<br></br>
        &#125;;</p>
          </code>
          <p>That's it! Your front-end will now be able to display or work with the subscribed database data as it updates in real time - regardless of where the change originates from.</p>
          <p>Thanks for your interest in LiveStateDB, and we hope this improves your development experience.</p>
        
        </div>
      </div>
    </div>
  )
}

export default Docs