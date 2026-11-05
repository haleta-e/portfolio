import React, { useState, useEffect } from 'react';
import { Mail, Check, Trash2, Clock } from 'lucide-react';
import { adminFetch } from './adminApi';

export const MessagesModule: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchMessages = () => {
    adminFetch('/api/admin/messages')
      .then((res) => res.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(() => setMessages([]));
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id: number) => {
    await adminFetch(`/api/admin/messages/${id}/read`, { method: 'PATCH' });
    fetchMessages();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Delete this message?')) return;
    await adminFetch(`/api/admin/messages/${id}`, { method: 'DELETE' });
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Contact Messages Inbox</h1>
        <p className="text-slate-400 text-sm">Review submitted contact form messages.</p>
      </div>

      <div className="space-y-4">
        {(Array.isArray(messages) ? messages : []).map((msg) => {
          const isUnread = msg.status === 'unread';
          return (
            <div
              key={msg.id}
              className={`border rounded-2xl p-6 transition-all space-y-3 ${
                isUnread ? 'bg-sky-500/5 border-sky-500/40' : 'bg-slate-900 border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isUnread ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{msg.sender_name}</h3>
                    <a href={`mailto:${msg.sender_email}`} className="text-xs text-sky-400 hover:underline">{msg.sender_email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                  {isUnread && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      className="px-3 py-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Check size={14} /> Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-slate-200 text-sm">Subject: {msg.subject}</div>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
