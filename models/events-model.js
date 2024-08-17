// /models/eventModel.js

let events = [];

module.exports = {
    getAllEvents: () => events,
    findEventById: (id) => events.find(event => event.id === id),
    addEvent: (event) => events.push(event),
    updateEvent: (id, updatedEvent) => {
        const index = events.findIndex(event => event.id === id);
        if (index !== -1) {
            events[index] = { ...events[index], ...updatedEvent };
            return true;
        }
        return false;
    },
    deleteEvent: (id) => {
        const index = events.findIndex(event => event.id === id);
        if (index !== -1) {
            events.splice(index, 1);
            return true;
        }
        return false;
    }
};
