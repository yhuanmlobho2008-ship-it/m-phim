import React, { useState, useMemo } from 'react';
import { useCinema } from '../context/CinemaContext';
import { Movie, MovieStatus, CinemaFormat } from '../types/cinema';
import { Search, Film, Star, Clock, Ticket, Play, Sparkles } from 'lucide-react';

export const MovieCatalog: React.FC = () => {
  const { movies, openBookingModal, openTrailer } = useCinema();

  const [statusFilter, setStatusFilter] = useState<'all' | MovieStatus>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all unique genres
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    movies.forEach(m => m.genre.forEach(g => set.add(g)));
    return Array.from(set);
  }, [movies]);

  // Counts
  const nowShowingCount = movies.filter(m => m.status === 'now_showing').length;
  const comingSoonCount = movies.filter(m => m.status === 'coming_soon').length;

  // Filtered movies
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Status filter
      if (statusFilter !== 'all' && movie.status !== statusFilter) {
        return false;
      }
      // Genre filter
      if (selectedGenre !== 'all' && !movie.genre.includes(selectedGenre)) {
        return false;
      }
      // Format filter
      if (selectedFormat !== 'all' && !movie.formats.includes(selectedFormat as CinemaFormat)) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = movie.title.toLowerCase().includes(q);
        const matchDirector = movie.director.toLowerCase().includes(q);
        const matchCast = movie.cast.some(c => c.toLowerCase().includes(q));
        const matchGenre = movie.genre.some(g => g.toLowerCase().includes(q));
        if (!matchTitle && !matchDirector && !matchCast && !matchGenre) {
          return false;
        }
      }
      return true;
    });
  }, [movies, statusFilter, selectedGenre, selectedFormat, searchQuery]);

  return (
    <section id="now-showing" className="py-16 bg-[#09090b] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1.5">
              <Film className="w-3.5 h-3.5" />
              <span>Cinema Schedule & Repertoire</span>
            </div>
            <h2 className="font-cinematic text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Film Catalog
            </h2>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search films, actors, directors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-[#14141a] border border-neutral-800 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-rose-600 focus:ring-1 focus:ring-rose-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="space-y-4 mb-10 pb-6 border-b border-neutral-900">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === 'all'
                  ? 'bg-rose-900/80 text-white border border-rose-700 shadow-md shadow-rose-950/40'
                  : 'bg-[#141419] text-neutral-400 hover:text-white border border-neutral-800/80'
              }`}
            >
              All Films ({movies.length})
            </button>
            <button
              onClick={() => setStatusFilter('now_showing')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === 'now_showing'
                  ? 'bg-rose-900/80 text-white border border-rose-700 shadow-md shadow-rose-950/40'
                  : 'bg-[#141419] text-neutral-400 hover:text-white border border-neutral-800/80'
              }`}
            >
              Now Showing ({nowShowingCount})
            </button>
            <button
              onClick={() => setStatusFilter('coming_soon')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === 'coming_soon'
                  ? 'bg-rose-900/80 text-white border border-rose-700 shadow-md shadow-rose-950/40'
                  : 'bg-[#141419] text-neutral-400 hover:text-white border border-neutral-800/80'
              }`}
            >
              Coming Soon ({comingSoonCount})
            </button>
          </div>

          {/* Sub Filters: Genre & Format */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            {/* Genre filter list */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400">
              <span className="text-[11px] font-medium text-neutral-500 mr-1">Genre:</span>
              <button
                onClick={() => setSelectedGenre('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                  selectedGenre === 'all' ? 'bg-neutral-800 text-white' : 'hover:text-neutral-200'
                }`}
              >
                All
              </button>
              {allGenres.slice(0, 7).map(genre => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                    selectedGenre === genre ? 'bg-neutral-800 text-rose-300' : 'hover:text-neutral-200'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>

            {/* Format dropdown selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-medium text-neutral-500">Auditorium Format:</span>
              <select
                value={selectedFormat}
                onChange={e => setSelectedFormat(e.target.value)}
                className="px-2.5 py-1 text-xs bg-[#141419] border border-neutral-800 rounded-lg text-neutral-200 focus:outline-none focus:border-rose-600"
              >
                <option value="all">All Experiences</option>
                <option value="IMAX 3D">IMAX® 3D Laser</option>
                <option value="Dolby Cinema">Dolby Cinema™</option>
                <option value="VIP Lounge">Velvet VIP Lounge</option>
                <option value="Standard 2D">Standard 2D</option>
              </select>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length === 0 ? (
          <div className="py-20 text-center bg-[#101015] border border-neutral-800/80 rounded-2xl p-8">
            <Film className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white mb-1">No movies match your criteria</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-4">
              Try adjusting your search query or reset the filters to browse our complete repertoire.
            </p>
            <button
              onClick={() => {
                setStatusFilter('all');
                setSelectedGenre('all');
                setSelectedFormat('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-rose-300 bg-neutral-900 border border-neutral-800 rounded-lg hover:bg-neutral-800"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie: Movie) => (
              <div
                key={movie.id}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#121217] border border-neutral-800/80 hover:border-rose-900/60 shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Poster Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/30" />

                  {/* Top Status & Age Rating Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span
                      className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded shadow-md uppercase ${
                        movie.status === 'now_showing'
                          ? 'bg-rose-950/90 text-rose-300 border border-rose-800/70'
                          : 'bg-amber-950/90 text-amber-300 border border-amber-800/70'
                      }`}
                    >
                      {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
                    </span>

                    <span className="text-[10px] font-bold text-neutral-300 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm border border-neutral-700">
                      {movie.ageRating}
                    </span>
                  </div>

                  {/* Hover Trailer Quick Trigger */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <button
                      onClick={() => openTrailer(movie)}
                      className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-black/80 hover:bg-rose-900 border border-neutral-700 hover:border-rose-700 rounded-xl transition-all shadow-lg"
                    >
                      <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      <span>Play Trailer</span>
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    {/* Unboxed clean metadata with dot separators */}
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 font-medium mb-1.5">
                      <span className="text-rose-400 truncate">{movie.genre[0]}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-neutral-500" />
                        {Math.floor(movie.durationMinutes / 60)}h {movie.durationMinutes % 60}m
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1 text-amber-400 font-mono">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {movie.ratingScore.toFixed(1)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-base text-white group-hover:text-rose-400 transition-colors line-clamp-1">
                      {movie.title}
                    </h3>

                    {/* Tagline / Synopsis preview */}
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mt-1">
                      {movie.tagline}
                    </p>
                  </div>

                  {/* Formats Tags & Book Button */}
                  <div className="space-y-2.5 pt-2 border-t border-neutral-800/80">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {movie.formats.slice(0, 2).map(f => (
                        <span
                          key={f}
                          className="text-[10px] text-neutral-400 px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800"
                        >
                          {f}
                        </span>
                      ))}
                      {movie.formats.length > 2 && (
                        <span className="text-[10px] text-neutral-500">+{movie.formats.length - 2}</span>
                      )}
                    </div>

                    <button
                      onClick={() => openBookingModal(movie)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-gradient-to-r from-rose-900 via-rose-800 to-rose-900 hover:from-rose-800 hover:to-rose-700 border border-rose-700/60 rounded-xl shadow-md shadow-rose-950/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <Ticket className="w-3.5 h-3.5 text-rose-400" />
                      <span>{movie.status === 'now_showing' ? 'Book Tickets & Seats' : 'Pre-Book Screening'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
