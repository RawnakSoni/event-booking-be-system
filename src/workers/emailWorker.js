const { Worker } = require('bullmq');
const { connection } = require('./emailQueue');
const bookingModule = require('../modules/BookingModule');
const notificationModule = require('../modules/NotificationModule');

const worker = new Worker('emailQueue', async (job) => {
    if (job.name === 'bookingConfirmation') {
        const { customerEmail, eventTitle } = job.data;
        console.log(`[BACKGROUND TASK] Sending booking confirmation email to ${customerEmail} for event "${eventTitle}"`);
    } else if (job.name === 'eventUpdate') {
        const { eventId, eventTitle } = job.data;
        console.log(`[BACKGROUND TASK] Event update triggered for "${eventTitle}" (${eventId}). Fanning out notifications...`);

        const emails = await bookingModule.getBookingEmailsForEvent(eventId);

        // Fan out individual email jobs
        for (const email of emails) {
            await notificationModule.queueIndividualEmail({
                email,
                eventTitle,
                type: 'EVENT_UPDATE'
            });
        }
        console.log(`[BACKGROUND TASK] Queued ${emails.length} individual notification jobs`);
    } else if (job.name === 'sendIndividualEmail') {
        const { email, eventTitle, type } = job.data;
        if (type === 'EVENT_UPDATE') {
            console.log(`[BACKGROUND TASK] FINAL ACTION: Notifying ${email} that event "${eventTitle}" has been updated`);
        }
    }
}, { connection });

worker.on('completed', job => {
    console.log(`Job ${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`Job ${job.id} has failed with ${err.message}`);
});

module.exports = worker;
