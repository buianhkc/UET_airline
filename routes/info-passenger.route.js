const express = require('express');
const router = express.Router();

const infoPassengerController = require('../controllers/InfoPassengerController');

router.get('/', infoPassengerController.index);
router.post('/getQuantityPersonOrder', infoPassengerController.getQuantityPersonOrder);
router.post('/backToBookingPage', infoPassengerController.backToBookingPage);
router.post('/getOrderDetails', infoPassengerController.getOrderDetails);

module.exports = router;