import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import MobileBottomBar from '../components/layout/MobileBottomBar';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface-100 text-navy-900 selection:bg-brand-500 selection:text-white">
      {/* Top Sticky Glass Navigation */}
      <Navbar />

      {/* Main Page Body with safe bottom spacing on mobile for sticky CTA */}
      <main className="flex-1 pb-16 lg:pb-0">
        <Outlet />
      </main>

      {/* Floating WhatsApp trigger */}
      <WhatsAppButton />

      {/* Mobile Sticky CTA Bar */}
      <MobileBottomBar />

      {/* Footer */}
      <Footer />
    </div>
  );
}
