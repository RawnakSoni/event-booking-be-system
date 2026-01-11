const Event = require('../models/Event');

class EventRepository {
    async findAll() {
        return Event.find({}).populate('organizer', 'name email');
    }

    async findById(id) {
        return Event.findById(id);
    }

    async create(eventData) {
        return Event.create(eventData);
    }

    async update(id, eventData) {
        return Event.findByIdAndUpdate(id, eventData, { new: true });
    }

    async delete(id) {
        return Event.findByIdAndDelete(id);
    }
}

module.exports = new EventRepository();
