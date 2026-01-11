const eventModule = require('../modules/EventModule');
const notificationModule = require('../modules/NotificationModule');

class EventAppModule {
    async listEvents() {
        return eventModule.getAllEvents();
    }

    async createEvent(eventData, userId) {
        return eventModule.createEvent({ ...eventData, organizer: userId });
    }

    async updateEvent(id, eventData, userId) {
        const updatedEvent = await eventModule.updateEvent(id, eventData, userId);

        // Trigger background task for event update notification
        await notificationModule.queueEventUpdateNotification({
            eventId: updatedEvent._id,
            eventTitle: updatedEvent.title
        });

        return updatedEvent;
    }

    async deleteEvent(id, userId) {
        return eventModule.deleteEvent(id, userId);
    }
}

module.exports = new EventAppModule();
