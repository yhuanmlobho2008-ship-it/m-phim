import React from 'react';
import { Film, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useCinema } from '../context/CinemaContext';

export const Footer: React.FC = () => {
  const { setIsAdminOpen } = useCinema();

  return (
    <footer className="bg-[#07070a] border-t border-neutral-900 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-950">
                <Film className="w-3.5 h-3.5" />
              </div>
              <span className="font-cinematic text-lg font-bold tracking-wider text-white">
                CRIMSON<span className="text-rose-600 ml-1">CINEMA</span>
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              The pinnacle of theatrical presentation. Featuring proprietary dual 4K laser projection, 128-channel spatial sound, and motorized velvet luxury seating.
            </p>
            <div className="space-y-1.5 text-neutral-400 text-[11px]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>800 Grand Boulevard, Metropolitan Arts District</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Daily Doors: 10:30 AM — Midnight</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Box Office Concierge: +1 (800) 555-FILM</span>
              </div>
            </div>
          </div>

          {/* Formats */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Experience
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">IMAX® with Laser</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Dolby Cinema™ Atmos</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Velvet VIP Gold Lounge</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">4DX Motion & Effects</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Private Auditorium Rentals</span></li>
            </ul>
          </div>

          {/* Cinema Policies */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Policies & Passes
            </h4>
            <ul className="space-y-2 text-xs">
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Digital Pass Check-In</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Ticket Exchange & Cancellation</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Accessible Seating Guide</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Age Ratings & Guidelines</span></li>
              <li><span className="hover:text-rose-400 transition-colors cursor-pointer">Artisan Concessions Menu</span></li>
            </ul>
          </div>

          {/* Quick Staff Access */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider">
              Theater Operations
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Box office managers and screening coordinators can access scheduling and catalog controls.
            </p>
            <button
              onClick={() => {
                setIsAdminOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-rose-300 transition-colors"
            >
              Open Admin Dashboard
            </button>
          </div>
        </div>

        <div className="pt-10 mt-10 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© {new Date().getFullYear()} Crimson Cinema Theaters Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Admission</span>
            <span className="hover:text-neutral-300 cursor-pointer">Security Standards</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
