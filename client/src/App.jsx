import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetails from './pages/ServiceDetails';
import Locations from './pages/Locations';
import LocationDetails from './pages/LocationDetails';
import LocationServiceLanding from './pages/LocationServiceLanding';
import About from './pages/About';
import FAQs from './pages/FAQs';
import Reviews from './pages/Reviews';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import EnquiriesAdmin from './pages/admin/EnquiriesAdmin';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import LocationsAdmin from './pages/admin/LocationsAdmin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import FaqsAdmin from './pages/admin/FaqsAdmin';
import SEOAdmin from './pages/admin/SEOAdmin';
import BusinessInfoAdmin from './pages/admin/BusinessInfoAdmin';

export default function App() {
  return (
    <Routes>
      {/* Public Pages wrapped in MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetails />} />
        
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:slug" element={<LocationDetails />} />

        {/* Location + Service Combinations (e.g. /zirakpur/glass-cleaning, /mohali/glass-repair) */}
        <Route path="/:city/:serviceSlug" element={<LocationServiceLanding />} />

        <Route path="/reviews" element={<Reviews />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Authentication (Protected, not for general users) */}
      <Route path="/admin/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="enquiries" element={<EnquiriesAdmin />} />
        <Route path="reviews" element={<ReviewsAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
        <Route path="locations" element={<LocationsAdmin />} />
        <Route path="gallery" element={<GalleryAdmin />} />
        <Route path="faqs" element={<FaqsAdmin />} />
        <Route path="seo" element={<SEOAdmin />} />
        <Route path="business-info" element={<BusinessInfoAdmin />} />
      </Route>
    </Routes>
  );
}
