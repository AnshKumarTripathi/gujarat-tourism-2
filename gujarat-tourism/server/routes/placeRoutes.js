import express from 'express';
import {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
  getFeaturedPlaces,
} from '../controllers/placeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getPlaces);
router.get('/featured', getFeaturedPlaces);
router.get('/:id', getPlaceById);
router.post('/', protect, admin, upload.array('images', 10), createPlace);
router.put('/:id', protect, admin, upload.array('images', 10), updatePlace);
router.delete('/:id', protect, admin, deletePlace);

export default router;