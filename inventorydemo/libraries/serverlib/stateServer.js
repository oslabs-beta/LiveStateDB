'use strict'
const fs = require('fs')
const path = require('path')
const Redis = require('ioredis')
const connectToMongoDb = require('./mongoDb/mongoConnection')


module.exports = async (changeStreamOptions) => {
  const { mongoDbOptions, redisDbOptions } = changeStreamOptions;
 
  try {
  const redis = new Redis(redisDbOptions);
} catch (err) {
  if (err) {
    console.log(`Error occured when connecting to Redis.  errName: ${err.name}, errMessage: ${err.message}, errStack: ${err.stack}`)
  } else {
    let redisError = new Error('An error occured when connecting to Redis')
    console.log(redisError)
  }
}
try {
  const client = await connectToMongoDb(mongoDbOptions.uri)
  } catch (err) {
    if (err) {
      console.log(`Error occured when connecting to MongoDB.  errName: ${err.name}, errMessage: ${err.message}, errStack: ${err.stack}`)
    } else {
      let mongoDbError = new Error('An error occured when connecting to MongoDB')
      console.log(mongoDbError)
    }
  }

  return {redis, client}
}