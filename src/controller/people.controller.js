const { findAllModel } = require('../model');

module.exports = async (req, res) => {
  const filter = req.body;
  const people = await findAllModel(filter);
  return res.json(people);
};
