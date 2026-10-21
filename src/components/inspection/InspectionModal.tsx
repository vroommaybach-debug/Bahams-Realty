import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react';
import { useUI } from '../../context/UIContext.tsx';
import { useData } from '../../context/DataContext.tsx';
import { getWhatsAppUrl, getInspectionWhatsAppMessage } from '../../utils/whatsapp.ts';

export const InspectionModal: React.FC = () => {
  const { isModalOpen, closeInspectionModal, inspectionProperty } = useUI();
  const { addEnquiry } = useData();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [inspectionType, setInspectionType] = useState<'physical' | 'video'>('physical');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  if (!isModalOpen || !inspectionProperty) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !date) {
      setErrorMessage('Please fill in your name, phone number, and preferred date.');
      return;
    }
    setErrorMessage('');

    // Record into admin data store
    addEnquiry({
      type: 'inspection',
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      subject: `Inspection Booking for ${inspectionProperty.title}`,
      details: `${inspectionType === 'physical' ? 'Physical Viewing in Lagos' : 'Live Video Walkthrough'}. Preferred slot: ${date} at ${timeSlot}.`,
      propertyOrProjectTitle: inspectionProperty.title,
      propertyOrProjectId: inspectionProperty.id,
      preferredDate: date,
      preferredTime: timeSlot,
    });

    setIsSubmitted(true);
  };


  const handleWhatsAppDirect = () => {
    if (!name.trim() || !phone.trim()) {
      setErrorMessage('Please enter your name and phone number before opening WhatsApp.');
      return;
    }
    const msg = getInspectionWhatsAppMessage({
      propertyTitle: inspectionProperty.title,
      location: inspectionProperty.location,
      ref: inspectionProperty.id,
      preferredDate: date || 'Flexible',
      preferredTime: timeSlot,
      clientName: name,
    });
    const url = getWhatsAppUrl(msg);
    window.open(url, '_blank');
    closeInspectionModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-[#FAFAF8]">
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-[#0F5C4A]">
              Private Inspection
            </span>
            <h3 id="modal-title" className="text-lg font-bold text-[#1A1A1A]">
              Schedule Viewing
            </h3>
          </div>
          <button
            type="button"
            onClick={closeInspectionModal}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition-colors"
            aria-label="Close inspection modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#0F5C4A]/10 text-[#0F5C4A] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#1A1A1A]">
                Viewing Request Received
              </h4>
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-neutral-900">{name}</span>. Our lead
                advisory team for <span className="font-semibold text-neutral-900">{inspectionProperty.location}</span>{' '}
                has received your viewing schedule for{' '}
                <span className="font-semibold text-neutral-900">{date || 'your preferred date'}</span> at{' '}
                <span className="font-semibold text-neutral-900">{timeSlot}</span>. We will call you
                at <span className="font-semibold text-neutral-900">{phone}</span> to confirm access.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Confirmation on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={closeInspectionModal}
                  className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 rounded-md transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Property summary banner */}
              <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200/80 text-xs text-neutral-700">
                <p className="font-semibold text-neutral-900 line-clamp-1">{inspectionProperty.title}</p>
                <p className="text-neutral-500 mt-0.5">
                  Location: {inspectionProperty.location} · Ref ID: {inspectionProperty.id}
                </p>
              </div>

              {/* Physical vs Video Inspection toggle */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => setInspectionType('physical')}
                  className={`py-2 text-xs font-semibold rounded-md transition-all ${
                    inspectionType === 'physical'
                      ? 'bg-white text-[#1A1A1A] shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Physical Viewing (Lagos)
                </button>
                <button
                  type="button"
                  onClick={() => setInspectionType('video')}
                  className={`py-2 text-xs font-semibold rounded-md transition-all ${
                    inspectionType === 'video'
                      ? 'bg-white text-[#1A1A1A] shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  Live Video Walkthrough (Diaspora)
                </button>
              </div>

              {/* Date & Time fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <input
                      id="preferredDate"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                    />
                    <Calendar className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <select
                      id="preferredTime"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A] bg-white appearance-none"
                    >
                      <option value="10:00 AM">Morning (10:00 AM)</option>
                      <option value="12:00 PM">Midday (12:00 PM)</option>
                      <option value="2:30 PM">Afternoon (2:30 PM)</option>
                      <option value="4:30 PM">Late Afternoon (4:30 PM)</option>
                    </select>
                    <Clock className="w-4 h-4 text-neutral-400 absolute right-3 top-2.5 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Personal details */}
              <div>
                <label htmlFor="visitorName" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  id="visitorName"
                  type="text"
                  placeholder="e.g. Babajide Adeleke"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="visitorPhone" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="visitorPhone"
                    type="tel"
                    placeholder="+234 XXX XXX XXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                  />
                </div>
                <div>
                  <label htmlFor="visitorEmail" className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="visitorEmail"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-200">
                  {errorMessage}
                </p>
              )}

              {/* Action buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 bg-[#1A1A1A] hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900"
                >
                  Confirm Inspection
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#0F5C4A] hover:bg-[#0B4638] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#0F5C4A]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book via WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F5C4A]" />
                <span>Verified agent accompanied inspection · Strict privacy observed</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
