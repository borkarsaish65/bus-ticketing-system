const express = require('express');
const router = express.Router();


const ticketController = require('../controllers/ticketController');

const allRequestMiddlewareErrorHandler = require('../middlewares/allRequestMiddlewareHandler');

router.get('/view-tickets',allRequestMiddlewareErrorHandler(ticketController.viewTickets));
router.get('/view-ticket/:ticket_id',allRequestMiddlewareErrorHandler(ticketController.viewSingleTicket));
router.post('/update-ticket/:ticket_id',allRequestMiddlewareErrorHandler(ticketController.updateTicketStatus));
router.post('/login',allRequestMiddlewareErrorHandler(ticketController.userLogin));

module.exports = router;