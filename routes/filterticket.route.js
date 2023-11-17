const express = require('express');
const router = express.Router();

const filterTicketController = require('../controllers/FilterTicketController');

router.get('/', filterTicketController.index);
router.get('/getdata', filterTicketController.filter);

module.exports = router;