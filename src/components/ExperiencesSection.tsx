import React from 'react';
import { Sparkles, Volume2, Armchair, Eye } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';

export const ExperiencesSection: React.FC = () => {
  const { screeningRooms } = useCinema();

  const features = [
    {
      id: 'room-1',
      title: 'IMAX® with Laser',
      icon: Eye,
      roomName: 'Hall 1 — Grand IMAX® Laser',
      tagline: 'Next-Generation Immersion',
      description: 'Massive 24-meter silver screen with dual 4K laser projection delivering unparalleled brightness, contrast, and 12-channel laser-aligned sound.',
      highlight: 'Dual 4K Laser & 12-Ch Audio'
    },
    {
      id: 'room-2',
      title: 'Dolby Cinema™ Atmos',
      icon: Volume2,
      roomName: 'Hall 2 — Dolby Cinema™',
      tagline: 'Pure Cinematic Acoustics',
      description: 'Dolby Vision HDR high-dynamic range paired with 128-object Dolby Atmos spatial audio that flows all around you in breathtaking clarity.',
      highlight: 'Dolby Vision & 128-Obj Atmos'
    },
    {
      id: 'room-3',
      title: 'Velvet VIP Gold Lounge',
      icon: Armchair,
      roomName: 'Hall 3 — Velvet VIP Lounge',
      tagline: 'First-Class Luxury',
      description: 'Ultra-wide motorized heated leather recliners, at-seat sommelier & artisan food delivery, private coat check, and spacious table consoles.',
      highlight: 'Motorized Recliners & Dine-In'
    },
    {
      id: 'room-4',
      title: 'Cinema Classic 4K',
      icon: Sparkles,
      roomName: 'Hall 4 — Cinema Classic Screen',
      tagline: 'Authentic 70mm Heritage',
      description: 'Christie high-frame-rate digital cinema projection with Barco 7.1 surround sound tuned for true cinephiles and timeless cinema magic.',
      highlight: 'Christie High Frame Rate'
    }
  ];

  return (
    <section id="experiences" className="py-20 bg-[#070709] border-t border-b border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auditorium Engineering</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Cinematic Auditoriums & Formats
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Every screening hall at Crimson Cinema has been acoustically calibrated to the highest theatrical master standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative p-6 rounded-2xl bg-[#0f0f14] border border-neutral-800/80 hover:border-rose-900/60 shadow-lg hover:shadow-rose-950/20 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 group-hover:bg-rose-900 transition-all">
                    <Icon className="w-5 h-5 text-rose-400 group-hover:text-white" />
                  </div>

                  <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">
                    {feat.tagline}
                  </span>
                  <h3 className="font-cinematic text-lg font-bold text-white mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                    {feat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-500 font-mono">Format Standard:</span>
                  <span className="font-semibold text-neutral-300">{feat.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
