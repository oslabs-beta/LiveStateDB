'use strict'
const fastify = require('fastify')()
const errorCodes = require('fastify').errorCodes
const Inventory = require('../models/inventoryModel');
// const client = require('../controllers/dbConnection');
// const connectToMongoDb = require('../mongoDb/mongoConnection')

async function inventoryRoutes (fastify, options) {
  
      const changeSchema = {
            schema: {
                body: {
                    id: { type: 'string' },
                    field: { type: 'string' },
                    value: { type: 'number' },
                    
                }
            }
        }    

fastify.patch('/inventory/changeSingleField', changeSchema, async function (request, reply) {
  console.log('patch body', request.body)
  
  const { id, field, value } = request.body;
  // const Inventory = this.mongo.client.db('inventoryDemo').collection('inventoryitems')
  
  const updateObj = {}
  updateObj.$inc = {};
  updateObj.$inc[field] = value;

  console.log('updateObj: ', updateObj);
  try {
  const dbRes = await Inventory.updateOne(
    { _id: id },
    updateObj);
  } catch (error) {
    console.log('patch error', error)
  }
    reply.code('error').send(dbRes);
})

fastify.get('/inventory/getOne/:id', async function (request, reply) {
  console.log('get params', request.params)
  
  const { id } = request.params;
  // const Inventory = this.mongo.client.db('inventoryDemo').collection('inventoryitems')
  
  try {
  const dbRes = await Inventory.find({ _id: id});
  } catch {
    console.log('patch error', error)
  }
  reply.code('error').send(dbRes)

}) 


// this works when tested from backend, but isn't currently being used by FE
fastify.get('/inventory/all', async function (request, reply) {
  const Inventory = this.mongo.client.db('inventoryDemo').collection('inventoryitems')
  const data = await Inventory.find({}).toArray()
  reply.send(data);
})

// stopped writing b/c not being used by FE
// const createSchema = {
//     schema: {
//         querystring: {
//             item: { type: 'string' },
//             quantity: { type: 'number' },
//             price: { type: 'number' },
//             description: { type: 'string' }
//         }
//     }
// }

// fastify.post('/create', createSchema, async function (request, reply) {
//   const { item, quantity, description, price } = req.body;
//   const dbRes = await Inventory.create(
//     { item: item,
//       quantity: quantity,
//       price: price,
//     description: description, 
//       });
// })

}

module.exports = inventoryRoutes;