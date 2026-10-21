import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext.tsx';
import { getWhatsAppUrl } from '../../utils/whatsapp.ts';

interface ContactFormProps {
  initialInterest?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ initialInterest = 'Buying', className = '' }) => {
  const { addEnquiry } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState(initialInterest);
  const [budget, setBudget] = useState('₦100M – ₦300M');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!phone.trim()) {
      errs.phone = 'Phone / WhatsApp number is required';
    } else if (phone.trim().length < 8) {
      errs.phone = 'Please provide a valid phone number';
    }
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!message.trim()) {
      errs.message = 'Please let us know your requirements';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addEnquiry({
      type: interest === 'Investing' ? 'development' : 'contact',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      subject: `${interest} Enquiry (Budget: ${budget})`,
      details: message.trim(),
      budget,
    });

    setSubmitted(true);
  };


  const handleWhatsAppSubmit = () => {
    if (!name.trim() || !phone.trim()) {
      setErrors({
        name: !name.trim() ? 'Name required' : '',
        phone: !phone.trim() ? 'Phone required' : '',
      });
      return;
    }
    const fullMessage = `Hello Bahams Realty,\n\nI would like to make an enquiry:\n- Name: ${name}\n- Phone: ${phone}\n- Email: ${email || 'Not provided'}\n- Interest: ${interest}\n- Budget: ${budget}\n\nMessage: ${message || 'Please contact me with available options.'}`;
    const url = getWhatsAppUrl(fullMessage);
    window.open(url, '_blank');
  };

  if (submitted) {
    return (
      <div className={`bg-white rounded-xl border border-[#E5E5E0] p-8 text-center space-y-4 shadow-xs ${className}`}>
        <div className="w-14 h-14 bg-[#0F5C4A]/10 text-[#0F5C4A] rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-[#1A1A1A]">Enquiry Successfully Submitted</h3>
        <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
          Thank you, <span className="font-semibold text-neutral-900">{name}</span>. A senior Bahams Realty
          advisory partner will review your requirements for{' '}
          <span className="font-semibold text-neutral-900">{interest}</span> and reach out to you at{' '}
          <span className="font-semibold text-neutral-900">{phone}</span> within 2 business hours.
        </p>
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleWhatsAppSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Connect on WhatsApp Now</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setMessage('');
            }}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 rounded-md transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-xl border border-[#E5E5E0] p-6 sm:p-8 space-y-5 shadow-xs ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label htmlFor="contactName" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
            Full Name *
          </label>
          <input
            id="contactName"
            type="text"
            placeholder="e.g. Babatunde Adeleke"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors({ ...errors, name: '' });
            }}
            className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] transition-colors ${
              errors.name ? 'border-red-400 bg-red-50/20' : 'border-neutral-300'
            }`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="contactPhone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
            Phone / WhatsApp Number *
          </label>
          <input
            id="contactPhone"
            type="tel"
            placeholder="+234 XXX XXX XXXX"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors({ ...errors, phone: '' });
            }}
            className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] transition-colors ${
              errors.phone ? 'border-red-400 bg-red-50/20' : 'border-neutral-300'
            }`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Email */}
        <div>
          <label htmlFor="contactEmail" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
            Email Address *
          </label>
          <input
            id="contactEmail"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: '' });
            }}
            className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] transition-colors ${
              errors.email ? 'border-red-400 bg-red-50/20' : 'border-neutral-300'
            }`}
          />
          {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
        </div>

        {/* Interest Type */}
        <div>
          <label htmlFor="contactInterest" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
            I am Interested In
          </label>
          <select
            id="contactInterest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] bg-white appearance-none"
          >
            <option value="Buying">Buying a Residential Property</option>
            <option value="Renting">Renting / Prime Lettings</option>
            <option value="Selling">Selling or Letting My Property</option>
            <option value="Investing">Off-Plan Development Investment</option>
            <option value="Land Acquisition">Land & Commercial Acquisition</option>
            <option value="Other">General Advisory / Other</option>
          </select>
        </div>
      </div>

      {/* Budget Range Dropdown */}
      <div>
        <label htmlFor="contactBudget" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
          Budget Range (₦)
        </label>
        <select
          id="contactBudget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full px-3.5 py-2.5 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] bg-white appearance-none"
        >
          <option value="Under ₦50M">Under ₦50 Million (Rental / Starter)</option>
          <option value="₦50M – ₦100M">₦50 Million – ₦100 Million</option>
          <option value="₦100M – ₦300M">₦100 Million – ₦300 Million (Lekki / Mainland Luxury)</option>
          <option value="₦300M – ₦700M">₦300 Million – ₦700 Million (VI & Ikoyi Luxury)</option>
          <option value="₦700M – ₦1.5B">₦700 Million – ₦1.5 Billion (Prime Island Trophy)</option>
          <option value="₦1.5B+">Above ₦1.5 Billion (Banana Island Waterfront)</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contactMessage" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
          Specific Requirements or Preferred Locations *
        </label>
        <textarea
          id="contactMessage"
          rows={4}
          placeholder="Tell us about the property type, preferred area (e.g. Ikoyi, Lekki Phase 1), timeline, or specific features you need..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          className={`w-full px-3.5 py-2.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] transition-colors ${
            errors.message ? 'border-red-400 bg-red-50/20' : 'border-neutral-300'
          }`}
        />
        {errors.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message}</p>}
      </div>

      {/* Form CTAs */}
      <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
        <button
          type="submit"
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F5C4A]"
        >
          <Send className="w-4 h-4" />
          <span>Submit Confidential Enquiry</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsAppSubmit}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
        >
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Send via WhatsApp</span>
        </button>
      </div>
    </form>
  );
};
