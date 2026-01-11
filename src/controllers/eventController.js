const eventAppModule = require('../appModules/EventAppModule');

const getEvents = async (req, res) => {
    try {
        const events = await eventAppModule.listEvents();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createEvent = async (req, res) => {
    try {
        const event = await eventAppModule.createEvent(req.body, req.user._id);
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await eventAppModule.updateEvent(req.params.id, req.body, req.user._id);
        res.json(updatedEvent);
    } catch (error) {
        res.status(error.message.includes('authorized') ? 403 : 500).json({ message: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        await eventAppModule.deleteEvent(req.params.id, req.user._id);
        res.json({ message: 'Event removed' });
    } catch (error) {
        res.status(error.message.includes('authorized') ? 403 : 500).json({ message: error.message });
    }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
