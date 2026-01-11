const eventRepository = require('../repositories/EventRepository');

class EventModule {
    async getAllEvents() {
        return eventRepository.findAll();
    }

    async getEventById(id) {
        return eventRepository.findById(id);
    }

    async createEvent(eventData) {
        return eventRepository.create(eventData);
    }

    async updateEvent(id, eventData, userId) {
        const event = await eventRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.organizer.toString() !== userId.toString()) {
            throw new Error('Not authorized to update this event');
        }
        return eventRepository.update(id, eventData);
    }

    async deleteEvent(id, userId) {
        const event = await eventRepository.findById(id);
        if (!event) {
            throw new Error('Event not found');
        }
        if (event.organizer.toString() !== userId.toString()) {
            throw new Error('Not authorized to delete this event');
        }
        return eventRepository.delete(id);
    }
}

module.exports = new EventModule();
