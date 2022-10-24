const { MongoClient } = require('mongodb');

async function main() {

    const uri = 'mongodb://localhost:27017';
    // const uri = "mongodb+srv://kevin:yZ3BdpdAgYaCsI6K@cluster0.cf7qs2t.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const dbRes = await client.db('inventoryDemo').collection('inventoryitems').find({}).toArray();
        const dbResObj = {};
        const userSub = [];
        dbRes.forEach(ele => {
          dbResObj[ele._id] = ele
          userSub.push(ele._id)
        })
        console.log('dbResObj', dbResObj);
        console.log('userSub', userSub);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

// Add functions that make DB calls here