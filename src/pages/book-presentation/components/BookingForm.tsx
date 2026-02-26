
import { useState, useRef, useEffect } from 'react';

const presentationTypes = [
  'In-Person Showroom Visit',
  'Virtual Presentation',
  'On-Site Consultation',
];

const projectTypes = [
  'Hospitality',
  'Residential',
  'Commercial',
  'Retail',
  'Entertainment',
  'Other',
];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function BookingForm() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    presentationType: '',
    projectType: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'notes' && value.length > 500) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart || date.getDay() === 0;
  };

  const handleDateClick = (day: number) => {
    if (isDateDisabled(day)) return;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    const [y, m, d] = selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isPrevDisabled =
    currentYear === today.getFullYear() && currentMonth === today.getMonth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const body = new URLSearchParams();
      body.append('firstName', formData.firstName);
      body.append('lastName', formData.lastName);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('company', formData.company);
      body.append('presentationType', formData.presentationType);
      body.append('projectType', formData.projectType);
      body.append('preferredDate', formatSelectedDate());
      body.append('preferredTime', selectedTime);
      body.append('notes', formData.notes);

      const res = await fetch('https://readdy.ai/api/form/d6etlauqd308q1a0arj0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          presentationType: '',
          projectType: '',
          notes: '',
        });
        setSelectedDate('');
        setSelectedTime('');
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green placeholder:text-hulma-brown/40 focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all';
  const selectClass =
    'w-full px-4 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-lg text-sm text-hulma-green focus:outline-none focus:border-hulma-orange/60 focus:bg-white/60 transition-all cursor-pointer appearance-none';
  const selectBg = {
    backgroundImage:
      'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23766C62\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
  };

  return (
    <section ref={sectionRef} className="relative py-20 px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-hulma-ghost"></div>

      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(177, 141, 117, 0.15) 0%, transparent 70%)' }}
      ></div>

      <div
        className={`relative z-10 max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Calendar Side */}
          <div className="lg:col-span-3">
            <div
              className="rounded-3xl p-8 md:p-10"
              style={{
                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.05)',
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-hulma-brown/60 mb-6">
                01 / Select Date &amp; Time
              </p>

              {/* Calendar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-5">
                  <button
                    onClick={handlePrevMonth}
                    disabled={isPrevDisabled}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-hulma-ghost transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <i className="ri-arrow-left-s-line text-lg text-hulma-green"></i>
                  </button>
                  <h3 className="text-sm font-medium text-hulma-green">
                    {monthNames[currentMonth]} {currentYear}
                  </h3>
                  <button
                    onClick={handleNextMonth}
                    className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-hulma-ghost transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-right-s-line text-lg text-hulma-green"></i>
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {dayNames.map((d) => (
                    <div key={d} className="text-center text-[11px] font-medium text-hulma-brown/50 py-2">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-10"></div>
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const isSelected = selectedDate === dateStr;
                    const disabled = isDateDisabled(day);
                    const isToday =
                      day === today.getDate() &&
                      currentMonth === today.getMonth() &&
                      currentYear === today.getFullYear();

                    return (
                      <button
                        key={day}
                        onClick={() => handleDateClick(day)}
                        disabled={disabled}
                        className={`h-10 rounded-lg text-sm font-medium transition-all cursor-pointer
                          ${disabled ? 'text-hulma-brown/20 cursor-not-allowed' : ''}
                          ${isSelected ? 'bg-hulma-green text-white' : ''}
                          ${!isSelected && !disabled ? 'text-hulma-green hover:bg-hulma-orange/10' : ''}
                          ${isToday && !isSelected ? 'ring-1 ring-hulma-orange/40' : ''}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <div className="mb-6">
                  <p className="text-xs font-medium text-hulma-green mb-3">
                    Available times for {formatSelectedDate()}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap
                          ${selectedTime === time
                            ? 'bg-hulma-green text-white'
                            : 'bg-white/50 text-hulma-green border border-white/60 hover:border-hulma-orange/40'}
                        `}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Summary */}
              {selectedDate && selectedTime && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-hulma-orange/10 border border-hulma-orange/20">
                  <span className="w-5 h-5 flex items-center justify-center text-hulma-orange">
                    <i className="ri-calendar-check-line text-base"></i>
                  </span>
                  <p className="text-sm text-hulma-green">
                    <strong>{formatSelectedDate()}</strong> at <strong>{selectedTime}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Details Form Side */}
          <div className="lg:col-span-2">
            <div
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.05)',
              }}
            >
              <form
                id="booking-form"
                data-readdy-form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[2px] text-hulma-brown/60 mb-2">
                  02 / Your Details
                </p>

                <div>
                  <label
                    htmlFor="booking-firstName"
                    className="block text-xs font-medium text-hulma-green mb-1.5"
                  >
                    First Name <span className="text-hulma-orange">*</span>
                  </label>
                  <input
                    type="text"
                    id="booking-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Juan"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-lastName"
                    className="block text-xs font-medium text-hulma-green mb-1.5"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="booking-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Dela Cruz"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-xs font-medium text-hulma-green mb-1.5"
                  >
                    Email <span className="text-hulma-orange">*</span>
                  </label>
                  <input
                    type="email"
                    id="booking-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@company.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs font-medium text-hulma-green mb-1.5"
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="booking-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+63 912 345 6789"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-company"
                    className="block text-xs font-medium text-hulma-green mb-1.5"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="booking-company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="booking-presentationType"
                    className="block text-xs font-medium text-hulma-green mb-1.5"
                  >
                    Presentation Type
                  </label>
                  <select
                    id="booking-presentationType"
                    name="presentationType"
                    value={formData.presentationType}
                    onChange={handleChange}
                    className={selectClass}
                    style={selectBg}
                  >
                    <option value="">Select type</option>
                    {presentationTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="booking-projectType"
                    className="block text-xs font-medium text-hulma-green mb-1.5"
                  >
                    Project Type
                  </label>
                  <select
                    id="booking-projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className={selectClass}
                    style={selectBg}
                  >
                    <option value="">Select type</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="booking-notes"
                    className="block text-xs font-medium text-hulma-green mb-1.5"
                  >
                    Additional Notes
                  </label>
                  <textarea
                    id="booking-notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    maxLength={500}
                    rows={3}
                    placeholder="Any specific materials or products you want to see..."
                    className={`${inputClass} resize-none`}
                  />
                  <p className="text-right text-[11px] text-hulma-brown/50 mt-1">
                    {formData.notes.length}/500
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !selectedDate || !selectedTime}
                  className="w-full py-4 bg-hulma-green text-white rounded-full text-sm font-medium hover:bg-hulma-brown transition-all whitespace-nowrap cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 flex items-center justify-center animate-spin">
                        <i className="ri-loader-4-line text-sm"></i>
                      </span>
                      Booking...
                    </>
                  ) : (
                    <>
                      Confirm Booking
                      <span className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-calendar-check-line text-sm"></i>
                      </span>
                    </>
                  )}
                </button>

                {!selectedDate && (
                  <p className="text-center text-xs text-hulma-brown/50">
                    Please select a date and time first
                  </p>
                )}

                {submitStatus === 'success' && (
                  <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-green-50/80 backdrop-blur-sm border border-green-200/60">
                    <span className="w-5 h-5 flex items-center justify-center text-green-600">
                      <i className="ri-check-line text-lg"></i>
                    </span>
                    <p className="text-sm text-green-700">
                      Booking confirmed! We&apos;ll send a confirmation email shortly.
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-50/80 backdrop-blur-sm border border-red-200/60">
                    <span className="w-5 h-5 flex items-center justify-center text-red-600">
                      <i className="ri-error-warning-line text-lg"></i>
                    </span>
                    <p className="text-sm text-red-700">
                      Something went wrong. Please try again.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
