const express = require('express');
const router = express.Router();

const loginPageController = require('../controllers/LoginPageController');

router.get('/', loginPageController.index);

module.exports = router;