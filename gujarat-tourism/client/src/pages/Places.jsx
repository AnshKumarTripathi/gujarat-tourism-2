import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PlaceCard from '../components/places/PlaceCard'
import Loader from '../components/common/Loader'
import placeService from '../services/placeService'
import { FiSearch, FiFilter, FiGrid, FiList, FiX } from 'react-icons/fi'

const Places = () => {
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDistrict, setSelectedDistrict] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const categories = [
    'all', 'temple', 'nature', 'heritage', 'wildlife', 'beach', 'hill_station', 'museum'
  ]

  const districts = [
    'all', 'Kutch', 'Ahmedabad', 'Vadodara', 'Surat', 'Rajkot', 'Junagadh', 'Gir Somnath', 'Dwarka'
  ]

  useEffect(() => {
    fetchPlaces()
  }, [currentPage, selectedCategory, selectedDistrict, sortBy, searchTerm])

  const fetchPlaces = async () => {
    setLoading(true)
    try {
      const params = {
        page: currentPage,
        limit: 9,
        sort: sortBy,
        category: selectedCategory,
        district: selectedDistrict,
        search: searchTerm
      }
      const data = await placeService.getPlaces(params)
      setPlaces(data.places)
      setTotalPages(data.totalPages)
    } catch (error) {
      console.error('Error fetching places:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchPlaces()
  }

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedDistrict('all')
    setSortBy('newest')
    setSearchTerm('')
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
            Explore Gujarat
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover the vibrant culture, heritage, and natural beauty of Gujarat
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, location, or description..."
                className="input-field pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <FiFilter />
                Filters
              </button>
              <button type="submit" className="btn-primary">
                Search
              </button>
            </div>
          </form>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      className="input-field"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">District</label>
                    <select
                      className="input-field"
                      value={selectedDistrict}
                      onChange={(e) => setSelectedDistrict(e.target.value)}
                    >
                      {districts.map(dist => (
                        <option key={dist} value={dist}>
                          {dist === 'all' ? 'All Districts' : dist}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Sort By</label>
                    <select
                      className="input-field"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="text-gray-500 hover:text-primary-600 flex items-center gap-1"
                  >
                    <FiX /> Clear all filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Toggle */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Found {places.length} places
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <FiGrid />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              <FiList />
            </button>
          </div>
        </div>

        {/* Places Grid/List */}
        {loading ? (
          <Loader />
        ) : places.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No places found. Try different filters.</p>
          </div>
        ) : (
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {places.map((place, index) => (
              <PlaceCard key={place._id} place={place} index={index} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Places