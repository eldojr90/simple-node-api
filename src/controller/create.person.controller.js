const { createModel } = require('../model');

module.exports = async (req, res) => {
  const person = req.body;

  const { acknowledged } = await createModel(person);

  const statusToReturn = acknowledged ? 201 : 400;
  
  return res.status(statusToReturn).end();
};
