import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} from '../controllers/bookingController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createBooking);
router.get('/user', protect, getUserBookings);
router.get('/all', protect, admin, getAllBookings);
router.put('/:id/status', protect, admin, updateBookingStatus);
router.put('/:id/cancel', protect, cancelBooking);

export default router;