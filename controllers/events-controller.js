const eventModel = require('../models/events-model');

// Create Event
const createEvent = async (req, res) => {
    const { date, time, description, participants } = req.body;

    const newEvent = {
        id: eventModel.getAllEvents().length + 1,
        date,
        time,
        description,
        participants: participants || []
    };

    console.log('newEvent', newEvent);

    eventModel.addEvent(newEvent);
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
};

// Get All Events
const getAllEvents = async (req, res) => {
    const events = eventModel.getAllEvents();
    res.status(200).json(events);
};

// Get Event by ID
const getEventById = async (req, res) => {
    const { id } = req.params;
    const event = eventModel.findEventById(parseInt(id));

    if (!event) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event);
};

// Update Event
const updateEvent = async (req, res) => {
    const { id } = req.params;
    const updatedEvent = req.body;

    const success = eventModel.updateEvent(parseInt(id), updatedEvent);

    if (!success) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.status(204).json({ message: 'Event updated successfully' });
};

// Delete Event
const deleteEvent = async (req, res) => {
    const { id } = req.params;

    const success = eventModel.deleteEvent(parseInt(id));

    if (!success) {
        return res.status(404).json({ message: 'Event not found' });
    }

    res.status(204).json({ message: 'Event deleted successfully' });
};

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent };
