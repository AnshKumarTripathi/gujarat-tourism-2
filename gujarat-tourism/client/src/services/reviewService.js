import api from './api'

const reviewService = {
  // Create a review
  createReview: async (reviewData) => {
    const response = await api.post('/reviews', reviewData)
    return response.data
  },
  
  // Get reviews for a place
  getPlaceReviews: async (placeId, params = {}) => {
    const response = await api.get(`/reviews/${placeId}`, { params })
    return response.data
  },
  
  // Delete review
  deleteReview: async (id) => {
    const response = await api.delete(`/reviews/${id}`)
    return response.data
  },
  
  // Mark review as helpful
  markHelpful: async (id) => {
    const response = await api.put(`/reviews/${id}/helpful`)
    return response.data
  },
}

export default reviewService