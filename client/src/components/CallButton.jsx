import { Phone } from 'lucide-react';
import { BUSINESS } from '../utils/business';

const CallButton = ({ className = '', variant = 'primary', label = 'Call Now' }) => {
  const base =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'secondary'
      ? 'btn-secondary'
      : 'inline-flex items-center gap-2 text-skyline-700 font-semibold hover:text-skyline-800';
  return (
    <a href={BUSINESS.phoneHref} className={`${base} ${className}`}>
      <Phone size={18} />
      {label}
    </a>
  );
};

export default CallButton;
