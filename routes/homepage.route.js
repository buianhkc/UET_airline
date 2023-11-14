const express = require('express');
const router = express.Router();

const homePageController = require('../controllers/HomePageController');

router.get('/fromMySql/getbestsellerticket', homePageController.getBestSellerTicket);

router.get('/', homePageController.index);

module.exports = router;