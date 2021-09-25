/* eslint-disable @typescript-eslint/no-var-requires */
const { MongoClient } = require('mongodb');

const uri = 'mongodb://local:localdba@0.0.0.0:27017';
const client = new MongoClient(uri);

module.exports.client = client;
module.exports.db = 'local';
