'use strict'
const fs = require('fs')
const path = require('path')

module.exports = async (options) => {

  //options
  const { https, mongoDbOptions, redisDbOptions, port} = options;

  const fastify = require('fastify')({
    http2: true,
    https: https,
    logger: true
  })
  
  fastify.register(require('./events/eventPlugin'), 
    {
      redisDbOptions: redisDbOptions,
      mongoDbOptions: mongoDbOptions
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