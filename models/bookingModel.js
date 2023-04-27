const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.ObjectId,
    ref: 'Item',
    required: [true, 'Booking must belong to an Item!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to an User!'],
  },
  acceptCondition: {
    type: Boolean,
    default: false,
  },
  startDate: Date,
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
