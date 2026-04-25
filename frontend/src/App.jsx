import React, { useEffect, useState } from 'react';
import API from './api';
import { Layout, MapPin, Activity, Plus, Search, Bell } from 'lucide-react';
import FacilityList from './components/FacilityList';
import FacilityForm from './components/FacilityForm';


const App = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'LAB',
    status: 'AVAILABLE',
    capacity: 0,
  });
  const [editingItem, setEditingItem] = useState(null);

  // Fetch facilities data from backend API
  const syncRegistry = async () => {
    try {
      const res = await API.get('/facilities');
      setLocations(res.data);
    } catch (err) {
      console.error("System synchronization failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    syncRegistry();
  }, []);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">Initializing Dashboard...</p>
      </div>
    </div>
  );

  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      if (editingItem) {
        await API.put(`/facilities/${editingItem.id}`, formData);
        alert("Facility updated successfully!");
      } else {
        await API.post('/facilities', formData);
        alert("Facility Added successfully!");
      }
      setIsModalOpen(false);
      setEditingItem(null);
      setFormData({ name: '', location: '', type: 'LAB', status: 'AVAILABLE', capacity: 0 });
      syncRegistry(); // Refresh data after submission
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      try {
        await API.delete(`/facilities/${id}`);
        alert("Facility deleted successfully!");
        syncRegistry(); // data Refresh
        } catch (err) {
          alert("Error: Could not delete the facility.");
      }
    }
  }

  const handleOpenEdit = (facility) => {
    console.log("Editing facility:", facility);
    setEditingItem(facility); 
    setFormData(facility);    // filled fields in Form 
    setIsModalOpen(true);     // Open modal for editing
  };




  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-blue-100">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-3 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-blue-200 shadow-lg">
              <Layout size={22} className="text-white" />
            </div>
            <div>
              <span className="font-black tracking-tight text-xl text-slate-800 block leading-none">SmartCampus</span>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Resource Hub</span>
            </div>
          </div>

          <div className="hidden md:flex items-center bg-slate-100 px-4 py-2 rounded-full w-96">
            <Search size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
            </button>
            <button onClick={() => setIsModalOpen(true)}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-2xl font-bold flex items-center gap-2">       
              <Plus size={20} /> New Facility Entry
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto p-6 md:p-10">
        <header className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">Facilities Portfolio</h1>
          <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
            Real-time monitoring and management of campus infrastructure, laboratories, and specialized learning spaces.
          </p>
        </header>

        {/* Dashboard Statistics Card */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Total Units</p>
            <p className="text-4xl font-black text-slate-900">{locations.length}</p>
          </div>
          <div className="bg-blue-600 p-6 rounded-3xl shadow-xl shadow-blue-100">
            <p className="text-xs font-black text-blue-100 uppercase tracking-widest mb-2">System Status</p>
            <p className="text-4xl font-black text-white italic tracking-tighter">Operational</p>
          </div>
        </section>

        {/* Facility List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <FacilityList
              key={loc.id} 
              facility={loc} 
              onEdit={handleOpenEdit} 
              onDelete={handleDelete}
            />
          ))}
        </div>
  

          {/* Facility Form Modal */}
          {isModalOpen && (
              <FacilityForm 
                  formData={formData} 
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                  onSubmit={handleSubmit}
                  onClose={() => setIsModalOpen(false)}
                  isEdit={!!editingItem}
                />
          )}
        </main>
      </div>
    );
  };
  
  export default App;