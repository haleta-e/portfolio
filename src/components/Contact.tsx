import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Copy, Check, ArrowUpRight, Sparkles } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const emailAddress = 'etsegenetamsalu56@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to dispatch message.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Network error occurred.');
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header with Refined Typography */}
        <div className="max-w-2xl text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#C85A32] dark:text-[#E07A5F] tracking-wider uppercase mb-2">
            <span>SUIT OF DIAMONDS ♦</span>
            <span aria-hidden="true">·</span>
            <span>DIRECT EXCHANGE</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB]">
            Start a Conversation
          </h2>
          <p className="text-sm text-[#6B6560] dark:text-[#9E968F] mt-2 leading-relaxed">
            I am currently considering summer internships, software engineering collaborations, and frontend challenges. Deal a message below or connect via direct channels.
          </p>
        </div>

        {/* 2-Column Split: The Hand of Playing Cards (Left 5) & The Dispatch Card (Right 7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: 3 Contact Playing Cards Dealt Vertically */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Card 1: ♠ Ace of Spades - Direct Email */}
            <div className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl p-5 playing-card playing-card-lift">
              <div className="flex items-start justify-between">
                <div className="card-index text-left">
                  <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">A</span>
                  <span className="text-base text-[#C85A32] dark:text-[#E07A5F]">♠</span>
                </div>
                <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase tracking-wider">
                  Direct Inbox
                </span>
              </div>

              <div className="my-3 space-y-1">
                <h3 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB]">
                  Electronic Mail
                </h3>
                <p className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F] truncate">
                  {emailAddress}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-xs font-semibold text-[#C85A32] dark:text-[#E07A5F] hover:underline flex items-center gap-1"
                  >
                    <span>Write Mail</span>
                    <ArrowUpRight size={13} />
                  </a>
                  <span aria-hidden="true" className="text-[#E8E0D5] dark:text-[#38332E]">·</span>
                  <button
                    onClick={copyToClipboard}
                    className="text-xs text-[#6B6560] dark:text-[#9E968F] hover:text-[#1C1917] dark:hover:text-[#F4EFEB] flex items-center gap-1 transition-colors"
                    title="Copy address"
                  >
                    {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="card-index rotate-180 opacity-60">
                  <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">A</span>
                  <span className="text-sm text-[#C85A32] dark:text-[#E07A5F]">♠</span>
                </div>
              </div>
            </div>

            {/* Card 2: ♣ King of Clubs - GitHub Repositories */}
            <div className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl p-5 playing-card playing-card-lift">
              <div className="flex items-start justify-between">
                <div className="card-index text-left">
                  <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">K</span>
                  <span className="text-base text-[#1C1917] dark:text-[#F4EFEB]">♣</span>
                </div>
                <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase tracking-wider">
                  Open Source & Commits
                </span>
              </div>

              <div className="my-3 space-y-1">
                <h3 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB]">
                  GitHub Profile
                </h3>
                <p className="text-xs text-[#6B6560] dark:text-[#9E968F]">
                  Explore repositories, commit histories, and architecture across 5 active projects.
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between">
                <a
                  href="https://github.com/haleta-e"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#1C1917] dark:text-[#F4EFEB] hover:text-[#C85A32] dark:hover:text-[#E07A5F] flex items-center gap-1.5 transition-colors"
                >
                  <GithubIcon size={14} />
                  <span>github.com/haleta-e</span>
                  <ArrowUpRight size={13} />
                </a>

                <div className="card-index rotate-180 opacity-60">
                  <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">K</span>
                  <span className="text-sm text-[#1C1917] dark:text-[#F4EFEB]">♣</span>
                </div>
              </div>
            </div>

            {/* Card 3: ♥ Queen of Hearts - Academic & Professional Network */}
            <div className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl p-5 playing-card playing-card-lift">
              <div className="flex items-start justify-between">
                <div className="card-index text-left">
                  <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">Q</span>
                  <span className="text-base text-[#C85A32] dark:text-[#E07A5F]">♥</span>
                </div>
                <span className="text-[10px] font-mono text-[#6B6560] dark:text-[#9E968F] uppercase tracking-wider">
                  Campus & Network
                </span>
              </div>

              <div className="my-3 space-y-1">
                <h3 className="font-display text-base font-medium text-[#1C1917] dark:text-[#F4EFEB]">
                  Addis Ababa, Ethiopia
                </h3>
                <p className="text-xs text-[#6B6560] dark:text-[#9E968F]">
                  Department of Computer Science, Addis Ababa University. Available for on-site & remote roles.
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between">
                <a
                  href="https://linkedin.com/in/etsegenet-amsalu"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#C85A32] dark:text-[#E07A5F] hover:underline flex items-center gap-1.5"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn Profile</span>
                  <ArrowUpRight size={13} />
                </a>

                <div className="card-index rotate-180 opacity-60">
                  <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB]">Q</span>
                  <span className="text-sm text-[#C85A32] dark:text-[#E07A5F]">♥</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Card 4: ♦ Jack of Diamonds - The Dispatch Playing Card */}
          <div className="lg:col-span-7 bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-3xl p-6 sm:p-8 playing-card-lift relative">
            
            {/* Top Corner Indices for the Playing Card Frame */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#F0E9DF] dark:border-[#2A2622]">
              <div className="card-index text-left">
                <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">J</span>
                <span className="text-base text-[#C85A32] dark:text-[#E07A5F]">♦</span>
              </div>

              <div className="text-center">
                <h3 className="font-display text-xl font-medium text-[#1C1917] dark:text-[#F4EFEB]">
                  The Dispatch
                </h3>
                <p className="text-[11px] font-mono text-[#6B6560] dark:text-[#9E968F]">
                  SEND DIRECT MESSAGE · VERIFIED DELIVERY
                </p>
              </div>

              <div className="card-index rotate-180 text-left">
                <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB]">J</span>
                <span className="text-base text-[#C85A32] dark:text-[#E07A5F]">♦</span>
              </div>
            </div>

            {/* Status Notifications */}
            {status === 'success' && (
              <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 rounded-xl flex items-center gap-3 text-xs">
                <CheckCircle2 size={18} className="shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="font-bold">Card Dispatched Successfully</p>
                  <p className="text-[11px] opacity-90 mt-0.5">Thank you for reaching out. I will respond to your inquiry promptly.</p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-800 dark:text-rose-300 rounded-xl flex items-center gap-3 text-xs">
                <AlertCircle size={18} className="shrink-0 text-rose-600 dark:text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F] uppercase">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#FAF7F2] dark:bg-[#141210] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F4EFEB] placeholder-[#9E968F] focus:outline-none focus:border-[#C85A32] dark:focus:border-[#E07A5F]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F] uppercase">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. alex@example.com"
                    className="w-full bg-[#FAF7F2] dark:bg-[#141210] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F4EFEB] placeholder-[#9E968F] focus:outline-none focus:border-[#C85A32] dark:focus:border-[#E07A5F]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F] uppercase">
                  Subject Line
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship opportunity, project collaboration..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#141210] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F4EFEB] placeholder-[#9E968F] focus:outline-none focus:border-[#C85A32] dark:focus:border-[#E07A5F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-[#6B6560] dark:text-[#9E968F] uppercase">
                  Message Content
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Write your note, question, or opportunity details..."
                  className="w-full bg-[#FAF7F2] dark:bg-[#141210] border border-[#E8E0D5] dark:border-[#38332E] rounded-xl px-3.5 py-2.5 text-xs text-[#1C1917] dark:text-[#F4EFEB] placeholder-[#9E968F] focus:outline-none focus:border-[#C85A32] dark:focus:border-[#E07A5F] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-[#C85A32] dark:bg-[#E07A5F] hover:bg-[#B24A26] dark:hover:bg-[#C85A32] text-white font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer"
              >
                <Send size={14} />
                <span>{status === 'sending' ? 'Dispatching Message...' : 'Deal & Dispatch Message'}</span>
              </button>
            </form>

            {/* Bottom Subtle Guarantee */}
            <p className="text-[11px] font-mono text-center text-[#6B6560] dark:text-[#9E968F] mt-4">
              Directly routed to etsegenetamsalu56@gmail.com · No spam.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
