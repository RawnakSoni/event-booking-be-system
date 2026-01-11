const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    numTickets: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
