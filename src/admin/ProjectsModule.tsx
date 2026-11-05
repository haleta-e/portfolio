import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, ExternalLink, Sparkles, Check, X, Search, FolderGit2, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { adminFetch } from './adminApi';

interface ProjectsModuleProps {
  initialEditingProject?: any;
  onProjectUpdated?: () => void;
}

export const ProjectsModule: React.FC<ProjectsModuleProps> = ({
  initialEditingProject,
  onProjectUpdated,
}) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchProjects = () => {
    setLoading(true);
    adminFetch('/api/admin/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setProjects([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    if (initialEditingProject) {
      handleOpenEdit(initialEditingProject);
    }
  }, [initialEditingProject]);

  const handleOpenAdd = () => {
    setEditingProject({
      title: '',
      short_description: '',
      description: '',
      category: 'frontend',
      status: 'completed',
      publication_status: 'published',
      is_featured: false,
      github_url: '',
      live_demo_url: '',
      image: 'image/proj-card.png',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project: any) => {
    setEditingProject({
      ...project,
      title: project.title || '',
      short_description: project.short_description || project.description || '',
      description: project.description || project.short_description || '',
      category: project.category || 'frontend',
      status: project.status || 'completed',
      publication_status: project.publication_status || 'published',
      is_featured: !!project.is_featured,
      github_url: project.github_url || project.github || '',
      live_demo_url: project.live_demo_url || project.live || '',
      image: project.image || 'image/proj-card.png',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const res = await adminFetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Delete failed: ${err.error || 'Unauthorized'}`);
        return;
      }
      fetchProjects();
      if (onProjectUpdated) onProjectUpdated();
    } catch {
      alert('Network error deleting project');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    const isEdit = !!editingProject.id;
    const url = isEdit ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(editingProject),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setModalError(data.error || 'Failed to save project');
        return;
      }

      setIsModalOpen(false);
      fetchProjects();
      if (onProjectUpdated) onProjectUpdated();
    } catch (err: any) {
      setModalError(err.message || 'Error saving project');
    }
  };

  const safeProjects = Array.isArray(projects) ? projects : [];
  const totalCount = safeProjects.length;
  const featuredCount = safeProjects.filter((p) => p.is_featured).length;
  const draftCount = safeProjects.filter((p) => p.publication_status === 'draft').length;
  const publishedCount = safeProjects.filter((p) => p.publication_status === 'published').length;

  const filteredProjects = safeProjects.filter((p) =>
    (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.category || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Project Management</h1>
          <p className="text-slate-400 text-sm">Create, edit, feature, or unpublish portfolio projects.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-sky-500/20 text-sm transition-transform hover:scale-105 cursor-pointer"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FolderGit2 size={14} className="text-sky-400" /> Total
          </span>
          <span className="text-2xl font-black text-white mt-2">{totalCount}</span>
        </div>

        <div className="bg-slate-900 border border-amber-500/20 bg-amber-500/5 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} /> Featured
          </span>
          <span className="text-2xl font-black text-amber-400 mt-2">{featuredCount}</span>
        </div>

        <div className="bg-slate-900 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Published
          </span>
          <span className="text-2xl font-black text-emerald-400 mt-2">{publishedCount}</span>
        </div>

        <div className="bg-slate-900 border border-rose-500/20 bg-rose-500/5 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText size={14} /> Drafts
          </span>
          <span className="text-2xl font-black text-rose-400 mt-2">{draftCount}</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3.5 top-3.5 text-slate-500" />
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 text-sm"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-slate-400 py-12 text-center">Loading projects...</div>
      ) : filteredProjects.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          No projects found. Click "+ Add Project" to create one.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/80 text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Featured</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white flex items-center gap-3">
                      <img
                        src={project.image}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-slate-800"
                        onError={(e) => { (e.target as any).src = 'image/proj-card.png'; }}
                      />
                      <div>
                        <div className="font-bold text-white">{project.title}</div>
                        <div className="text-xs text-slate-500 font-normal truncate max-w-xs">{project.short_description || project.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-800 border border-slate-700 text-sky-400 uppercase">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${
                        project.publication_status === 'published'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {project.publication_status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {project.is_featured ? (
                        <span className="text-amber-400 flex items-center gap-1 text-xs font-bold">
                          <Sparkles size={14} /> Featured
                        </span>
                      ) : (
                        <span className="text-slate-600 text-xs">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(project)}
                        className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Editor */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
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

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">
                    Category (Type custom or select)
                  </label>
                  <input
                    type="text"
                    value={editingProject.category || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    placeholder="e.g. frontend, java, cpp, mobile, fullstack"
                    required
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm mb-2"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {['frontend', 'java', 'cpp', 'mobile', 'fullstack', 'ai', 'python'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setEditingProject({ ...editingProject, category: cat })}
                        className={`px-2 py-0.5 text-[11px] font-mono rounded border transition-colors cursor-pointer ${
                          editingProject.category?.toLowerCase() === cat
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
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Publication Status</label>
                  <select
                    value={editingProject.publication_status}
                    onChange={(e) => setEditingProject({ ...editingProject, publication_status: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={editingProject.is_featured}
                  onChange={(e) => setEditingProject({ ...editingProject, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-sky-500 focus:ring-sky-500 cursor-pointer"
                />
                <label htmlFor="is_featured" className="text-sm font-semibold text-slate-300 cursor-pointer">Feature this project on public homepage</label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Short Description</label>
                <input
                  type="text"
                  value={editingProject.short_description}
                  onChange={(e) => setEditingProject({ ...editingProject, short_description: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Description</label>
                <textarea
                  rows={4}
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Main Cover Image URL / File</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingProject.image}
                    onChange={(e) => setEditingProject({ ...editingProject, image: e.target.value })}
                    required
                    placeholder="image/proj-card.png or upload a file"
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                  <label className="px-4 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-xl text-xs font-bold cursor-pointer transition-colors whitespace-nowrap">
                    <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        setIsUploading(true);
                        const fd = new FormData();
                        fd.append('file', file);
                        try {
                          const res = await adminFetch('/api/admin/media/upload', { method: 'POST', body: fd });
                          const data = await res.json();
                          if (data.public_url || data.url) {
                            setEditingProject({ ...editingProject, image: data.public_url || data.url });
                          }
                        } catch {}
                        finally {
                          setIsUploading(false);
                        }
                      }}
                    />
                  </label>
                </div>
                {editingProject.image && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-slate-800/40 rounded-xl border border-slate-800">
                    <img
                      src={editingProject.image}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded-lg bg-slate-800"
                      onError={(e) => { (e.target as any).src = 'image/proj-card.png'; }}
                    />
                    <span className="text-xs text-slate-400 truncate">Preview: {editingProject.image}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">GitHub URL</label>
                  <input
                    type="url"
                    value={editingProject.github_url}
                    onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Live Demo URL</label>
                  <input
                    type="url"
                    value={editingProject.live_demo_url}
                    onChange={(e) => setEditingProject({ ...editingProject, live_demo_url: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 text-sm font-bold shadow-lg shadow-sky-500/20 cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
