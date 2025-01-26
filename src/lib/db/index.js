const { MongoClient } = require('mongodb');
const { v4: uuid } = require('uuid');
const { MONGODB_URI, MONGODB_DATABASE_NAME } = require('../../../config.json');

let cacheDB = null;

const connect = async () => {
  if (!cacheDB) {
    const client = await MongoClient.connect(MONGODB_URI);
    cacheDB = client.db(MONGODB_DATABASE_NAME);
  }
};

const collection = async (collectionName) => {
  await connect();
  return cacheDB.collection(collectionName);
};

const insertOne = async (collectionName, document) => {
  const coll = await collection(collectionName);
  return coll.insertOne({ id: uuid(), ...document });
};

const findOne = async (collectionName, filter) => {
  const coll = await collection(collectionName);
  return coll.findOne(filter);
};

const findAll = async (
  collectionName,
  filter = {},
  sortReturn = { _id: -1 }
) => {
  const coll = await collection(collectionName);
  return coll.find(filter).sort(sortReturn).toArray();
};

const updateOne = async (collectionName, filter, fields) => {
  const coll = await collection(collectionName);
  return coll.updateOne(filter, { $set: fields });
};

const deleteOne = async (collectionName, filter) => {
  const coll = await collection(collectionName);
  return coll.deleteOne(filter);
};

module.exports = {
  insertOne,
  findOne,
  findAll,
  updateOne,
  deleteOne,
};
