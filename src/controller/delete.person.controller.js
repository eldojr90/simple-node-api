const { deleteOneModel } = require('../model');

module.exports = async (req, res) => {
  const filter = req.params;
  const { acknowledged } = await deleteOneModel(filter);

  if (acknowledged) {
    return res.json({ msg: 'Removed' });
  }

  return res.status(400).end();
};
