import React from 'react';
import { X, Save } from 'lucide-react';

const FacilityForm = ({ formData, onChange, onSubmit, onClose, isEdit }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative animate-in zoom-in duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-slate-800">
              {isEdit ? "Update Facility" : "Add New Facility"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Facility Name</label>
              <input 
                name="name" value={formData.name} onChange={onChange} required
                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Advanced AI Lab"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Location</label>
              <input 
                name="location" value={formData.location} onChange={onChange} required
                className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Block C, 3rd Floor"
              />
            </div>

            <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Capacity</label>
                <input 
                    type="number"
                    name="capacity" value={formData.capacity} onChange={onChange} required
                    className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. 50"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Type</label>
                <select name="type" value={formData.type} onChange={onChange} className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="LAB">Laboratory</option>
                  <option value="LECTURE_HALL">Lecture Hall</option>
                  <option value="OFFICE">Office</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-400 mb-2 block tracking-widest">Status</label>
                <select name="status" value={formData.status} onChange={onChange} className="w-full bg-slate-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none">
                  <option value="AVAILABLE">Available</option>
                  <option value="UNAVAILABLE">Unavailable</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-all mt-4 shadow-lg shadow-blue-200 active:scale-95">
              <Save size={18} /> {isEdit ? "Update Facility" : "Add New Facility"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacilityForm;