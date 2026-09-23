import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, MapPin } from 'lucide-react';
import apiClient from '../services/api';
import { servicesData } from '../data/servicesData';
import { getIcon } from '../utils/iconMap';
import CallButton from '../components/CallButton';
import WhatsAppButton from '../components/WhatsAppButton';
import CTASection from '../components/CTASection';
import FAQ from '../components/FAQ';
import { serviceWhatsappMessage } from '../utils/business';

// Dynamic route: /services/:slug renders whichever service matches the
// slug, sourced from the API with a bundled fallback dataset.
const ServiceDetail = () => {
  const { slug } = useParams();
  const [service, setService] = useState(() => servicesData.find((s) => s.slug === slug));
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNotFound(false);
    apiClient
      .get(`/services/${slug}`)
      .then((res) => setService(res.data.data))
      .catch(() => {
        const fallback = servicesData.find((s) => s.slug === slug);
        if (fallback) setService(fallback);
        else setNotFound(true);
      });
  }, [slug]);

  if (notFound) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-bold text-navy-900 mb-3">Service Not Found</h1>
        <Link to="/services" className="text-skyline-600 font-semibold">Back to all services</Link>
      </div>
    );
  }

  if (!service) return <div className="container-x py-24 text-center text-navy-800/50">Loading...</div>;

  const Icon = getIcon(service.icon);

  return (
    <div>
      <section className="py-16 bg-grid-fade">
        <div className="container-x">
          <div className="h-14 w-14 rounded-2xl bg-skyline-50 flex items-center justify-center text-skyline-600 mb-6">
            <Icon size={28} />
          </div>
          <h1 className="text-4xl font-bold text-navy-900 mb-4 max-w-2xl">{service.title}</h1>
          <p className="text-lg text-navy-800/70 max-w-2xl mb-8">{service.description}</p>
          <div className="flex flex-wrap gap-4">
            <CallButton />
            <WhatsAppButton message={serviceWhatsappMessage(service.title)} />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-x grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-5">Benefits</h2>
            <ul className="space-y-3 mb-10">
              {service.benefits?.map((b) => (
                <li key={b} className="flex items-start gap-3 text-navy-800/80">
                  <CheckCircle2 size={19} className="text-skyline-600 mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-bold text-navy-900 mb-5">Where This Service Is Useful</h2>
            <div className="flex flex-wrap gap-2.5">
              {service.suitableFor?.map((s) => (
                <span key={s} className="flex items-center gap-1.5 bg-skyline-50 text-skyline-700 text-sm font-medium px-3.5 py-1.5 rounded-full">
                  <MapPin size={13} /> {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-5">Our Process</h2>
            <ol className="space-y-4">
              {service.process?.map((step, i) => (
                <li key={step} className="glass-card p-5 flex items-center gap-4">
                  <span className="h-9 w-9 rounded-full bg-skyline-600 text-white text-sm font-bold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-navy-800/80">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="py-16 bg-skyline-50/50">
        <div className="container-x">
          <h2 className="text-2xl font-bold text-navy-900 mb-10 text-center">Frequently Asked Questions</h2>
          <FAQ />
        </div>
      </section>

      <CTASection
        title={`Ready to Book ${service.title}?`}
        subtitle="Call or WhatsApp us for a free quote tailored to your requirement."
      />
    </div>
  );
};

export default ServiceDetail;
