const express = require('express');
const router = express.Router();

const userPageController = require('../controllers/UserPageController');

router.get('/', userPageController.index);
router.post('/deposit', userPageController.deposit)
router.post('/getTicket', userPageController.getTicket)
router.post('/payticket', userPageController.payTicket)
router.post('/deleteticket', userPageController.deleteTicket)
router.post('/getBalance', userPageController.getBalance)
module.exports = router;