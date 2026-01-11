const bookingRepository = require('../repositories/BookingRepository');
const eventRepository = require('../repositories/EventRepository');

class BookingModule {
    async createBooking(bookingData) {
        const event = await eventRepository.findById(bookingData.event);
        if (!event) {
            throw new Error('Event not found');
        }

        if (event.ticketsSold + bookingData.numTickets > event.totalTickets) {
            throw new Error('Not enough tickets available');
        }

        const booking = await bookingRepository.create(bookingData);

        event.ticketsSold += bookingData.numTickets;
        await event.save();

        return { booking, eventTitle: event.title };
    }

    async getCustomerBookings(customerId) {
        return bookingRepository.findByCustomer(customerId);
    }

    async getBookingEmailsForEvent(eventId) {
        const bookings = await bookingRepository.findByEvent(eventId);
        return [...new Set(bookings.map(b => b.customer.email))];
    }
}

module.exports = new BookingModule();
