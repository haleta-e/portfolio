import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, X, Award, Upload, AlertCircle } from 'lucide-react';
import { adminFetch } from './adminApi';

interface CertificatesModuleProps {
  initialEditingCert?: any;
  onCertUpdated?: () => void;
}

export const CertificatesModule: React.FC<CertificatesModuleProps> = ({
  initialEditingCert,
  onCertUpdated,
}) => {
  const [certs, setCerts] = useState<any[]>([]);
  const [editingCert, setEditingCert] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalError, setModalError] = useState<string | null>(null);

  const fetchCerts = () => {
    setLoading(true);
    adminFetch('/api/admin/certificates')
      .then((res) => res.json())
      .then((data) => {
        setCerts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setCerts([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  useEffect(() => {
    if (initialEditingCert) {
      handleOpenEdit(initialEditingCert);
    }
  }, [initialEditingCert]);

  const handleOpenAdd = () => {
    setEditingCert({
      title: '',
      issuing_organization: 'ECODERS',
      description: '',
      image: 'image/cer-programing.png',
      publication_status: 'published',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert: any) => {
    setEditingCert({
      id: cert.id,
      title: cert.title || '',
      issuing_organization: cert.issuing_organization || cert.organization || 'ECODERS',
      description: cert.description || '',
      image: cert.image || 'image/cer-programing.png',
      publication_status: cert.publication_status || 'published',
    });
    setModalError(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this certificate record?')) return;
    try {
      const res = await adminFetch(`/api/admin/certificates/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(`Delete failed: ${err.error || 'Unauthorized'}`);
        return;
      }
      fetchCerts();
      if (onCertUpdated) onCertUpdated();
    } catch {
      alert('Network error deleting certificate');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);
    const isEdit = !!editingCert.id;
    const url = isEdit ? `/api/admin/certificates/${editingCert.id}` : '/api/admin/certificates';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await adminFetch(url, {
        method,
        body: JSON.stringify(editingCert),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setModalError(data.error || 'Failed to save certificate');
        return;
      }

      setIsModalOpen(false);
      fetchCerts();
      if (onCertUpdated) onCertUpdated();
    } catch (err: any) {
      setModalError(err.message || 'Error saving certificate');
    }
  };

  const safeCerts = Array.isArray(certs) ? certs : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Certificates & Achievements</h1>
          <p className="text-slate-400 text-sm">Upload, edit and manage certificates and credential documents.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg text-sm transition-transform hover:scale-105 cursor-pointer"
        >
          <Plus size={18} /> Add Certificate
        </button>
      </div>

      {loading ? (
        <div className="text-slate-400 py-12 text-center">Loading certificates...</div>
      ) : safeCerts.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400">
          No certificates found. Click "+ Add Certificate" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {safeCerts.map((cert) => (
            <div key={cert.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-5 flex gap-4 hover:border-slate-700 transition-colors">
              <img
                src={cert.image}
                alt=""
                className="w-24 h-24 object-cover rounded-xl bg-slate-800 shrink-0"
                onError={(e) => { (e.target as any).src = 'image/cer-programing.png'; }}
              />
              <div className="flex-1 space-y-1">
                <span className="text-xs font-semibold text-sky-400 uppercase flex items-center gap-1">
                  <Award size={14} /> {cert.issuing_organization || cert.organization}
                </span>
                <h3 className="font-bold text-white text-base">{cert.title}</h3>
                <p className="text-slate-400 text-xs line-clamp-2">{cert.description}</p>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(cert)}
                    className="p-1.5 text-slate-400 hover:text-sky-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="Edit Certificate"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cert.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                    title="Delete Certificate"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
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
                {editingCert.id ? 'Edit Certificate' : 'Add Certificate'}
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
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Certificate Title</label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  required
                  placeholder="e.g. Android Developer Fundamentals"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Issuing Organization</label>
                <input
                  type="text"
                  value={editingCert.issuing_organization}
                  onChange={(e) => setEditingCert({ ...editingCert, issuing_organization: e.target.value })}
                  required
                  placeholder="e.g. ECODERS or INSA"
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Certificate Image / File</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editingCert.image}
                    onChange={(e) => setEditingCert({ ...editingCert, image: e.target.value })}
                    required
                    placeholder="image/cer-programing.png or upload file"
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
                  />
                  <label className="px-4 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-xl text-xs font-bold cursor-pointer transition-colors whitespace-nowrap">
                    <span>{isUploading ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
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
                          if (data.url || data.public_url) {
                            setEditingCert({ ...editingCert, image: data.public_url || data.url });
                          }
                        } catch {}
                        finally {
                          setIsUploading(false);
                        }
                      }}
                    />
                  </label>
                </div>
                {editingCert.image && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-slate-800/40 rounded-xl border border-slate-800">
                    <img
                      src={editingCert.image}
                      alt="Preview"
                      className="w-12 h-12 object-cover rounded-lg bg-slate-800"
                      onError={(e) => { (e.target as any).src = 'image/cer-programing.png'; }}
                    />
                    <span className="text-xs text-slate-400 truncate">Preview: {editingCert.image}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCert.description}
                  onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                  required
                  placeholder="Details of the certification and topics covered..."
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
                  Save Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
