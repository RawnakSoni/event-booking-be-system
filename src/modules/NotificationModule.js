const { emailQueue } = require('../workers/emailQueue');

class NotificationModule {
    async queueBookingConfirmation(data) {
        return emailQueue.add('bookingConfirmation', data);
    }

    async queueEventUpdateNotification(data) {
        return emailQueue.add('eventUpdate', data);
    }

    async queueIndividualEmail(data) {
        return emailQueue.add('sendIndividualEmail', data);
    }
}

module.exports = new NotificationModule();
