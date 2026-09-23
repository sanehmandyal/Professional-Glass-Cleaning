import {
  Sparkles, Wrench, Droplet, Hammer, Waves, PanelTop, Building2, Home,
  Store, AlertTriangle, Phone, MessageCircle, MapPin, CheckCircle2,
} from 'lucide-react';

export const iconMap = {
  Sparkles, Wrench, Droplet, Hammer, Waves, PanelTop, Building2, Home,
  Store, AlertTriangle, Phone, MessageCircle, MapPin, CheckCircle2,
};

export const getIcon = (name) => iconMap[name] || Sparkles;
