import CallButton from './CallButton';
import WhatsAppButton from './WhatsAppButton';

const CTASection = ({
  title = 'Need Professional Glass Cleaning or Repair?',
  subtitle = 'Call us or send a WhatsApp message for a free, no-obligation quote.',
}) => (
  <section className="py-16 bg-navy-950">
    <div className="container-x text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h2>
      <p className="text-white/60 max-w-xl mx-auto mb-8">{subtitle}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <CallButton />
        <WhatsAppButton />
      </div>
    </div>
  </section>
);

export default CTASection;
