const { findAll } = require('../lib');

module.exports = (filter) => findAll('people', filter, { name: 1 });
