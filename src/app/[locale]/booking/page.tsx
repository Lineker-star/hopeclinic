'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { departments } from '@/data/departments';
import { doctors } from '@/data/doctors';
import { CheckCircle, ArrowRight, ArrowLeft, Calendar, Clock, User, ClipboardList, Heart } from 'lucide-react';

const steps = [
  { n: 1, label: 'Select Service', icon: Heart },
  { n: 2, label: 'Choose Doctor', icon: User },
  { n: 3, label: 'Date & Time', icon: Calendar },
  { n: 4, label: 'Your Details', icon: ClipboardList },
  { n: 5, label: 'Confirm', icon: CheckCircle },
];

const timeSlots = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30'];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState({
    department: '', doctor: '', date: '', time: '', reason: '', name: '', email: '', phone: '',
  });
  const [confirmed, setConfirmed] = useState(false);

  const filteredDoctors = selected.department
    ? doctors.filter(d => d.departmentSlug === selected.department)
    : doctors;

  const selectedDoctor = doctors.find(d => d.id === selected.doctor);
  const selectedDept = departments.find(d => d.slug === selected.department);

  if (confirmed) {
    return (
      <div className="min-h-screen bg-[#F9F6F1] flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Appointment Confirmed!
          </h2>
          <p className="text-[#5A5A5A] mb-6">
            Your appointment has been booked successfully. A confirmation email will be sent to <strong>{selected.email}</strong>.
          </p>
          <div className="bg-[#F9F6F1] rounded-xl p-4 text-left space-y-2 mb-6 text-sm">
            {selectedDoctor && <p><span className="text-[#9A9A9A]">Doctor:</span> <strong>{selectedDoctor.titlePrefix} {selectedDoctor.name}</strong></p>}
            {selectedDept && <p><span className="text-[#9A9A9A]">Department:</span> <strong>{selectedDept.name}</strong></p>}
            {selected.date && <p><span className="text-[#9A9A9A]">Date:</span> <strong>{selected.date}</strong></p>}
            {selected.time && <p><span className="text-[#9A9A9A]">Time:</span> <strong>{selected.time}</strong></p>}
          </div>
          <div className="flex gap-3">
            <Link href="/" className="flex-1 border-2 border-[#C8102E] text-[#C8102E] py-2.5 rounded-xl text-sm font-semibold hover:bg-red-50 transition-colors text-center">
              Go Home
            </Link>
            <button onClick={() => { setStep(1); setConfirmed(false); setSelected({ department: '', doctor: '', date: '', time: '', reason: '', name: '', email: '', phone: '' }); }}
              className="flex-1 bg-[#C8102E] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#8B0000] transition-colors">
              Book Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F6F1] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[#C8102E] font-semibold text-sm uppercase tracking-widest">Online Booking</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1A1A1A] mt-1" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
            Book an Appointment
          </h1>
          <p className="text-[#9A9A9A] text-sm mt-1">Schedule your visit in just a few steps</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {steps.map(({ n, label, icon: Icon }, i) => (
            <div key={n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  n < step ? 'bg-green-500 text-white' : n === step ? 'bg-[#C8102E] text-white' : 'bg-white border-2 border-[#E5E1DC] text-[#9A9A9A]'
                }`}>
                  {n < step ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs mt-1 font-medium whitespace-nowrap ${n === step ? 'text-[#C8102E]' : 'text-[#9A9A9A]'}`}>{label}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-0.5 w-8 sm:w-16 mx-1 transition-all ${n < step ? 'bg-green-500' : 'bg-[#E5E1DC]'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Select a Department</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {departments.map((dept) => (
                  <button
                    key={dept.slug}
                    onClick={() => setSelected(s => ({ ...s, department: dept.slug }))}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      selected.department === dept.slug
                        ? 'border-[#C8102E] bg-[#C8102E]/5'
                        : 'border-[#E5E1DC] hover:border-[#C8102E]/50'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg flex-shrink-0" style={{ backgroundColor: `${dept.color}20` }}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-lg">{dept.order <= 3 ? ['🚨','🏥','⚕️'][dept.order-1] : '💊'}</span>
                      </div>
                    </div>
                    <div>
                      <p className={`font-semibold text-sm ${selected.department === dept.slug ? 'text-[#C8102E]' : 'text-[#1A1A1A]'}`}>{dept.name}</p>
                      <p className="text-[#9A9A9A] text-xs line-clamp-1">{dept.description.slice(0, 50)}...</p>
                    </div>
                    {selected.department === dept.slug && <CheckCircle className="w-5 h-5 text-[#C8102E] ml-auto flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Doctor */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Choose a Doctor</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {filteredDoctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    onClick={() => setSelected(s => ({ ...s, doctor: doctor.id }))}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
                      selected.doctor === doctor.id
                        ? 'border-[#C8102E] bg-[#C8102E]/5'
                        : 'border-[#E5E1DC] hover:border-[#C8102E]/50'
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm ${selected.doctor === doctor.id ? 'text-[#C8102E]' : 'text-[#1A1A1A]'}`}>
                        {doctor.titlePrefix} {doctor.name}
                      </p>
                      <p className="text-[#9A9A9A] text-xs">{doctor.specialization}</p>
                      <p className="text-[#9A9A9A] text-xs">{doctor.experience}+ years experience</p>
                    </div>
                    {selected.doctor === doctor.id && <CheckCircle className="w-5 h-5 text-[#C8102E] flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Select Date & Time</h2>
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2D2D2D] mb-2">Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={selected.date}
                  onChange={(e) => setSelected(s => ({ ...s, date: e.target.value }))}
                  className="w-full sm:w-64 border border-[#E5E1DC] rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2D2D2D] mb-3">Time Slot *</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelected(s => ({ ...s, time: slot }))}
                      className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        selected.time === slot
                          ? 'bg-[#C8102E] border-[#C8102E] text-white'
                          : 'bg-white border-[#E5E1DC] text-[#2D2D2D] hover:border-[#C8102E] hover:text-[#C8102E]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Details */}
          {step === 4 && (
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Your Details</h2>
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Full Name *</label>
                    <input type="text" value={selected.name} onChange={(e) => setSelected(s => ({ ...s, name: e.target.value }))} placeholder="Your full name"
                      className="w-full border border-[#E5E1DC] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Email *</label>
                    <input type="email" value={selected.email} onChange={(e) => setSelected(s => ({ ...s, email: e.target.value }))} placeholder="your@email.com"
                      className="w-full border border-[#E5E1DC] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Phone Number</label>
                  <input type="tel" value={selected.phone} onChange={(e) => setSelected(s => ({ ...s, phone: e.target.value }))} placeholder="+237 ..."
                    className="w-full border border-[#E5E1DC] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#2D2D2D] mb-1.5">Reason for Visit *</label>
                  <textarea rows={4} value={selected.reason} onChange={(e) => setSelected(s => ({ ...s, reason: e.target.value }))} placeholder="Briefly describe your symptoms or reason for the appointment..."
                    className="w-full border border-[#E5E1DC] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30 focus:border-[#C8102E] resize-none" />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Confirm */}
          {step === 5 && (
            <div>
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Confirm Your Appointment</h2>
              <div className="bg-[#F9F6F1] rounded-xl p-6 space-y-3 text-sm mb-6">
                {selectedDept && (
                  <div className="flex justify-between border-b border-[#E5E1DC] pb-3">
                    <span className="text-[#9A9A9A]">Department</span>
                    <span className="font-semibold text-[#1A1A1A]">{selectedDept.name}</span>
                  </div>
                )}
                {selectedDoctor && (
                  <div className="flex justify-between border-b border-[#E5E1DC] pb-3">
                    <span className="text-[#9A9A9A]">Doctor</span>
                    <span className="font-semibold text-[#1A1A1A]">{selectedDoctor.titlePrefix} {selectedDoctor.name}</span>
                  </div>
                )}
                {selected.date && (
                  <div className="flex justify-between border-b border-[#E5E1DC] pb-3">
                    <span className="text-[#9A9A9A]">Date</span>
                    <span className="font-semibold text-[#1A1A1A]">{new Date(selected.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                )}
                {selected.time && (
                  <div className="flex justify-between border-b border-[#E5E1DC] pb-3">
                    <span className="text-[#9A9A9A]">Time</span>
                    <span className="font-semibold text-[#1A1A1A]">{selected.time}</span>
                  </div>
                )}
                {selected.name && (
                  <div className="flex justify-between border-b border-[#E5E1DC] pb-3">
                    <span className="text-[#9A9A9A]">Patient</span>
                    <span className="font-semibold text-[#1A1A1A]">{selected.name}</span>
                  </div>
                )}
                {selected.reason && (
                  <div className="flex justify-between">
                    <span className="text-[#9A9A9A]">Reason</span>
                    <span className="font-semibold text-[#1A1A1A] text-right max-w-[60%]">{selected.reason}</span>
                  </div>
                )}
              </div>
              <p className="text-[#9A9A9A] text-xs">
                By confirming, you agree to our cancellation policy. Cancellations must be made at least 24 hours in advance.
              </p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-[#E5E1DC]">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-[#5A5A5A] border border-[#E5E1DC] px-5 py-2.5 rounded-xl text-sm font-semibold hover:border-[#C8102E] hover:text-[#C8102E] transition-all">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                onClick={() => setStep(s => s + 1)}
                disabled={
                  (step === 1 && !selected.department) ||
                  (step === 2 && !selected.doctor) ||
                  (step === 3 && (!selected.date || !selected.time)) ||
                  (step === 4 && (!selected.name || !selected.email || !selected.reason))
                }
                className="flex items-center gap-2 bg-[#C8102E] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#8B0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setConfirmed(true)}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" /> Confirm Appointment
              </button>
            )}
          </div>
        </div>

        {/* Auth note */}
        <div className="mt-4 text-center text-sm text-[#9A9A9A]">
          Have an account?{' '}
          <Link href="/auth/login?redirect=/booking" className="text-[#C8102E] font-semibold hover:underline">
            Login
          </Link>
          {' '}to save your appointment history.
        </div>
      </div>
    </div>
  );
}
