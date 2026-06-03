'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Edit3, Trash2, Star, ToggleLeft, ToggleRight, Search } from 'lucide-react';
import { doctors as seedDoctors } from '@/data/doctors';

interface Doctor { id: string; name: string; title_prefix: string; role: string; specialization: string; image_url: string; experience_years: number; is_featured: boolean; is_active: boolean; department_id?: string; }

export default function DoctorsAdmin() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing]   = useState<Doctor | null>(null);

  useEffect(() => { fetchDoctors(); }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    const r = await fetch('/api/admin/doctors');
    if (r.ok) { setDoctors(await r.json()); }
    else {
      // fallback to seed data shaped as Doctor rows
      setDoctors(seedDoctors.map(d => ({
        id: d.id, name: d.name, title_prefix: d.titlePrefix, role: d.specialization,
        specialization: d.specialization, image_url: d.imageUrl, experience_years: d.experience,
        is_featured: false, is_active: d.isActive,
      })));
    }
    setLoading(false);
  };

  const toggleActive = async (id: string, current: boolean) => {
    await fetch(`/api/admin/doctors/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ is_active: !current }) });
    setDoctors(docs => docs.map(d => d.id === id ? { ...d, is_active: !current } : d));
  };

  const deleteDoctor = async (id: string) => {
    if (!confirm('Delete this doctor?')) return;
    await fetch(`/api/admin/doctors/${id}`, { method: 'DELETE' });
    setDoctors(docs => docs.filter(d => d.id !== id));
  };

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.specialization?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0F2340]" style={{ fontFamily: 'Cormorant Garamond, serif' }}>Doctors</h1>
          <p className="text-[#8896B3] text-sm">{doctors.length} specialist physicians</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-[#0F2340] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] transition-colors">
          <Plus className="w-4 h-4" /> Add Doctor
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896B3]" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search doctors..."
          className="w-full pl-9 pr-4 py-2.5 border border-[#D1DCF5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2340]/20 focus:border-[#0F2340]" />
      </div>

      {/* Grid */}
      {loading ? <div className="text-center py-12 text-[#8896B3]">Loading...</div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(doctor => (
            <div key={doctor.id} className={`bg-white rounded-xl border overflow-hidden shadow-sm ${!doctor.is_active ? 'opacity-60' : 'border-[#D1DCF5]'}`}>
              <div className="relative h-44 bg-[#EBF0FB]">
                <Image src={doctor.image_url || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&auto=format&fit=crop'}
                  alt={doctor.name} fill className="object-cover" sizes="25vw" />
                {doctor.is_featured && (
                  <div className="absolute top-2 left-2 bg-[#D4A017] text-[#0F2340] text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" /> Featured
                  </div>
                )}
              </div>
              <div className="p-4">
                <p className="font-bold text-[#0F2340] text-sm">{doctor.title_prefix} {doctor.name}</p>
                <p className="text-[#8896B3] text-xs mt-0.5">{doctor.specialization}</p>
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => { setEditing(doctor); setShowForm(true); }}
                    className="flex-1 flex items-center justify-center gap-1 border border-[#D1DCF5] text-[#4A5568] py-1.5 rounded-lg text-xs hover:bg-[#EBF0FB] transition-colors">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => toggleActive(doctor.id, doctor.is_active)}
                    className={`p-1.5 rounded-lg transition-colors ${doctor.is_active ? 'text-green-600 hover:bg-green-50' : 'text-[#8896B3] hover:bg-[#F0F4FF]'}`}>
                    {doctor.is_active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                  </button>
                  <button onClick={() => deleteDoctor(doctor.id)}
                    className="p-1.5 rounded-lg text-[#C8102E] hover:bg-red-50 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Form Modal */}
      {showForm && (
        <DoctorFormModal
          doctor={editing}
          onClose={() => { setShowForm(false); fetchDoctors(); }}
        />
      )}
    </div>
  );
}

function DoctorFormModal({ doctor, onClose }: { doctor: Doctor | null; onClose: () => void }) {
  const [form, setForm] = useState({
    name: doctor?.name || '', title_prefix: doctor?.title_prefix || 'Dr.',
    specialization: doctor?.specialization || '', role: doctor?.role || '',
    image_url: doctor?.image_url || '', experience_years: doctor?.experience_years || 0,
    is_featured: doctor?.is_featured || false, is_active: doctor?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const method = doctor ? 'PUT' : 'POST';
    const url = doctor ? `/api/admin/doctors/${doctor.id}` : '/api/admin/doctors';
    await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-[#0F2340] mb-5" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
          {doctor ? 'Edit Doctor' : 'Add New Doctor'}
        </h2>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Title</label>
              <select value={form.title_prefix} onChange={e => setForm(f => ({ ...f, title_prefix: e.target.value }))}
                className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F2340] bg-white">
                {['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">Full Name *</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F2340]"
                placeholder="e.g. Ginette Bekolo" />
            </div>
          </div>
          {[
            ['specialization', 'Specialization', 'e.g. General Practitioner'],
            ['role', 'Role / Position', 'e.g. Medical Director'],
            ['image_url', 'Photo URL', 'https://...'],
          ].map(([key, label, placeholder]) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-[#0F2340] mb-1">{label}</label>
              <input value={form[key as keyof typeof form] as string}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                className="w-full border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F2340]"
                placeholder={placeholder} />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-[#0F2340] mb-1">Years of Experience</label>
            <input type="number" value={form.experience_years} onChange={e => setForm(f => ({ ...f, experience_years: +e.target.value }))}
              className="w-32 border border-[#D1DCF5] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F2340]" />
          </div>
          <div className="flex gap-6">
            {[['is_featured', 'Featured on Homepage'], ['is_active', 'Active / Visible']].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form[key as keyof typeof form] as boolean}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                  className="w-4 h-4 accent-[#0F2340]" />
                <span className="text-sm text-[#2D2D2D]">{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 border border-[#D1DCF5] text-[#4A5568] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#F0F4FF]">Cancel</button>
          <button onClick={save} disabled={saving}
            className="flex-1 bg-[#0F2340] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1B3A6B] disabled:opacity-60">
            {saving ? 'Saving...' : 'Save Doctor'}
          </button>
        </div>
      </div>
    </div>
  );
}
