'use strict'
async function routes (fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/test',
        // this function is executed for every request before the handler is executed,
    preHandler: async (request, reply) => {
      // E.g. check authentication
    },
    handler: async (request, reply) => {
      //const dbRes = called a db function here 
      //send the result
      reply.send( request.query )
    }
  })

  fastify.route({
    method: 'GET',
    url: '/'
  })

}

module.exports = routes;