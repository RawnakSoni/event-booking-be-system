const bookingModule = require('../modules/BookingModule');
const notificationModule = require('../modules/NotificationModule');

class BookingAppModule {
    async createBooking(bookingId, numTickets, user) {
        const { booking, eventTitle } = await bookingModule.createBooking({
            event: bookingId,
            customer: user._id,
            numTickets
        });

        // Trigger background task for booking confirmation
        await notificationModule.queueBookingConfirmation({
            bookingId: booking._id,
            customerEmail: user.email,
            eventTitle: eventTitle
        });

        return booking;
    }

    async getMyBookings(userId) {
        return bookingModule.getCustomerBookings(userId);
    }
}

module.exports = new BookingAppModule();
