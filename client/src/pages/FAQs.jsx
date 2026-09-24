import React, { useState, useEffect } from 'react';
import { HelpCircle, Search, Phone, MessageCircle } from 'lucide-react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import FAQAccordion from '../components/common/FAQAccordion';
import { FALLBACK_FAQS } from '../data/fallbackData';
import apiClient from '../services/api';
import { useBusiness } from '../context/BusinessContext';

export default function FAQs() {
  const { business } = useBusiness();
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    apiClient
      .get('/faqs')
      .then((res) => {
        if (res.data?.data?.length > 0) setFaqs(res.data.data);
      })
      .catch(() => {});
  }, []);

  const categories = ['All', 'General', 'Booking & Pricing', 'Residential', 'Commercial', 'Silicone & Sealing', 'Glass Repair', 'Water Tank Cleaning'];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory =
      selectedCategory === 'All' || faq.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      faq.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breadcrumbs = [{ name: 'FAQs', url: '/faqs' }];

  return (
    <>
      <SEO
        title="Frequently Asked Questions | Professional Glass Cleaning Service"
        description="Find clear, honest answers to common questions about glass cleaning, silicone repair, glass repair, water tank cleaning, pricing, and Tricity service coverage."
        canonical="https://professionalglasscleaningservice.com/faqs"
        breadcrumbs={breadcrumbs}
        faqs={faqs}
      />

      <div className="container-custom pt-6 pb-16">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3.5 py-1.5 rounded-full border border-brand-200 inline-block mb-3">
            Knowledgebase & Help
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Everything you need to know about our glass cleaning, silicone sealing, hardware repair, water tank cleaning, and service coverage across Zirakpur and Tricity.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-lg mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword (e.g. Zirakpur, tank, silicone, price)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-input text-sm shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="mb-16">
          {filteredFaqs.length > 0 ? (
            <FAQAccordion items={filteredFaqs} />
          ) : (
            <div className="text-center py-12 glass-panel rounded-3xl max-w-lg mx-auto">
              <p className="text-slate-600 font-semibold mb-2">No matching questions found.</p>
              <p className="text-xs text-slate-500 mb-4">
                Have a specific question? Call us directly on 8539842072.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-50 text-brand-600 border border-brand-200"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-200 bg-white max-w-3xl mx-auto text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-bold text-navy-900">
            Still Have Questions? We're Here to Help!
          </h3>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">
            Connect directly with our team for honest advice, project scoping, or immediate emergency support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={business.phoneHref}
              className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-white bg-brand-500 hover:bg-brand-600 transition-colors shadow-sm flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call {business.phone}</span>
            </a>
            <a
              href={business.whatsappLink('Hello, I have a question regarding your services in Zirakpur / Tricity.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto py-3 px-6 rounded-xl font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 transition-colors border border-emerald-300 flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
