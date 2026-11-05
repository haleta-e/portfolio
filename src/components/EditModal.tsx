import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { EditModalState } from '../types';

interface EditModalProps {
  modalState: EditModalState;
  onClose: () => void;
  onSave: (type: string, data: any, id?: number) => void;
}

export const EditModal: React.FC<EditModalProps> = ({ modalState, onClose, onSave }) => {
  const { type, item, isOpen } = modalState;
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (item) {
      // Copy item into state
      setFormData({
        ...item,
        tech: Array.isArray(item.tech) ? item.tech.join(', ') : item.tech || '',
        technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies || '',
        responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join('\n') : item.responsibilities || '',
      });
    } else {
      // Defaults for creation
      if (type === 'project') {
        setFormData({
          title: '',
          category: 'frontend',
          description: '',
          image: 'image/project.jpg',
          tech: 'HTML, CSS, JavaScript',
          live: '',
          github: '',
        });
      } else if (type === 'skill') {
        setFormData({ name: '', description: '' });
      } else if (type === 'learning') {
        setFormData({ title: '', progress: 50 });
      } else if (type === 'experience') {
        setFormData({
          title: '',
          subtitle: '',
          description: '',
          technologies: '',
          responsibilities: '',
        });
      } else if (type === 'certificate') {
        setFormData({
          title: '',
          organization: '',
          description: '',
          image: 'https://i.imgur.com/dKELsFv.png',
        });
      } else if (type === 'profile') {
        setFormData({ name: '', bio: '', avatarUrl: '' });
      }
    }
  }, [type, item, isOpen]);

  if (!isOpen || !type) return null;

  const isEdit = !!item;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = { ...formData };

    if (type === 'project') {
      formattedData.tech = typeof formData.tech === 'string'
        ? formData.tech.split(',').map((t: string) => t.trim()).filter(Boolean)
        : formData.tech;
    } else if (type === 'experience') {
      formattedData.technologies = typeof formData.technologies === 'string'
        ? formData.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
        : formData.technologies;
      formattedData.responsibilities = typeof formData.responsibilities === 'string'
        ? formData.responsibilities.split('\n').map((r: string) => r.trim()).filter(Boolean)
        : formData.responsibilities;
    } else if (type === 'learning') {
      formattedData.progress = Math.min(100, Math.max(0, Number(formData.progress) || 0));
    }

    onSave(type, formattedData, item?.id);
    onClose();
  };

  const getTitle = () => {
    const action = isEdit ? 'Edit' : 'Add New';
    switch (type) {
      case 'profile': return `${action} Profile`;
      case 'project': return `${action} Project`;
      case 'skill': return `${action} Skill`;
      case 'learning': return `${action} Learning Progress`;
      case 'experience': return `${action} Experience`;
      case 'certificate': return `${action} Certificate`;
      default: return action;
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-6 my-8"
      >
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            {isEdit ? <Save className="text-sky-400" size={20} /> : <Plus className="text-sky-400" size={20} />}
            {getTitle()}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {type === 'profile' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Bio / Tagline</label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formData.bio || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Avatar Image URL (Optional)</label>
                <input
                  type="text"
                  name="avatarUrl"
                  value={formData.avatarUrl || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </>
          )}

          {type === 'project' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category || 'frontend'}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="frontend">Frontend</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  name="tech"
                  value={formData.tech || ''}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Tailwind"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Image URL or Path</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    name="live"
                    value={formData.live || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-1">GitHub Repo URL</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>
            </>
          )}

          {type === 'skill' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </>
          )}

          {type === 'learning' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Topic / Technology</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Progress Percentage (0 - 100)</label>
                <input
                  type="number"
                  name="progress"
                  min={0}
                  max={100}
                  value={formData.progress ?? 50}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </>
          )}

          {type === 'experience' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Subtitle / Organization & Year</label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle || ''}
                  onChange={handleChange}
                  placeholder="Frontend Track | 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Technologies (comma separated)</label>
                <input
                  type="text"
                  name="technologies"
                  value={formData.technologies || ''}
                  onChange={handleChange}
                  placeholder="Java, MySQL, Swing"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Responsibilities / Bullet Points (one per line)</label>
                <textarea
                  name="responsibilities"
                  rows={3}
                  value={formData.responsibilities || ''}
                  onChange={handleChange}
                  placeholder="Designed responsive user interfaces&#10;Implemented database connections"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </>
          )}

          {type === 'certificate' && (
            <>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Certificate Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Issuing Organization</label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  name="description"
                  rows={2}
                  value={formData.description || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-1">Certificate Image URL or Path</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image || ''}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold shadow-lg shadow-sky-500/20 transition-all hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
