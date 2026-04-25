import React from 'react';
import { Activity, MapPin, Edit3, Trash2 } from 'lucide-react';

const FacilityList = ({ facility, onEdit, onDelete }) => {
  return (
    <div className="group bg-white border border-slate-200 rounded-[2rem] p-7 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-50 transition-colors duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className={`p-3 rounded-2xl ${facility.type === 'LAB' ? 'bg-indigo-50 text-indigo-600' : 'bg-orange-50 text-orange-600'}`}>
            <Activity size={24} />
          </div>
          
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => onEdit(facility)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
              <Edit3 size={18} />
            </button>

            <button onClick={() => onDelete(facility.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <h3 className="text-2xl font-black text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
          {facility.name}
        </h3>
        
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-6">
          <MapPin size={16} className="text-slate-300" />
          <p className="text-slate-500 font-medium">{facility.location}</p>
        </div>

        <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
          <span className={`text-[10px] font-black px-3 py-1.5 rounded-full tracking-wider shadow-sm ${
            facility.status === 'AVAILABLE' 
            ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200' 
            : 'bg-rose-50 text-rose-700 ring-1 ring-rose-200'
          }`}>
            {facility.status}
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {facility.type}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FacilityList;