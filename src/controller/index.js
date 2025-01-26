const createPersonController = require('./create.person.controller.js');
const peopleController = require('./people.controller');
const personController = require('./person.controller.js');
const updatePersonController = require('./update.person.controller.js')
const deletePersonController = require('./delete.person.controller.js')

module.exports = {
  createPersonController,
  peopleController,
  personController,
  updatePersonController,
  deletePersonController,
};
