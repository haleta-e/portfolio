import React from 'react';
import { Profile } from '../types';
import { ArrowUpRight, Sparkles, MapPin, GraduationCap, Edit2, ChevronRight, Layers } from 'lucide-react';

interface HeroProps {
  profile: Profile;
  onNavigate?: (page: string) => void;
  onEditProfile?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate, onEditProfile }) => {
  const cards = [
    {
      id: 'projects',
      rank: 'A',
      suit: '♠',
      suitColor: 'text-[#C85A32] dark:text-[#E07A5F]',
      kicker: 'The Craft',
      title: 'Featured Projects',
      desc: '5 production projects including EA Card Game, 4Kilo Shop & HIBRET.',
      meta: 'React · TS · Tailwind · Python',
      action: 'Explore Deck',
    },
    {
      id: 'experience',
      rank: 'K',
      suit: '♣',
      suitColor: 'text-[#1C1917] dark:text-[#F4EFEB]',
      kicker: 'The Journey',
      title: 'Experience & AAU',
      desc: 'INSA Cybersecurity Camp, Frontend Trainee & B.Sc. in Computer Science.',
      meta: '2023 — 2027 · Addis Ababa',
      action: 'View Journey',
    },
    {
      id: 'about',
      rank: 'Q',
      suit: '♥',
      suitColor: 'text-[#C85A32] dark:text-[#E07A5F]',
      kicker: 'The Philosophy',
      title: 'About & Ethos',
      desc: 'Passionate about tactile UI, component systems, and clean code.',
      meta: 'Software Architecture · UI/UX',
      action: 'Read Story',
    },
    {
      id: 'contact',
      rank: 'J',
      suit: '♦',
      suitColor: 'text-[#C85A32] dark:text-[#E07A5F]',
      kicker: 'The Exchange',
      title: 'Direct Outreach',
      desc: 'Available for summer internships, collaborations, and junior roles.',
      meta: 'etsegenetamsalu56@gmail.com',
      action: 'Deal a Message',
    },
  ];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#FAF7F2] dark:bg-[#141210] text-[#1C1917] dark:text-[#F4EFEB] transition-colors duration-300">
      {/* Subtle radial parchment accent */}
      <div className="absolute inset-0 card-pattern-overlay opacity-40 dark:opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* TOP-CENTERED CIRCULAR PROFILE AVATAR */}
        <div className="relative mb-6 group">
          {/* Subtle ring aura */}
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#C85A32]/30 via-transparent to-[#C85A32]/20 blur-sm group-hover:blur-md transition-all duration-500" />
          
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#E8E0D5] dark:border-[#38332E] shadow-md bg-[#F5EFE6] dark:bg-[#1E1B18] p-1 flex items-center justify-center">
            <img
              src={profile.avatarUrl || 'image/6003481707438345603_120.jpg'}
              alt={profile.name}
              className="w-full h-full object-cover object-center rounded-full group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'image/6003481707438345603_120.jpg';
              }}
            />
          </div>

          {/* Quiet Status Pip */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] rounded-full px-3 py-0.5 shadow-sm flex items-center gap-1.5 whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] dark:bg-[#E07A5F] animate-pulse" />
            <span className="text-[10px] font-medium tracking-wide uppercase text-[#6B6560] dark:text-[#9E968F]">
              Available for Internships
            </span>
          </div>

          {/* Quick Edit shortcut if admin */}
          {onEditProfile && (
            <button
              onClick={onEditProfile}
              className="absolute top-0 right-0 p-1.5 bg-[#FFFFFF] dark:bg-[#1E1B18] text-[#6B6560] dark:text-[#9E968F] hover:text-[#C85A32] border border-[#E8E0D5] dark:border-[#38332E] rounded-full shadow-xs opacity-0 group-hover:opacity-100 transition duration-200"
              title="Edit Profile"
            >
              <Edit2 size={12} />
            </button>
          )}
        </div>

        {/* Quiet Meta Line */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#6B6560] dark:text-[#9E968F] mb-3">
          <span className="flex items-center gap-1">
            <GraduationCap size={13} className="text-[#C85A32] dark:text-[#E07A5F]" />
            Addis Ababa University
          </span>
          <span aria-hidden="true">·</span>
          <span>Computer Science</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-[#C85A32] dark:text-[#E07A5F]" />
            Addis Ababa
          </span>
        </div>

        {/* Name & Title with Refined Fraunces Display Typography */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#1C1917] dark:text-[#F4EFEB] mb-2">
          {profile.name}
        </h1>

        <p className="font-mono text-sm sm:text-base text-[#C85A32] dark:text-[#E07A5F] mb-3 font-medium">
          Computer Science Student at Addis Ababa University
        </p>

        <p className="text-sm sm:text-base text-[#6B6560] dark:text-[#9E968F] max-w-xl leading-relaxed mb-10 font-normal">
          Building thoughtful web applications with clean architecture and tactile, responsive interfaces.
        </p>

        {/* "SHOW LESS FIRST" - THE ATELIER DECK (4 Interactive Playing Cards) */}
        <div className="w-full max-w-5xl">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2 text-xs font-mono text-[#6B6560] dark:text-[#9E968F]">
              <Layers size={14} className="text-[#C85A32] dark:text-[#E07A5F]" />
              <span>THE COLLECTION · SELECT A CARD TO EXPLORE</span>
            </div>
            <span className="text-[11px] font-mono text-[#6B6560] dark:text-[#9E968F] hidden sm:inline">
              4 SUITS DEALT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {cards.map((c) => (
              <div
                key={c.id}
                onClick={() => onNavigate && onNavigate(c.id)}
                className="group relative bg-[#FFFFFF] dark:bg-[#1E1B18] border border-[#E8E0D5] dark:border-[#38332E] hover:border-[#C85A32] dark:hover:border-[#E07A5F] rounded-2xl p-5 cursor-pointer playing-card playing-card-lift flex flex-col justify-between min-h-[240px] transition-all"
              >
                {/* Top Corner Index */}
                <div className="flex items-start justify-between">
                  <div className="card-index text-left">
                    <span className="text-sm font-bold text-[#1C1917] dark:text-[#F4EFEB] leading-none">{c.rank}</span>
                    <span className={`text-base leading-none mt-0.5 ${c.suitColor}`}>{c.suit}</span>
                  </div>

                  <span className="text-[10px] font-mono tracking-wider uppercase text-[#6B6560] dark:text-[#9E968F]">
                    {c.kicker}
                  </span>
                </div>

                {/* Card Center Content */}
                <div className="my-4 space-y-1.5">
                  <h3 className="font-display text-lg font-medium text-[#1C1917] dark:text-[#F4EFEB] group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#6B6560] dark:text-[#9E968F] leading-relaxed line-clamp-3">
                    {c.desc}
                  </p>
                </div>

                {/* Bottom Row & Bottom Inverted Corner Index */}
                <div className="pt-3 border-t border-[#F0E9DF] dark:border-[#2A2622] flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs font-semibold text-[#C85A32] dark:text-[#E07A5F] group-hover:translate-x-0.5 transition-transform">
                    <span>{c.action}</span>
                    <ArrowUpRight size={13} />
                  </div>

                  {/* Rotated bottom-right card index */}
                  <div className="card-index rotate-180 opacity-70">
                    <span className="text-xs font-bold text-[#1C1917] dark:text-[#F4EFEB] leading-none">{c.rank}</span>
                    <span className={`text-sm leading-none mt-0.5 ${c.suitColor}`}>{c.suit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Secondary Action Kicker */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs text-[#6B6560] dark:text-[#9E968F]">
          <span>Or navigate directly:</span>
          <button
            onClick={() => onNavigate && onNavigate('projects')}
            className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] underline underline-offset-4 decoration-[#E8E0D5] dark:decoration-[#38332E] hover:decoration-[#C85A32] transition-colors"
          >
            All Projects (5)
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => onNavigate && onNavigate('experience')}
            className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] underline underline-offset-4 decoration-[#E8E0D5] dark:decoration-[#38332E] hover:decoration-[#C85A32] transition-colors"
          >
            Timeline & AAU
          </button>
          <span aria-hidden="true">·</span>
          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="hover:text-[#C85A32] dark:hover:text-[#E07A5F] underline underline-offset-4 decoration-[#E8E0D5] dark:decoration-[#38332E] hover:decoration-[#C85A32] transition-colors"
          >
            Contact
          </button>
        </div>

      </div>
    </section>
  );
};
