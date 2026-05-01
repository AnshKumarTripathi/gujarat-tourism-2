import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import API from '../services/api';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const { data } = await API.get('/users/favorites');
      setFavorites(data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const addToFavorites = async (placeId) => {
    try {
      const { data } = await API.post('/users/favorites', { placeId });
      setFavorites(data);
      return true;
    } catch (error) {
      console.error('Failed to add to favorites:', error);
      return false;
    }
  };

  const removeFromFavorites = async (placeId) => {
    try {
      const { data } = await API.delete(`/users/favorites/${placeId}`);
      setFavorites(data);
      return true;
    } catch (error) {
      console.error('Failed to remove from favorites:', error);
      return false;
    }
  };

  const isFavorite = (placeId) => {
    return favorites.some(fav => fav.place._id === placeId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};