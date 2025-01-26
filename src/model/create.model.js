const { insertOne } = require('../lib');

module.exports = (person) => insertOne('people', person);
