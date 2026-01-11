const bookingAppModule = require('../appModules/BookingAppModule');

const createBooking = async (req, res) => {
    try {
        const booking = await bookingAppModule.createBooking(req.body.eventId, req.body.numTickets, req.user);
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMyBookings = async (req, res) => {
    try {
        const bookings = await bookingAppModule.getMyBookings(req.user._id);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getMyBookings };
