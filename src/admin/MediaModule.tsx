import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Copy, FileText, Check, Image as ImageIcon } from 'lucide-react';
import { adminFetch } from './adminApi';

export const MediaModule: React.FC = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const fetchMedia = () => {
    adminFetch('/api/admin/media')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMedia(data);
        } else {
          setMedia([]);
        }
      })
      .catch(() => setMedia([]));
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await adminFetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        fetchMedia();
      } else {
        const err = await res.json();
        alert(err.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this file permanently?')) return;
    await adminFetch(`/api/admin/media/${id}`, { method: 'DELETE' });
    fetchMedia();
  };

  const handleCopyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const safeMediaList = Array.isArray(media) ? media : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Media Library</h1>
          <p className="text-slate-400 text-sm">Upload images (JPG, PNG, WebP) and documents (PDF certificates / CVs).</p>
        </div>

        <label className="cursor-pointer px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-sky-500/20 text-sm transition-transform hover:scale-105">
          <Upload size={18} /> {uploading ? 'Uploading File...' : 'Upload Asset'}
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>

      {safeMediaList.length === 0 ? (
        <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 space-y-2">
          <ImageIcon className="mx-auto text-slate-600 mb-2" size={48} />
          <p className="text-lg font-semibold text-slate-300">No media assets found</p>
          <p className="text-xs text-slate-500">Upload your first image or PDF document to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeMediaList.map((item) => {
            const isPdf = item.mime_type === 'application/pdf';
            return (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-4 space-y-3 flex flex-col justify-between">
                <div className="h-36 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center relative group">
                  {isPdf ? (
                    <div className="flex flex-col items-center gap-2 text-sky-400">
                      <FileText size={40} />
                      <span className="text-xs font-bold uppercase">PDF Document</span>
                    </div>
                  ) : (
                    <img
                      src={item.public_url}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => { (e.target as any).src = 'image/project.jpg'; }}
                    />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="font-semibold text-white text-sm truncate">{item.original_filename}</div>
                  <div className="text-xs text-slate-500 flex justify-between">
                    <span>{item.size_bytes ? (item.size_bytes / 1024).toFixed(1) : 0} KB</span>
                    <span className="uppercase">{item.mime_type ? item.mime_type.split('/')[1] : 'FILE'}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <button
                    onClick={() => handleCopyUrl(item.public_url, item.id)}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    {copiedId === item.id ? <Check size={14} /> : <Copy size={14} />}
                    {copiedId === item.id ? 'Copied!' : 'Copy URL'}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400"
                    title="Delete Asset"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
