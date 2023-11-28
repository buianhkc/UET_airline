const express = require('express');
const router = express.Router();

const infoPassengerController = require('../controllers/InfoPassengerController');

router.get('/', infoPassengerController.index);
router.post('/getQuantityPersonOrder', infoPassengerController.getQuantityPersonOrder);
router.post('/getOrderDetails', infoPassengerController.getOrderDetails);
router.post('/insertInfoPassenger', infoPassengerController.insertInfoPassenger);

module.exports = router;