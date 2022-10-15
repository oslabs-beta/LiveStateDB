'use strict'
const fs = require('fs')
const path = require('path')
const fastifyStatic = require('@fastify/static')
const errorCodes = require('fastify').errorCodes

module.exports = async (options) => {

  //options
  const { https, mongoDbOptions, redisDbOptions, port} = options;

  const fastify = require('fastify')({
    http2: true,
    https: https,
    logger: true
  })

  // what is event plugin?
  fastify.register(require('./serverlib/events/eventPlugin'), 
    {
      redisDbOptions: redisDbOptions,
      mongoDbOptions: mongoDbOptions
    })

  
  fastify.register(require('./plugins/inventoryRoutes'))

  //  * register & serve static files

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, '../inventorydemo/build/bundle'),
    prefix: '/build', // optional: default '/'
  })

  // fastify.get('/build', (request, reply) => {
  //   reply.sendFile('bundle.js')
  // })

  fastify.register(fastifyStatic,{
    root: path.join(__dirname, '../../inventorydemo/public/'),
    decorateReply: false
  })

  // fastify.get('/', (request, reply) => {
  //   reply.sendFile('index.html')
  // })

  // * global error handler
  fastify.setErrorHandler(function (error, request, reply) {
    if (error instanceof fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
      // Log error
      this.log.error(error)
      // Send error response
      reply.status(500).send({ ok: false })
    }
  })
  

  fastify.listen({ port: port}, function (err, address) {
    if (err) {
      fastify.log.error(err)
      console.log(err);
      process.exit(1)
    }
    console.log(`Server is now listening on ${address}`)
  })
}