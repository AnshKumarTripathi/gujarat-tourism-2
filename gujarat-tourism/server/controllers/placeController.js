import Place from '../models/Place.js';
import Review from '../models/Review.js';

export const getPlaces = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const category = req.query.category;
    const search = req.query.search;

    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    const places = await Place.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Place.countDocuments(query);

    res.json({
      places,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (place) {
      const reviews = await Review.find({ place: place._id }).populate('user', 'name avatar');
      res.json({ place, reviews });
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPlace = async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      category,
      price,
      discountPrice,
      mapLocation,
      bestTimeToVisit,
      howToReach,
      openingHours,
      contactInfo,
      isFeatured,
    } = req.body;

    const images = req.files ? req.files.map(file => file.path) : [];

    const place = await Place.create({
      title,
      description,
      location,
      category,
      images,
      price,
      discountPrice,
      mapLocation: mapLocation ? JSON.parse(mapLocation) : {},
      bestTimeToVisit,
      howToReach,
      openingHours,
      contactInfo,
      isFeatured: isFeatured === 'true',
    });

    res.status(201).json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (place) {
      Object.assign(place, req.body);
      if (req.files && req.files.length > 0) {
        place.images = req.files.map(file => file.path);
      }
      const updatedPlace = await place.save();
      res.json(updatedPlace);
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (place) {
      await place.deleteOne();
      res.json({ message: 'Place removed' });
    } else {
      res.status(404).json({ message: 'Place not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFeaturedPlaces = async (req, res) => {
  try {
    const places = await Place.find({ isFeatured: true }).limit(6);
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};