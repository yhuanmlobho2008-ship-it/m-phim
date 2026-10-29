import React from 'react';
import { useCinema } from '../context/CinemaContext';
import { NotificationsDropdown } from './NotificationsDropdown';
import { Ticket, Film, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onScrollToSection }) => {
  const {
    bookings,
    setIsMyBookingsOpen,
    isAdminOpen,
    setIsAdminOpen
  } = useCinema();

  const activeBookingsCount = bookings.filter(b => b.status === 'confirmed').length;

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0a0a0d]/90 backdrop-blur-md border-b border-neutral-900/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Zone - Single text element wordmark */}
        <button
          onClick={() => {
            setIsAdminOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-600 to-rose-950 flex items-center justify-center shadow-lg shadow-rose-900/40 border border-rose-500/30 group-hover:border-rose-400 transition-colors">
            <Film className="w-4 h-4 text-white" />
          </div>
          <span className="font-cinematic text-lg sm:text-xl font-bold tracking-wider text-white whitespace-nowrap shrink-0">
            CRIMSON<span className="text-rose-600 ml-1">CINEMA</span>
          </span>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs lg:text-sm font-medium text-neutral-300">
          <button
            onClick={() => {
              setIsAdminOpen(false);
              onScrollToSection('now-showing');
            }}
            className="hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Now Showing
          </button>
          <button
            onClick={() => {
              setIsAdminOpen(false);
              onScrollToSection('coming-soon');
            }}
            className="hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Upcoming Releases
          </button>
          <button
            onClick={() => {
              setIsAdminOpen(false);
              onScrollToSection('trailers');
            }}
            className="hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Featured Trailers
          </button>
          <button
            onClick={() => {
              setIsAdminOpen(false);
              onScrollToSection('experiences');
            }}
            className="hover:text-rose-400 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Auditoriums
          </button>
          <button
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 py-1 ${
              isAdminOpen ? 'text-rose-400 font-semibold' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
            <span>Admin Portal</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action & Utilities */}
        <div className="flex items-center gap-3 shrink-0">
          <NotificationsDropdown />

          <button
            onClick={() => setIsMyBookingsOpen(true)}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-800/60 hover:border-rose-700 text-rose-100 transition-all duration-200 shadow-md shadow-rose-950/30 whitespace-nowrap shrink-0"
            aria-label="View reserved tickets"
          >
            <Ticket className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">My Tickets</span>
            {activeBookingsCount > 0 && (
              <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full">
                {activeBookingsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
