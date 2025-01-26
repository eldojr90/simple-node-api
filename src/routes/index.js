const express = require('express');
const router = express.Router();
const {
  createPersonController,
  peopleController,
  personController,
  updatePersonController,
  deletePersonController,
} = require('../controller');

// CREATE
router.post('/create', createPersonController);

// READ
router.get('/', peopleController);

router.post('/', personController);

// UPDATE
router.put('/:id', updatePersonController);

// DELETE
router.delete('/:id', deletePersonController);

module.exports = router;
