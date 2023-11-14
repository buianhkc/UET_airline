const express = require('express');
const router = express.Router();

const registerPageController = require('../controllers/RegisterPageController');

router.get('/', registerPageController.index);
router.post('/', registerPageController.register);

module.exports = router;