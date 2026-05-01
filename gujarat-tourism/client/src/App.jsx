import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Places from './pages/Places';
import PlacePage from './pages/PlacePage';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import NotFound from './pages/NotFound';

import AdminDashboard from './pages/admin/AdminDashboard';
import ManagePlaces from './pages/admin/ManagePlaces';
import ManageUsers from './pages/admin/ManageUsers';
import ManageBookings from './pages/admin/ManageBookings';
import ManageReviews from './pages/admin/ManageReviews';

import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/places" element={<Places />} />
                  <Route path="/places/:id" element={<PlacePage />} />
                  
                  <Route path="/favorites" element={
                    <PrivateRoute>
                      <Favorites />
                    </PrivateRoute>
                  } />
                  <Route path="/profile" element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  } />
                  <Route path="/bookings" element={
                    <PrivateRoute>
                      <Bookings />
                    </PrivateRoute>
                  } />
                  
                  <Route path="/admin" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin/places" element={
                    <AdminRoute>
                      <ManagePlaces />
                    </AdminRoute>
                  } />
                  <Route path="/admin/users" element={
                    <AdminRoute>
                      <ManageUsers />
                    </AdminRoute>
                  } />
                  <Route path="/admin/bookings" element={
                    <AdminRoute>
                      <ManageBookings />
                    </AdminRoute>
                  } />
                  <Route path="/admin/reviews" element={
                    <AdminRoute>
                      <ManageReviews />
                    </AdminRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <ToastContainer position="bottom-right" theme="colored" />
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;