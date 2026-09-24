import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import apiClient from '../services/api';

const DEFAULT_BUSINESS = {
  businessName: 'Professional Glass Cleaning Service',
  phone: '8539842072',
  secondaryPhone: '',
  whatsapp: '918539842072',
  email: 'contact@professionalglasscleaning.com',
  address: 'Green Enclave, Zirakpur, Punjab 140603, India',
  serviceArea: 'Zirakpur, Mohali (SAS Nagar), Chandigarh, Tricity & nearby areas',
  workingHours: 'Monday – Sunday: 8:00 AM – 8:00 PM (Emergency 24/7 Available)',
  showAnnouncement: false,
  announcementText: '⚡ Special Offer: Fast Response & Reliable Glass Cleaning in Zirakpur & Mohali — Call Now!',
  mapEmbedUrl: '',
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Professional+Glass+Cleaning+Green+Enclave+Zirakpur+Punjab+140603',
  googleReviewsUrl: '',
};

const cleanDigits = (val) => String(val || '').replace(/\D/g, '');

const formatPhoneDisplay = (phone) => {
  const digits = cleanDigits(phone);
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  }
  if (digits.startsWith('91') && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  return phone || '+91 85398 42072';
};

const formatPhoneHref = (phone) => {
  const digits = cleanDigits(phone);
  if (digits.length === 10) return `tel:+91${digits}`;
  if (digits.startsWith('91')) return `tel:+${digits}`;
  return `tel:+918539842072`;
};

const formatWhatsappDigits = (whatsapp) => {
  const digits = cleanDigits(whatsapp);
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith('91')) return digits;
  return '918539842072';
};

const BusinessContext = createContext(null);

export const BusinessProvider = ({ children }) => {
  const [data, setData] = useState(DEFAULT_BUSINESS);
  const [loading, setLoading] = useState(true);

  const fetchBusinessInfo = useCallback(async () => {
    try {
      const res = await apiClient.get('/business-info');
      if (res.data?.data) {
        setData((prev) => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      // Fallback silently if offline or during server warmup
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusinessInfo();
  }, [fetchBusinessInfo]);

  const updateBusinessInfo = async (newInfo) => {
    const res = await apiClient.put('/business-info', newInfo);
    if (res.data?.data) {
      setData((prev) => ({ ...prev, ...res.data.data }));
    }
    return res.data?.data;
  };

  const whatsappNum = formatWhatsappDigits(data.whatsapp);
  const phoneHref = formatPhoneHref(data.phone);
  const phoneDisplay = formatPhoneDisplay(data.phone);

  const whatsappLink = (message = 'Hello, I found Professional Glass Cleaning Service online. I would like to enquire about your services.') => {
    return `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;
  };

  const mapEmbedUrl =
    data.mapEmbedUrl ||
    `https://maps.google.com/maps?q=${encodeURIComponent(data.address || 'Green Enclave, Zirakpur, Punjab 140603')}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  const googleMapsUrl =
    data.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.businessName + ' ' + (data.address || 'Green Enclave Zirakpur'))}`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(data.address || 'Green Enclave, Zirakpur, Punjab 140603')}`;

  const business = {
    ...data,
    phoneDisplay,
    phoneHref,
    whatsappNumber: whatsappNum,
    whatsappLink,
    mapEmbedUrl,
    googleMapsUrl,
    directionsUrl,
  };

  return (
    <BusinessContext.Provider
      value={{
        business,
        loading,
        refreshBusinessInfo: fetchBusinessInfo,
        updateBusinessInfo,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    // Fallback if rendered outside provider
    const phoneHref = formatPhoneHref(DEFAULT_BUSINESS.phone);
    const phoneDisplay = formatPhoneDisplay(DEFAULT_BUSINESS.phone);
    const whatsappNum = formatWhatsappDigits(DEFAULT_BUSINESS.whatsapp);
    return {
      business: {
        ...DEFAULT_BUSINESS,
        phoneDisplay,
        phoneHref,
        whatsappNumber: whatsappNum,
        whatsappLink: (msg = '') => `https://wa.me/${whatsappNum}?text=${encodeURIComponent(msg)}`,
        mapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(DEFAULT_BUSINESS.address)}&t=&z=14&ie=UTF8&iwloc=&output=embed`,
        googleMapsUrl: DEFAULT_BUSINESS.googleMapsUrl,
        directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(DEFAULT_BUSINESS.address)}`,
      },
      loading: false,
      refreshBusinessInfo: () => {},
      updateBusinessInfo: async () => {},
    };
  }
  return context;
};

export default BusinessContext;
