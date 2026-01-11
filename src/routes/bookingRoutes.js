const express = require('express');
const { createBooking, getMyBookings } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, authorize('customer'), createBooking);
router.get('/me', protect, authorize('customer'), getMyBookings);

module.exports = router;
