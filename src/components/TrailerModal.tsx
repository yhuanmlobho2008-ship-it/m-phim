import React from 'react';
import { useCinema } from '../context/CinemaContext';
import { X, Ticket, Clock, Star } from 'lucide-react';

export const TrailerModal: React.FC = () => {
  const { activeTrailerMovie, closeTrailer, openBookingModal } = useCinema();

  if (!activeTrailerMovie) return null;

  const handleBookTickets = () => {
    const movie = activeTrailerMovie;
    closeTrailer();
    openBookingModal(movie);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#101015] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-[#16161d]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Cinema Teaser</span>
            <span className="text-neutral-600">/</span>
            <h3 className="font-semibold text-white text-base truncate max-w-md">
              {activeTrailerMovie.title}
            </h3>
          </div>
          <button
            onClick={closeTrailer}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close trailer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${activeTrailerMovie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${activeTrailerMovie.title} Official Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer info & CTA */}
        <div className="p-6 bg-[#121218] border-t border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
              <span className="text-rose-400 font-semibold">{activeTrailerMovie.genre.join(', ')}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {Math.floor(activeTrailerMovie.durationMinutes / 60)}h {activeTrailerMovie.durationMinutes % 60}m
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-400 font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {activeTrailerMovie.ratingScore.toFixed(1)}
              </span>
              <span>·</span>
              <span className="px-1.5 py-0.2 rounded border border-neutral-700 bg-neutral-900 text-[10px] font-bold">
                {activeTrailerMovie.ageRating}
              </span>
            </div>
            <p className="text-xs text-neutral-300 max-w-xl line-clamp-2 leading-relaxed">
              {activeTrailerMovie.synopsis}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleBookTickets}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
            >
              <Ticket className="w-4 h-4" />
              <span>Reserve Tickets</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
