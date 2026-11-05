import React, { useState, useEffect } from 'react';
import { User, Save, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { adminFetch } from './adminApi';

interface ProfileModuleProps {
  onProfileUpdated?: () => void;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ onProfileUpdated }) => {
  const [profile, setProfile] = useState<any>({
    full_name: '',
    professional_title: '',
    biography: '',
    email: '',
    avatar_url: '',
    cv_media_id: null,
  });
  const [savedMessage, setSavedMessage] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    adminFetch('/api/admin/profile')
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setProfile(data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      const res = await adminFetch('/api/admin/profile', {
        method: 'PUT',
        body: JSON.stringify(profile),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(data.error || 'Failed to save profile changes');
        return;
      }

      setSavedMessage(true);
      if (onProfileUpdated) onProfileUpdated();
      setTimeout(() => setSavedMessage(false), 3000);
    } catch (err: any) {
      setFormError(err.message || 'Error saving profile');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploadingAvatar(true);
    try {
      const res = await adminFetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url || data.public_url) {
        setProfile((prev: any) => ({ ...prev, avatar_url: data.public_url || data.url }));
      }
    } catch {
      alert('Avatar upload failed');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setUploadingCV(true);
    try {
      const res = await adminFetch('/api/admin/media/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.id) {
        setProfile((prev: any) => ({ ...prev, cv_media_id: data.id }));
        alert('CV document uploaded successfully!');
      }
    } catch {
      alert('CV Upload failed');
    } finally {
      setUploadingCV(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Profile & CV Management</h1>
        <p className="text-slate-400 text-sm">Update personal details, biography, avatar photo, and downloadable CV document.</p>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm flex items-center gap-2">
          <CheckCircle2 size={18} /> Profile details saved successfully!
        </div>
      )}

      {formError && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle size={18} /> {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name</label>
          <input
            type="text"
            value={profile.full_name || ''}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Professional Title</label>
          <input
            type="text"
            value={profile.professional_title || ''}
            onChange={(e) => setProfile({ ...profile, professional_title: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Biography / About Me</label>
          <textarea
            rows={4}
            value={profile.biography || ''}
            onChange={(e) => setProfile({ ...profile, biography: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Public Email</label>
          <input
            type="email"
            value={profile.email || ''}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            required
            className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Avatar Image URL / Upload</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={profile.avatar_url || ''}
              onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
              placeholder="image/6003481707438345603_120.jpg or upload"
              className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm"
            />
            <label className="cursor-pointer px-4 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 rounded-xl text-xs font-bold transition-colors whitespace-nowrap">
              <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>
          {profile.avatar_url && (
            <div className="mt-3 flex items-center gap-3 p-2 bg-slate-800/40 rounded-xl border border-slate-800">
              <img
                src={profile.avatar_url}
                alt="Avatar Preview"
                className="w-14 h-14 rounded-full object-cover border border-slate-700 bg-slate-800"
                onError={(e) => { (e.target as any).src = 'image/6003481707438345603_120.jpg'; }}
              />
              <div>
                <span className="text-xs font-semibold text-slate-300 block">Avatar Photo Preview</span>
                <span className="text-[11px] text-slate-500 truncate max-w-xs block">{profile.avatar_url}</span>
              </div>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-slate-800">
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Upload Downloadable CV (PDF)</label>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-bold text-slate-200 flex items-center gap-2">
              <Upload size={16} /> {uploadingCV ? 'Uploading CV...' : 'Choose PDF File'}
              <input type="file" accept="application/pdf" onChange={handleCVUpload} className="hidden" />
            </label>
            {profile.cv_media_id ? (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={14} /> CV Attached (Media #{profile.cv_media_id})
              </span>
            ) : (
              <span className="text-xs text-slate-500">No CV file attached yet</span>
            )}
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-sm flex items-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            <Save size={18} /> Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
};
