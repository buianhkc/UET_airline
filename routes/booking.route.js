const express = require('express');
const router = express.Router();

const bookingPageController = require('../controllers/BookingPageController');

router.get('/', bookingPageController.index);
router.post('/book-ticket', bookingPageController.book);
router.post('/getOrderNumber', bookingPageController.getOrderNumber);

module.exports = router;