import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import apiClient from '../services/api';
import { faqsData } from '../data/servicesData';

const FAQ = () => {
  const [faqs, setFaqs] = useState(faqsData);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    apiClient
      .get('/faqs')
      .then((res) => {
        if (res.data?.data?.length) setFaqs(res.data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-3xl mx-auto divide-y divide-skyline-100">
      {faqs.map((faq, i) => (
        <div key={faq.question} className="py-4">
          <button
            className="w-full flex items-center justify-between text-left gap-4"
            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-navy-900">{faq.question}</span>
            <ChevronDown
              size={20}
              className={`shrink-0 text-skyline-600 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
            />
          </button>
          {openIndex === i && (
            <p className="mt-3 text-sm text-navy-800/70 leading-relaxed pr-8">{faq.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
