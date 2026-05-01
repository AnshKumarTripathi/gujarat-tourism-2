import Booking from '../models/Booking.js';
import Place from '../models/Place.js';

export const createBooking = async (req, res) => {
  try {
    const { placeId, bookingDate, visitDate, totalPeople, specialRequests } = req.body;
    
    const place = await Place.findById(placeId);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    const totalPrice = place.price * totalPeople;

    const booking = await Booking.create({
      user: req.user._id,
      place: placeId,
      bookingDate,
      visitDate,
      totalPeople,
      totalPrice,
      specialRequests,
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('place', 'title images location')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate('user', 'name email')
      .populate('place', 'title');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking) {
      booking.status = req.body.status;
      await booking.save();
      res.json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking && booking.user.toString() === req.user._id.toString()) {
      booking.status = 'cancelled';
      await booking.save();
      res.json({ message: 'Booking cancelled' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};