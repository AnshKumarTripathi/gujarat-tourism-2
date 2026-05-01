import User from '../models/User.js';
import Place from '../models/Place.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPlaces = await Place.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalReviews = await Review.countDocuments();
    
    const revenue = await Booking.aggregate([
      { $match: { status: 'confirmed' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);

    const recentBookings = await Booking.find()
      .populate('user', 'name')
      .populate('place', 'title')
      .sort({ createdAt: -1 })
      .limit(5);

    const popularPlaces = await Booking.aggregate([
      { $group: { _id: '$place', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'places', localField: '_id', foreignField: '_id', as: 'place' } },
      { $unwind: '$place' }
    ]);

    res.json({
      totalUsers,
      totalPlaces,
      totalBookings,
      totalReviews,
      revenue: revenue[0]?.total || 0,
      recentBookings,
      popularPlaces,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};