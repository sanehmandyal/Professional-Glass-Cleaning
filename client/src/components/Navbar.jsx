import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { BUSINESS, whatsappLink, DEFAULT_WHATSAPP_MESSAGE } from '../utils/business';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/why-choose-us', label: 'Why Choose Us' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [window.location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'bg-white/85 backdrop-blur-xl shadow-glass' : 'bg-white/60 backdrop-blur-md'
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Link to="/">
          <Logo />
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-[15px] font-medium transition-colors ${
                    isActive ? 'text-skyline-600' : 'text-navy-800/80 hover:text-skyline-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          <a href={BUSINESS.phoneHref} className="btn-secondary !px-4 !py-2.5 text-sm">
            <Phone size={16} /> Call Now
          </a>
          <a
            href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp !px-4 !py-2.5 text-sm"
          >
            <MessageCircle size={16} /> WhatsApp
          </a>
        </div>

        <button
          className="lg:hidden text-navy-900 p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-skyline-100 bg-white">
          <ul className="container-x py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2.5 text-[15px] font-medium ${
                      isActive ? 'text-skyline-600' : 'text-navy-800/80'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="flex gap-3 pt-3">
              <a href={BUSINESS.phoneHref} className="btn-secondary flex-1 !py-2.5 text-sm">
                <Phone size={16} /> Call
              </a>
              <a
                href={whatsappLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1 !py-2.5 text-sm"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
