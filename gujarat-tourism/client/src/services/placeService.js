import api from './api'

const placeService = {
  // Get all places with filters
  getPlaces: async (params = {}) => {
    const response = await api.get('/places', { params })
    return response.data
  },
  
  // Get single place by id or slug
  getPlaceById: async (id) => {
    const response = await api.get(`/places/${id}`)
    return response.data
  },
  
  // Get featured places
  getFeaturedPlaces: async () => {
    const response = await api.get('/places/featured')
    return response.data
  },
  
  // Get popular places
  getPopularPlaces: async () => {
    const response = await api.get('/places/popular')
    return response.data
  },
  
  // Create place (admin)
  createPlace: async (placeData) => {
    const response = await api.post('/places', placeData)
    return response.data
  },
  
  // Update place (admin)
  updatePlace: async (id, placeData) => {
    const response = await api.put(`/places/${id}`, placeData)
    return response.data
  },
  
  // Delete place (admin)
  deletePlace: async (id) => {
    const response = await api.delete(`/places/${id}`)
    return response.data
  },
  
  // Upload images (admin)
  uploadImages: async (id, files) => {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))
    const response = await api.post(`/places/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
  },
  
  // Delete image (admin)
  deleteImage: async (placeId, imageId) => {
    const response = await api.delete(`/places/${placeId}/images/${imageId}`)
    return response.data
  },
}

export default placeService