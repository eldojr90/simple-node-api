const { findByFilterModel } = require('../model');

module.exports = async (req, res) => {
  const filter = req.body;
  const people = await findByFilterModel(filter);
  const statusToReturn = people ? 200 : 404;
  return res.status(statusToReturn).json(people ?? { msg: 'not found' });
};
