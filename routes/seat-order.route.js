const express = require('express');
const router = express.Router();

const seatOrderController = require('../controllers/SeatOrderController');

router.get('/', seatOrderController.index);
router.post('/getOrderdetails', seatOrderController.getOrderDetails);
router.post('/getAllSeat', seatOrderController.getAllSeat);
router.post('/addSeatOrder', seatOrderController.addSeatOrder);

module.exports = router;