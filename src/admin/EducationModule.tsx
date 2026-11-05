import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, GraduationCap, AlertCircle } from 'lucide-react';
import { adminFetch } from './adminApi';

interface EducationModuleProps {
  initialEditingEdu?: any;
  onEduUpdated?: () => void;
}

export const EducationModule: React.FC<EducationModuleProps> = ({
  initialEditingEdu,
  onEduUpdated,
}) => {
  const [edu, setEdu] = useState<any[]>([]);
  const [editingEdu, setEditingEdu] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchEdu = () => {
    setLoading(true);
    adminFetch('/api/admin/education')
      .then((res) => res.json())
      .then((data) => {
        setEdu(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setEdu([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchEdu();
  }, []);

  useEffect(() => {
    if (initialEditingEdu) {
      handleOpenEdit(initialEditingEdu);
    }
  }, [initialEditingEdu]);

  const handleOpenAdd = () => {
    setEditingEdu({
      institution: 'Addis Ababa University',
      qualification: 'Bachelor of Science (B.Sc.)',
      field_of_study: 'Computer Science',
      start_date: '2023',
      end_date: '2027',
      description: 'Focusing on software engineering, algorithms, databases, web development, and object-oriented architecture.',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingEdu({
      id: item.id,
      institution: item.institution || 'Addis Ababa University',
      qualification: item.qualification || 'Bachelor of Science (B.Sc.)',
      field_of_study: item.field_of_study || 'Computer Science',
      start_date: item.start_date || '2023',
      end_date: item.end_date || '2027',
      description: item.description || '',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this education record?')) return;
    try {
      const res = await adminFetch(`/api/admin/education/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Delete failed: ${err.error || 'Unauthorized'}`);
        return;
      }
      fetchEdu();
      if (onEduUpdated) onEduUpdated();
    } catch {
      alert('Network error deleting education record');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    const isEdit = !!editingEdu.id;
    const url = isEdit ? `/api/admin/education/${editingEdu.id}` : '/api/admin/education';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(editingEdu),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setModalError(data.error || 'Failed to save education record');
        return;
      }

      setIsModalOpen(false);
      fetchEdu();
      if (onEduUpdated) onEduUpdated();
    } catch (err: any) {
      setModalError(err.message || 'Error saving education record');
    }
  };

  const safeEdu = Array.isArray(edu) ? edu : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Education</h1>
          <p className="text-slate-400 text-sm">Academic credentials, universities, and field of study details.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg text-sm transition-transform hover:scale-105 cursor-pointer"
        >
          <Plus size={18} /> Add Education
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400 py-12 text-center">Loading education records...</div>
      ) : safeEdu.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          No education records found. Click "+ Add Education" to add one.
        </div>
      ) : (
        <div className="space-y-4">
          {safeEdu.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between gap-4 hover:border-slate-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sky-500/10 text-sky-400 rounded-xl shrink-0">
                  <GraduationCap size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-white text-lg">{item.qualification} in {item.field_of_study}</h3>
                  <p className="text-sky-400 font-semibold text-xs">{item.institution} ({item.start_date} - {item.end_date})</p>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-start shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 text-slate-400 hover:text-sky-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  title="Edit Education"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  title="Delete Education"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 max-h-[85vh] overflow-y-auto my-8 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white text-lg">
                {editingEdu.id ? 'Edit Education' : 'Add Education'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {modalError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Institution / University</label>
                <input
                  type="text"
                  value={editingEdu.institution}
                  onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
                  required
                  placeholder="e.g. Addis Ababa University"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Qualification / Degree</label>
                <input
                  type="text"
                  value={editingEdu.qualification}
                  onChange={(e) => setEditingEdu({ ...editingEdu, qualification: e.target.value })}
                  required
                  placeholder="e.g. Bachelor of Science (B.Sc.)"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Field of Study</label>
                <input
                  type="text"
                  value={editingEdu.field_of_study}
                  onChange={(e) => setEditingEdu({ ...editingEdu, field_of_study: e.target.value })}
                  required
                  placeholder="e.g. Computer Science"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Start Date</label>
                  <input
                    type="text"
                    value={editingEdu.start_date}
                    onChange={(e) => setEditingEdu({ ...editingEdu, start_date: e.target.value })}
                    placeholder="2023"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">End Date / Expected</label>
                  <input
                    type="text"
                    value={editingEdu.end_date}
                    onChange={(e) => setEditingEdu({ ...editingEdu, end_date: e.target.value })}
                    placeholder="2027"
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description / Coursework</label>
                <textarea
                  rows={3}
                  value={editingEdu.description}
                  onChange={(e) => setEditingEdu({ ...editingEdu, description: e.target.value })}
                  placeholder="Core focus areas, algorithms, software engineering..."
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-sky-500/20 cursor-pointer"
                >
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
