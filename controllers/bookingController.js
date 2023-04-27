const stripe = require('stripe');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const Item = require('../models/itemModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryController');

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 1) Get the currently booked tour
//   const item = await Item.findById(req.params.itemId);
//   console.log(item);
  
//   // 2) Create checkout session

//   // 3) Create session as response
// });

exports.createBooking = factory.createOne(Booking);
exports.getBooking = factory.getOne(Booking);
exports.getAllBookings = factory.getAll(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);