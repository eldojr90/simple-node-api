const { findOne } = require('../lib');

module.exports = (filter) => findOne('people', filter);
