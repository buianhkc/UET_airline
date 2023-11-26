const express = require('express');
const router = express.Router();

const seatOrderController = require('../controllers/SeatOrderController');

router.get('/', seatOrderController.index);

module.exports = router;