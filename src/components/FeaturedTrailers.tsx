import React from 'react';
import { useCinema } from '../context/CinemaContext';
import { Play, Film, Ticket } from 'lucide-react';
import { Movie } from '../types/cinema';

export const FeaturedTrailers: React.FC = () => {
  const { movies, openTrailer, openBookingModal } = useCinema();

  // Pick top 4 movies with compelling trailers
  const trailerFilms = movies.filter(m => m.isFeatured || m.status === 'coming_soon').slice(0, 4);

  return (
    <section id="trailers" className="py-16 bg-[#0c0c10] border-b border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
              <Film className="w-3.5 h-3.5" />
              <span>Cinematic Previews</span>
            </div>
            <h2 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Featured Blockbuster Trailers
            </h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm">
            Experience exclusive teasers in 4K with Dolby Atmos sound calibration before reserving your seats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trailerFilms.map((film: Movie) => (
            <div
              key={film.id}
              className="group relative rounded-xl overflow-hidden bg-[#14141a] border border-neutral-800/80 hover:border-rose-900/60 shadow-lg hover:shadow-rose-950/20 transition-all duration-300 flex flex-col"
            >
              {/* Media Preview Thumbnail */}
              <div
                onClick={() => openTrailer(film)}
                className="relative aspect-video w-full overflow-hidden cursor-pointer bg-neutral-900"
              >
                <img
                  src={film.backdropUrl || film.posterUrl}
                  alt={film.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl shadow-rose-950/60 group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-200 border border-rose-400/40">
                    <Play className="w-5 h-5 ml-0.5 fill-white" />
                  </div>
                </div>

                {/* Badge for format */}
                <span className="absolute top-2.5 right-2.5 text-[10px] font-bold text-neutral-200 px-2 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-neutral-700">
                  {film.status === 'coming_soon' ? 'COMING SOON' : 'NOW PLAYING'}
                </span>
              </div>

              {/* Information */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-white group-hover:text-rose-400 transition-colors line-clamp-1 mb-1">
                    {film.title}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
                    {film.tagline}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-neutral-800/80">
                  <span className="text-[11px] text-neutral-400 font-medium">
                    {film.genre[0]} · {film.ageRating}
                  </span>

                  <button
                    onClick={() => openBookingModal(film)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-rose-950/80 border border-neutral-800 hover:border-rose-800 text-rose-300 hover:text-white transition-all cursor-pointer"
                  >
                    <Ticket className="w-3 h-3 text-rose-400" />
                    <span>Book Seats</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
