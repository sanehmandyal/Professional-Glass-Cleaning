import React, { useState, useEffect } from 'react';
import { Sparkles, Eye, Filter, CheckCircle2 } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import apiClient from '../services/api';

const DEFAULT_GALLERY = [
  {
    title: 'Commercial Facade Glass Cleaning',
    category: 'Commercial Cleaning',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    alt: 'Technicians cleaning commercial building glass facade in Mohali',
    isDemo: true,
  },
  {
    title: 'High-Rise Balcony Glass Cleaning',
    category: 'Glass Cleaning',
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=800&q=80',
    alt: 'Crystal clear residential balcony glass cleaning in Zirakpur society',
    isDemo: true,
  },
  {
    title: 'Silicone Sealant Replacement on Window Joint',
    category: 'Silicone Repair',
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
    alt: 'Neat architectural silicone caulking around window glass frame in Zirakpur',
    isDemo: true,
  },
  {
    title: 'Commercial Glass Door Hardware & Hinge Repair',
    category: 'Glass Repair',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    alt: 'Technician aligning patch fitting and floor spring on glass door in Chandigarh',
    isDemo: true,
  },
  {
    title: 'Overhead Water Tank High-Pressure Wash',
    category: 'Water Tank Cleaning',
    imageUrl: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
    alt: 'High pressure hygienic water tank cleaning in Mohali',
    isDemo: true,
  },
  {
    title: 'Retail Showroom Storefront Window Polishing',
    category: 'Commercial Cleaning',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    alt: 'Spotless retail showroom glass storefront cleaning in Chandigarh',
    isDemo: true,
  },
  {
    title: 'Residential Villa French Window Cleaning',
    category: 'Glass Cleaning',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    alt: 'Residential window glass cleaning in Zirakpur home',
    isDemo: true,
  },
  {
    title: 'Corporate Office Glass Partition Care',
    category: 'Commercial Cleaning',
    imageUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    alt: 'Clean glass cabin partitions in corporate office in Mohali',
    isDemo: true,
  },
];

const CATEGORIES = [
  'All',
  'Glass Cleaning',
  'Glass Repair',
  'Silicone Repair',
  'Water Tank Cleaning',
  'Commercial Cleaning',
];

export default function Gallery() {
  const [images, setImages] = useState(DEFAULT_GALLERY);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    apiClient
      .get('/gallery')
      .then((res) => {
        if (res.data?.data?.length > 0) setImages(res.data.data);
      })
      .catch(() => {});
  }, []);

  const filteredImages =
    activeCategory === 'All'
      ? images
      : images.filter((img) => img.category === activeCategory || img.category?.toLowerCase() === activeCategory.toLowerCase());

  const breadcrumbs = [{ name: 'Gallery', url: '/gallery' }];

  return (
    <>
      <SEO
        title="Project Gallery | Professional Glass Cleaning Service"
        description="Browse project photography for glass cleaning, silicone repair, glass repair, and water tank cleaning across Zirakpur, Mohali & Chandigarh. Call 8539842072."
        canonical="https://professionalglasscleaningservice.com/gallery"
        breadcrumbs={breadcrumbs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200 inline-block mb-3">
            Visual Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Our Work & Service Gallery
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Visual highlights from our glass cleaning, silicone waterproofing, door repairs, and water tank maintenance projects across Zirakpur and Tricity.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-brand-500 text-white shadow-glass'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(img)}
              className="group glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={img.imageUrl}
                  alt={img.alt || img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="400"
                  height="300"
                />
                <div className="absolute inset-0 bg-navy-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-brand-600 shadow-md">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>

                {/* Demo / Sample tag */}
                {img.isDemo && (
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold bg-navy-900/80 text-white backdrop-blur-md">
                    Sample Photo
                  </span>
                )}
              </div>

              <div className="p-4">
                <span className="text-[11px] font-semibold text-brand-600 block mb-0.5">
                  {img.category}
                </span>
                <h3 className="font-bold text-sm text-navy-900 line-clamp-1">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-white rounded-3xl overflow-hidden max-w-3xl w-full shadow-2xl border border-slate-200 animate-scaleUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black">
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.alt || selectedImage.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-6 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-brand-600">{selectedImage.category}</span>
                  <h3 className="text-lg font-bold text-navy-900 mt-0.5">{selectedImage.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
