const { deleteOne } = require('../lib');

module.exports = (filter) => deleteOne('people', filter);
