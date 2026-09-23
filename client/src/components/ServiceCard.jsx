import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getIcon } from '../utils/iconMap';
import WhatsAppButton from './WhatsAppButton';
import { serviceWhatsappMessage } from '../utils/business';

const ServiceCard = ({ service }) => {
  const Icon = getIcon(service.icon);
  return (
    <div className="glass-card p-7 flex flex-col hover:shadow-glass-lg hover:-translate-y-1 transition-all">
      <div className="h-12 w-12 rounded-xl bg-skyline-50 flex items-center justify-center text-skyline-600 mb-5">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-semibold text-navy-900 mb-2">{service.title}</h3>
      <p className="text-sm text-navy-800/70 leading-relaxed mb-6 flex-1">{service.shortDescription}</p>
      <div className="flex items-center justify-between gap-3">
        <Link
          to={`/services/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-skyline-600 font-semibold text-sm hover:text-skyline-700"
        >
          Learn More <ArrowRight size={15} />
        </Link>
        <WhatsAppButton
          message={serviceWhatsappMessage(service.title)}
          label="Get Quote"
          className="!px-4 !py-2 text-xs"
        />
      </div>
    </div>
  );
};

export default ServiceCard;
