import React from 'react';
import { PhoneCall } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';

export default function CallButton({
  phoneNumber,
  label,
  variant = 'primary',
  className = '',
  size = 'md',
}) {
  const { business } = useBusiness();

  const activeNumber = phoneNumber || business.phone || '8539842072';
  const displayLabel = label || `Call ${activeNumber}`;
  const phoneHref = phoneNumber ? `tel:+91${phoneNumber.replace(/\D/g, '')}` : business.phoneHref;

  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const isDark = variant === 'dark';

  const sizeClasses =
    size === 'sm'
      ? 'px-3.5 py-1.5 text-xs gap-1.5 rounded-lg'
      : size === 'lg'
      ? 'px-7 py-3.5 text-base sm:text-lg gap-2.5 rounded-2xl shadow-glass-lg'
      : 'px-5 py-2.5 text-sm gap-2 rounded-xl shadow-glass';

  let colorClasses = 'bg-brand-500 hover:bg-brand-600 text-white font-bold';
  if (isOutline) {
    colorClasses =
      'border-2 border-brand-500 text-brand-600 hover:bg-brand-50 font-bold';
  } else if (isDark) {
    colorClasses =
      'bg-navy-900 hover:bg-navy-950 text-white font-bold border border-white/15';
  }

  return (
    <a
      href={phoneHref}
      className={`inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer ${sizeClasses} ${colorClasses} ${className}`}
      aria-label={`Call ${business.businessName} at ${activeNumber}`}
    >
      <PhoneCall className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />
      <span>{displayLabel}</span>
    </a>
  );
}
