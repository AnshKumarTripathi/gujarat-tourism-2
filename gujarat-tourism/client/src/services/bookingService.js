import api from './api'

const bookingService = {
  // Create a booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData)
    return response.data
  },
  
  // Get user bookings
  getUserBookings: async () => {
    const response = await api.get('/bookings/user')
    return response.data
  },
  
  // Get booking by id
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`)
    return response.data
  },
  
  // Cancel booking
  cancelBooking: async (id) => {
    const response = await api.put(`/bookings/${id}`)
    return response.data
  },
  
  // Get all bookings (admin)
  getAllBookings: async (params = {}) => {
    const response = await api.get('/bookings', { params })
    return response.data
  },
  
  // Update booking status (admin)
  updateBookingStatus: async (id, status, paymentStatus) => {
    const response = await api.put(`/bookings/${id}/status`, { status, paymentStatus })
    return response.data
  },
}

export default bookingService