import { CheckCircle2 } from 'lucide-react';
import CTASection from '../components/CTASection';

const items = [
  { title: 'Professional Work', desc: 'Careful, methodical service on every job, from small repairs to full cleans.' },
  { title: 'Reliable Service', desc: 'We show up and follow through on what we agree to during the initial call.' },
  { title: 'Residential & Commercial Solutions', desc: 'Suited to homes, offices, shops and showrooms alike.' },
  { title: 'Attention to Detail', desc: 'Thorough, careful work rather than a quick surface-level job.' },
  { title: 'Convenient Booking', desc: 'Reach us by phone, WhatsApp, or the online quote form — whichever is easiest.' },
  { title: 'Local Zirakpur Service', desc: 'Based in Zirakpur, with knowledge of the local area and its properties.' },
];

const WhyChooseUs = () => (
  <div>
    <section className="py-16 bg-grid-fade">
      <div className="container-x text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">Why Choose Us</h1>
        <p className="text-navy-800/70">What sets our glass cleaning and repair service apart.</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container-x grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.title} className="glass-card p-8 hover:shadow-glass-lg hover:-translate-y-1 transition-all">
            <CheckCircle2 size={26} className="text-skyline-600 mb-5" />
            <h3 className="text-lg font-semibold text-navy-900 mb-2">{item.title}</h3>
            <p className="text-sm text-navy-800/70 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
    <CTASection />
  </div>
);

export default WhyChooseUs;
