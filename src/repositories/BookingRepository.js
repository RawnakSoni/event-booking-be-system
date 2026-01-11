const Booking = require('../models/Booking');

class BookingRepository {
    async create(bookingData) {
        return Booking.create(bookingData);
    }

    async findByCustomer(customerId) {
        return Booking.find({ customer: customerId }).populate('event');
    }

    async findByEvent(eventId) {
        return Booking.find({ event: eventId }).populate('customer', 'email');
    }
}

module.exports = new BookingRepository();
