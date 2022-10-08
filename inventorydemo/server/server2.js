'use strict'
const fs = require('fs')
const path = require('path')


// const middie = require('@fastify/middie')

// async function build () {
//   const fastify = require('fastify')({
//     http2: true,
//     https: {
//       key: fs.readFileSync(path.resolve(__dirname, './keys/server.key')),
//       cert: fs.readFileSync(path.resolve(__dirname, './keys/server.crt')),
//     }
//   })
//   await fastify.register(require('@fastify/middie'));
//   await fastify.register(middie);
//   return fastify;
// }

// build()
//   .then(fastify => fastify.listen({ port: 3000 }))

// // middie.use('/', (request, reply) => {
// //   reply.code(200).send({ hello: 'world' })
// // })

// fastify.listen({ port: 3000 })

const fastify = require('fastify')({
    http2: true,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, './keys/server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './keys/server.crt')),
    },
    logger: true
  })

  
  fastify.register(require('./plugins/eventRoutes'))

  fastify.listen({ port: 3001 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      console.log(err);
      process.exit(1)
    }
    console.log(`Server is now listening on ${address}`)
  })
