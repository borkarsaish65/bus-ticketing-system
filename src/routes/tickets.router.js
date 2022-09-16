const express = require('express');
const router = express.Router();


const ticketController = require('../controllers/ticketController');
const auth = require('../middlewares/auth.middleware');

const allRequestMiddlewareErrorHandler = require('../middlewares/allRequestMiddlewareHandler');

router.get('/view-tickets/:user_id',auth(),allRequestMiddlewareErrorHandler(ticketController.viewTickets));
router.get('/view-ticket/:user_id/:ticket_id',auth(),allRequestMiddlewareErrorHandler(ticketController.viewSingleTicket));
router.get('/view-user-details/:user_id/:ticket_id',auth(),allRequestMiddlewareErrorHandler(ticketController.viewUserDetailsOnTicketId));
router.post('/update-ticket/:user_id/:ticket_id',auth(),allRequestMiddlewareErrorHandler(ticketController.updateTicketStatus));
router.post('/reset-all-tickets/:user_id',auth(['admin']),allRequestMiddlewareErrorHandler(ticketController.resetAllTickets));
router.post('/login',allRequestMiddlewareErrorHandler(ticketController.userLogin));

module.exports = router;