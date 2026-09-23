import { useEffect, useState } from 'react';
import apiClient from '../services/api';

const categories = ['All', 'Glass Cleaning', 'Glass Repair', 'Silicone Work', 'Water Tank Cleaning', 'Commercial Work'];

const Gallery = () => {
  const [active, setActive] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    apiClient
      .get('/gallery', { params: { category: active } })
      .then((res) => setItems(res.data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2.5 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active === cat ? 'bg-skyline-600 text-white' : 'bg-skyline-50 text-navy-800/70 hover:bg-skyline-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {!loading && items.length === 0 && (
        <p className="text-center text-navy-800/50 text-sm py-16">
          Gallery photos will appear here once added through the admin panel.
        </p>
      )}

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {items.map((item) => (
          <div key={item._id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-glass">
            <img src={item.imageUrl} alt={item.title || item.category} className="w-full object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
