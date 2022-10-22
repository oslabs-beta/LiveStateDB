'use strict'
const fs = require('fs')
const path = require('path')
const Redis = require('ioredis')
const connectToMongoDb = require('./mongoDb/mongoConnection')


module.exports = async (changeStreamOptions) => {
  const { mongoDbOptions, redisDbOptions } = changeStreamOptions;
 
  try {
  const redis = new Redis(redisDbOptions);
  const client = await connectToMongoDb(mongoDbOptions.uri)
  
  return {redis, client}
  } catch (err) {

    if (err) {
      console.log(`Error occured when connecting to MongoDB or Redis.  errName: ${err.name}, errMessage: ${err.message}, errStack: ${err.stack}`)

    } else {
      let dbError = new Error('An unknown error occured when connecting to MongoDB or Redis')
      console.log(dbError)
    }
  }
}