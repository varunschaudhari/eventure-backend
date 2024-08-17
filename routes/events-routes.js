const express = require('express');
const eventController = require('../controllers/events-controller');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

console.log('aaaaaaaaaa in routes');

// Only organizers can create, update, or delete events
router.route('/createEvent').post(eventController.check); // Route to create an event

router.route('/events/:id')
    .put(authMiddleware.verifyOrganizer, eventController.updateEvent) // Route to update an event by ID
    .delete(authMiddleware.verifyOrganizer, eventController.deleteEvent) // Route to delete an event by ID
    .get(authMiddleware.verifyToken, eventController.getEventById); // Route to get an event by ID

// Both organizers and attendees can view all events
router.route('/events')
    .get(authMiddleware.verifyToken, eventController.getAllEvents); // Route to get all events

module.exports = router;
