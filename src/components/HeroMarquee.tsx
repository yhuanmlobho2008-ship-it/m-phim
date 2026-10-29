import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';
import { Play, Ticket, Calendar, Clock, Star, Sparkles } from 'lucide-react';

export const HeroMarquee: React.FC = () => {
  const { movies, showtimes, openBookingModal, openTrailer } = useCinema();

  // Find featured movies
  const featuredMovies = movies.filter(m => m.isFeatured);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentMovie = featuredMovies[selectedIndex] || movies[0];

  if (!currentMovie) return null;

  // Find showtimes for this movie today
  const movieShowtimes = showtimes.filter(s => s.movieId === currentMovie.id);

  return (
    <section className="relative w-full overflow-hidden border-b border-neutral-900 bg-[#09090b]">
      {/* Background with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentMovie.backdropUrl || '/src/assets/images/hero_cinema_marquee_1793281430222.jpg'}
          alt={currentMovie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-125 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-[#09090b]/80 to-transparent" />
        {/* Subtle crimson radial glow */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[400px] bg-rose-950/30 blur-[130px] rounded-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span>Marquee Premiere Showcase</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-300 font-mono">Exclusive 70mm & IMAX® Run</span>
            </div>

            {/* Headline */}
            <h1 className="font-cinematic text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08] [text-wrap:balance]">
              {currentMovie.title}
            </h1>

            {/* Tagline */}
            <p className="text-base sm:text-lg text-rose-200/90 italic font-serif">
              "{currentMovie.tagline}"
            </p>

            {/* Clean unboxed metadata with dot separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-neutral-300 font-medium">
              <span className="text-rose-400 font-semibold">{currentMovie.genre.join(', ')}</span>
              <span className="text-neutral-600">·</span>
              <span className="flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                {Math.floor(currentMovie.durationMinutes / 60)}h {currentMovie.durationMinutes % 60}m
              </span>
              <span className="text-neutral-600">·</span>
              <span className="px-1.5 py-0.5 rounded border border-neutral-700 bg-neutral-900/60 text-[11px] font-bold text-neutral-200">
                {currentMovie.ageRating}
              </span>
              <span className="text-neutral-600">·</span>
              <span className="flex items-center gap-1 text-amber-400 font-semibold font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {currentMovie.ratingScore.toFixed(1)}
                <span className="text-[11px] text-neutral-400 font-normal">({(currentMovie.voteCount / 1000).toFixed(1)}k reviews)</span>
              </span>
            </div>

            {/* Synopsis */}
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
              {currentMovie.synopsis}
            </p>

            {/* Formats support */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-neutral-400">Presented in:</span>
              <div className="flex flex-wrap gap-2">
                {currentMovie.formats.map(fmt => (
                  <span
                    key={fmt}
                    className="text-[11px] font-semibold tracking-wider text-rose-200 px-2.5 py-1 rounded bg-[#1f0a12] border border-rose-900/60"
                  >
                    {fmt}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => openBookingModal(currentMovie)}
                className="flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-rose-700 to-rose-600 hover:from-rose-600 hover:to-rose-500 rounded-xl shadow-lg shadow-rose-950/60 border border-rose-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-white" />
                <span>Reserve Seats & Showtimes</span>
              </button>

              <button
                onClick={() => openTrailer(currentMovie)}
                className="flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-neutral-200 bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700/80 hover:border-neutral-600 rounded-xl hover:text-white transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Watch Trailer</span>
              </button>
            </div>

            {/* Today's Fast Showtime Strip */}
            {movieShowtimes.length > 0 && (
              <div className="pt-4 border-t border-neutral-800/80 max-w-xl">
                <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-neutral-400">
                  <Calendar className="w-3.5 h-3.5 text-rose-500" />
                  <span>Quick Showtimes Today:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {movieShowtimes.slice(0, 4).map(st => (
                    <button
                      key={st.id}
                      onClick={() => openBookingModal(currentMovie, st.id)}
                      className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141419] hover:bg-rose-950/60 border border-neutral-800 hover:border-rose-700 text-xs text-neutral-200 hover:text-white transition-all cursor-pointer"
                    >
                      <span className="font-mono font-bold group-hover:text-rose-400">{st.startTime}</span>
                      <span className="text-[10px] text-neutral-500 group-hover:text-neutral-300">({st.format})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Spotlight Poster & Marquee Selector */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div className="relative group max-w-xs w-full rounded-2xl overflow-hidden border border-rose-900/40 bg-neutral-950 shadow-2xl shadow-rose-950/40">
              <img
                src={currentMovie.posterUrl}
                alt={currentMovie.title}
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[3/4] object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-rose-300 font-medium">Directed by {currentMovie.director}</p>
                <p className="text-xs text-neutral-400 truncate">Starring {currentMovie.cast.join(', ')}</p>
              </div>
            </div>

            {/* Featured film carousel tabs */}
            {featuredMovies.length > 1 && (
              <div className="flex items-center gap-2 mt-4 p-1.5 bg-neutral-900/80 rounded-xl border border-neutral-800">
                {featuredMovies.map((fm, idx) => (
                  <button
                    key={fm.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      idx === selectedIndex
                        ? 'bg-rose-900/80 text-white shadow-sm border border-rose-700'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {fm.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
