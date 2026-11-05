import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Briefcase, Calendar, AlertCircle } from 'lucide-react';
import { adminFetch } from './adminApi';

interface ExperienceModuleProps {
  initialEditingExp?: any;
  onExpUpdated?: () => void;
}

export const ExperienceModule: React.FC<ExperienceModuleProps> = ({
  initialEditingExp,
  onExpUpdated,
}) => {
  const [exp, setExp] = useState<any[]>([]);
  const [editingExp, setEditingExp] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchExp = () => {
    setLoading(true);
    adminFetch('/api/admin/experiences')
      .then((res) => res.json())
      .then((data) => {
        setExp(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setExp([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExp();
  }, []);

  useEffect(() => {
    if (initialEditingExp) {
      handleOpenEdit(initialEditingExp);
    }
  }, [initialEditingExp]);

  const handleOpenAdd = () => {
    setEditingExp({
      title: '',
      subtitle: '',
      organization: '',
      description: '',
      technologies: '',
      responsibilities: '',
      publication_status: 'published',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingExp({
      id: item.id,
      title: item.title || '',
      subtitle: item.subtitle || '',
      organization: item.organization || '',
      description: item.description || '',
      technologies: item.technologies || '',
      responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join('\n') : (item.responsibilities || ''),
      publication_status: item.publication_status || 'published',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      const res = await adminFetch(`/api/admin/experiences/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Delete failed: ${err.error || 'Unauthorized'}`);
        return;
      }
      fetchExp();
      if (onExpUpdated) onExpUpdated();
    } catch {
      alert('Network error deleting experience');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    const isEdit = !!editingExp.id;
    const url = isEdit ? `/api/admin/experiences/${editingExp.id}` : '/api/admin/experiences';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(editingExp),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setModalError(data.error || 'Failed to save experience');
        return;
      }

      setIsModalOpen(false);
      fetchExp();
      if (onExpUpdated) onExpUpdated();
    } catch (err: any) {
      setModalError(err.message || 'Error saving experience');
    }
  };

  const safeExp = Array.isArray(exp) ? exp : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Experience & Programs</h1>
          <p className="text-slate-400 text-sm">Manage training, software developer roles, and achievements.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg text-sm transition-transform hover:scale-105 cursor-pointer"
        >
          <Plus size={18} /> Add Experience
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400 py-12 text-center">Loading experiences...</div>
      ) : safeExp.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          No experience records found. Click "+ Add Experience" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {safeExp.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row justify-between gap-4 hover:border-slate-700 transition-colors">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                    <Briefcase size={16} />
                  </span>
                  <h3 className="font-bold text-white text-lg">{item.title}</h3>
                </div>
                <p className="text-sky-400 text-xs font-semibold">{item.subtitle}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
                {item.technologies && (
                  <p className="text-xs text-slate-500 pt-1">
                    <strong className="text-slate-400">Tech Stack:</strong> {item.technologies}
                  </p>
                )}
                {item.responsibilities && (
                  <div className="text-xs text-slate-400 whitespace-pre-line bg-slate-950/40 p-3 rounded-xl border border-slate-800/80 mt-2">
                    <strong className="text-slate-300 block mb-1">Key Duties & Contributions:</strong>
                    {item.responsibilities}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 self-start shrink-0">
                <button
                  onClick={() => handleOpenEdit(item)}
                  className="p-2 text-slate-400 hover:text-sky-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  title="Edit Experience"
                >
                  <Edit3 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                  title="Delete Experience"
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
                {editingExp.id ? 'Edit Experience' : 'Add Experience'}
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
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Role / Position Title</label>
                <input
                  type="text"
                  value={editingExp.title}
                  onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  required
                  placeholder="e.g. Frontend Development Trainee"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Subtitle / Organization & Year</label>
                <input
                  type="text"
                  value={editingExp.subtitle}
                  onChange={(e) => setEditingExp({ ...editingExp, subtitle: e.target.value })}
                  placeholder="e.g. Frontend Development Track | 2026"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingExp.description}
                  onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
                  required
                  placeholder="Summary of your role and accomplishments..."
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  value={editingExp.technologies}
                  onChange={(e) => setEditingExp({ ...editingExp, technologies: e.target.value })}
                  placeholder="e.g. HTML, CSS, JavaScript, Git"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Responsibilities & Achievements (one per line)</label>
                <textarea
                  rows={4}
                  value={editingExp.responsibilities}
                  onChange={(e) => setEditingExp({ ...editingExp, responsibilities: e.target.value })}
                  placeholder="Developed responsive interfaces&#10;Collaborated on Git branching"
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
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
