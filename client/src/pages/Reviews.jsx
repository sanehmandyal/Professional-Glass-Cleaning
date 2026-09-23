import React from 'react';
import SEO from '../components/seo/SEO';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ReviewsSection from '../components/ReviewsSection';
import CTASection from '../components/CTASection';

export default function Reviews() {
  return (
    <>
      <SEO
        title="Customer Reviews & Ratings | Professional Glass Cleaning Service"
        description="Read genuine customer reviews and ratings for Professional Glass Cleaning Service in Zirakpur, Mohali, and Chandigarh. Submit your own verified feedback."
        canonical="https://professionalglasscleaningservice.com/reviews"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-3">
        <div className="container-custom">
          <Breadcrumbs items={[{ label: 'Reviews & Feedback', path: '/reviews' }]} />
        </div>
      </div>

      <ReviewsSection
        title="Customer Reviews & Experience"
        subtitle="Transparent, verified feedback from homeowners, corporate offices, and showrooms across Zirakpur and Tricity."
      />

      <CTASection />
    </>
  );
}
