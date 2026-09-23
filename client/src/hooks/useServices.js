import { useEffect, useState } from 'react';
import apiClient from '../services/api';
import { servicesData } from '../data/servicesData';

// Fetches services from the API, falling back to bundled data if the
// backend is not reachable (e.g. during frontend-only preview).
export const useServices = () => {
  const [services, setServices] = useState(servicesData);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let mounted = true;
    apiClient
      .get('/services')
      .then((res) => {
        if (mounted && res.data?.data?.length) setServices(res.data.data);
      })
      .catch(() => {
        if (mounted) setUsingFallback(true);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return { services, loading, usingFallback };
};
