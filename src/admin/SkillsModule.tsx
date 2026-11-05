import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, AlertCircle } from 'lucide-react';
import { adminFetch } from './adminApi';

interface SkillsModuleProps {
  initialEditingSkill?: any;
  onSkillUpdated?: () => void;
}

export const SkillsModule: React.FC<SkillsModuleProps> = ({
  initialEditingSkill,
  onSkillUpdated,
}) => {
  const [skills, setSkills] = useState<any[]>([]);
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchSkills = () => {
    setLoading(true);
    adminFetch('/api/admin/skills')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSkills(data);
        } else {
          setSkills([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setSkills([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {
    if (initialEditingSkill) {
      handleOpenEdit(initialEditingSkill);
    }
  }, [initialEditingSkill]);

  const handleOpenAdd = () => {
    setEditingSkill({ name: '', category: 'Frontend', description: '', is_visible: true });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: any) => {
    setEditingSkill({
      id: skill.id,
      name: skill.name || '',
      category: skill.category || 'Frontend',
      description: skill.description || '',
      is_visible: skill.is_visible !== undefined ? !!skill.is_visible : true,
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      const res = await adminFetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Delete failed: ${err.error || 'Unauthorized'}`);
        return;
      }
      fetchSkills();
      if (onSkillUpdated) onSkillUpdated();
    } catch {
      alert('Network error deleting skill');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    const isEdit = !!editingSkill.id;
    const url = isEdit ? `/api/admin/skills/${editingSkill.id}` : '/api/admin/skills';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(editingSkill),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setModalError(data.error || 'Failed to save skill');
        return;
      }

      setIsModalOpen(false);
      fetchSkills();
      if (onSkillUpdated) onSkillUpdated();
    } catch (err: any) {
      setModalError(err.message || 'Error saving skill');
    }
  };

  const safeSkills = Array.isArray(skills) ? skills : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Skills & Capabilities</h1>
          <p className="text-slate-400 text-sm">Manage skills, categories, and technical descriptions.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-sky-500/20 text-sm cursor-pointer"
        >
          <Plus size={18} /> Add Skill
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400 py-12 text-center">Loading skills...</div>
      ) : safeSkills.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          No skills found. Click "+ Add Skill" to create one.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Skill Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {safeSkills.map((skill) => (
                <tr key={skill.id} className="hover:bg-slate-800/40">
                  <td className="px-6 py-4 font-bold text-white">{skill.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 text-sky-400">
                      {skill.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs max-w-sm">{skill.description}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleOpenEdit(skill)} className="p-1.5 text-slate-400 hover:text-sky-400 cursor-pointer" title="Edit Skill">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => handleDelete(skill.id)} className="p-1.5 text-slate-400 hover:text-rose-400 cursor-pointer" title="Delete Skill">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="font-bold text-white text-lg">{editingSkill.id ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer"><X size={20} /></button>
            </div>

            {modalError && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle size={16} />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Skill Name</label>
                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  required
                  placeholder="e.g. React, Java, Git"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Category (Type custom or select)</label>
                <input
                  type="text"
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  placeholder="e.g. Frontend, Languages, Tools, Data, Backend"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm mb-2"
                />
                <div className="flex flex-wrap gap-1.5">
                  {['Frontend', 'Languages', 'Tools', 'Data', 'Backend', 'Learning'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setEditingSkill({ ...editingSkill, category: cat })}
                      className={`px-2 py-0.5 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                        editingSkill.category === cat
                          ? 'bg-sky-500/20 border-sky-500 text-sky-300 font-bold'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingSkill.description}
                  onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                  required
                  placeholder="Practical proficiency description..."
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-sky-500 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-sky-500/20 cursor-pointer">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
