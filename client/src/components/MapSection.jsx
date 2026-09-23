import { useEffect, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import apiClient from '../services/api';
import { BUSINESS } from '../utils/business';

// Displays an embedded map and directions link using the business location
// stored in the admin-managed BusinessInfo record. Falls back to a plain
// address card (no fabricated map link) if no verified URL is set yet.
const MapSection = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    apiClient
      .get('/business-info')
      .then((res) => setInfo(res.data.data))
      .catch(() => setInfo(null));
  }, []);

  const mapEmbedUrl = info?.mapEmbedUrl;
  const directionsUrl = info?.googleMapsUrl;

  return (
    <div className="glass-card overflow-hidden">
      {mapEmbedUrl ? (
        <iframe
          title="Business location"
          src={mapEmbedUrl}
          width="100%"
          height="320"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="h-64 flex flex-col items-center justify-center bg-skyline-50 text-navy-800/60 text-sm text-center px-6">
          <MapPin size={28} className="text-skyline-500 mb-2" />
          Map will appear here once the verified Google Maps location is added in the admin panel.
        </div>
      )}
      <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <MapPin size={18} className="text-skyline-600 mt-0.5 shrink-0" />
          <p className="text-sm text-navy-800/80">{info?.address || BUSINESS.address}</p>
        </div>
        {directionsUrl ? (
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary !py-2.5 text-sm shrink-0">
            <Navigation size={16} /> Get Directions
          </a>
        ) : (
          <span className="text-xs text-navy-800/40 shrink-0">Directions link pending verification</span>
        )}
      </div>
    </div>
  );
};

export default MapSection;
