const { updateOneModel } = require('../model');

module.exports = async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
  const { acknowledged } = await updateOneModel({ id }, fields);

  if (acknowledged) {
    return res.json({ msg: 'Updated' });
  }

  return res.status(400).end();
};
