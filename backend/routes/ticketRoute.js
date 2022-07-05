const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware');
const {getTickets,createTicket, getTicket, updateTicket, deleteTicket} = require('../controllers/ticketController')
const noteRouter = require('./notesRoute');

//Re-route into note router
router.use('/:ticketId/notes', noteRouter);
router.route('/').get(protect, getTickets).post(protect, createTicket);

router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket)


module.exports = router