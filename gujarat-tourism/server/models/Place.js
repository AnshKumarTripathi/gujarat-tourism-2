import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['Temple', 'Wildlife', 'Beach', 'Hill Station', 'Heritage', 'Museum', 'Other'],
    required: true,
  },
  images: [{
    type: String,
  }],
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  mapLocation: {
    lat: Number,
    lng: Number,
  },
  bestTimeToVisit: String,
  howToReach: String,
  openingHours: String,
  contactInfo: String,
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Place = mongoose.model('Place', placeSchema);
export default Place;