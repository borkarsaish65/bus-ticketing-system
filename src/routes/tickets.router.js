const express = require('express');
const router = express.Router();


const ticketController = require('../controllers/ticketController');

const allRequestMiddlewareErrorHandler = require('../middlewares/allRequestMiddlewareHandler');

router.get('/',allRequestMiddlewareErrorHandler(ticketController.testFunction));

module.exports = router;