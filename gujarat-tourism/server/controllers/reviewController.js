import Review from '../models/Review.js';
import Place from '../models/Place.js';

export const createReview = async (req, res) => {
  try {
    const { rating, comment, placeId } = req.body;

    const reviewExists = await Review.findOne({
      user: req.user._id,
      place: placeId,
    });

    if (reviewExists) {
      return res.status(400).json({ message: 'You have already reviewed this place' });
    }

    const review = await Review.create({
      user: req.user._id,
      place: placeId,
      rating: Number(rating),
      comment,
    });

    const reviews = await Review.find({ place: placeId });
    const place = await Place.findById(placeId);

    place.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    place.numReviews = reviews.length;
    await place.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlaceReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ place: req.params.placeId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      await review.deleteOne();
      
      const reviews = await Review.find({ place: review.place });
      const place = await Place.findById(review.place);
      
      if (reviews.length > 0) {
        place.rating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
      } else {
        place.rating = 0;
      }
      place.numReviews = reviews.length;
      await place.save();
      
      res.json({ message: 'Review removed' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};