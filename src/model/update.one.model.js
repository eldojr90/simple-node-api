const { updateOne } = require('../lib');

module.exports = (filter, fields) => updateOne('people', filter, fields);
