'use strict'
const fs = require('fs')
const path = require('path')
const Redis = require('ioredis')
const connectToMongoDb = require('./mongoDb/mongoConnection')


module.exports = async (changeStreamOptions) => {
  const { mongoDbOptions, redisDbOptions } = changeStreamOptions;
  const redis = new Redis(redisDbOptions);
  const client = await connectToMongoDb(mongoDbOptions.uri)
  return {redis, client}
}