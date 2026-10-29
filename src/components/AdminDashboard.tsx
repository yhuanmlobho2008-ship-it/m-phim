import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';
import {
  Film,
  Calendar,
  Layers,
  Users,
  BarChart3,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  XCircle,
  Eye,
  Search,
  Sparkles,
  Ticket,
  Clock,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import { Movie, MovieStatus, AgeRating, CinemaFormat, Showtime } from '../types/cinema';
import { TODAY_DATE, TOMORROW_DATE } from '../data/mockShowtimes';

export const AdminDashboard: React.FC = () => {
  const {
    movies,
    showtimes,
    screeningRooms,
    bookings,
    addMovie,
    updateMovie,
    deleteMovie,
    addShowtime,
    deleteShowtime,
    updateBookingStatus,
    cancelBooking,
    setIsAdminOpen,
    showToast
  } = useCinema();

  const [activeTab, setActiveTab] = useState<'analytics' | 'films' | 'showtimes' | 'rooms' | 'customers'>('analytics');

  // Search states
  const [filmSearch, setFilmSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');

  // Add/Edit Film Modal
  const [isFilmModalOpen, setIsFilmModalOpen] = useState(false);
  const [editingFilmId, setEditingFilmId] = useState<string | null>(null);

  // Form states for film
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [backdropUrl, setBackdropUrl] = useState('');
  const [genreInput, setGenreInput] = useState('Sci-Fi, Action');
  const [duration, setDuration] = useState(135);
  const [ageRating, setAgeRating] = useState<AgeRating>('PG-13');
  const [ratingScore, setRatingScore] = useState(8.5);
  const [status, setStatus] = useState<MovieStatus>('now_showing');
  const [director, setDirector] = useState('Christopher Nolan');
  const [castInput, setCastInput] = useState('Actor A, Actor B');
  const [trailerYoutubeId, setTrailerYoutubeId] = useState('Way9Dexny3w');
  const [isFeatured, setIsFeatured] = useState(false);

  // Add Showtime Modal
  const [isShowtimeModalOpen, setIsShowtimeModalOpen] = useState(false);
  const [stMovieId, setStMovieId] = useState(movies[0]?.id || '');
  const [stRoomId, setStRoomId] = useState(screeningRooms[0]?.id || '');
  const [stDate, setStDate] = useState(TODAY_DATE);
  const [stTime, setStTime] = useState('19:00');
  const [stPrice, setStPrice] = useState(20.00);

  // Analytics calculation
  const totalRevenue = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.totalAmount : sum, 0);
  const totalTicketsSold = bookings.reduce((sum, b) => b.status !== 'cancelled' ? sum + b.seats.length : sum, 0);
  const activeBookings = bookings.filter(b => b.status === 'confirmed');

  // Open film modal for add or edit
  const handleOpenAddFilm = () => {
    setEditingFilmId(null);
    setTitle('');
    setTagline('');
    setSynopsis('');
    setPosterUrl('/src/assets/images/poster_crimson_horizon_1793281450243.jpg');
    setBackdropUrl('/src/assets/images/hero_cinema_marquee_1793281430222.jpg');
    setGenreInput('Action, Thriller');
    setDuration(120);
    setAgeRating('PG-13');
    setRatingScore(8.6);
    setStatus('now_showing');
    setDirector('');
    setCastInput('');
    setTrailerYoutubeId('Way9Dexny3w');
    setIsFeatured(false);
    setIsFilmModalOpen(true);
  };

  const handleOpenEditFilm = (m: Movie) => {
    setEditingFilmId(m.id);
    setTitle(m.title);
    setTagline(m.tagline);
    setSynopsis(m.synopsis);
    setPosterUrl(m.posterUrl);
    setBackdropUrl(m.backdropUrl);
    setGenreInput(m.genre.join(', '));
    setDuration(m.durationMinutes);
    setAgeRating(m.ageRating);
    setRatingScore(m.ratingScore);
    setStatus(m.status);
    setDirector(m.director);
    setCastInput(m.cast.join(', '));
    setTrailerYoutubeId(m.trailerYoutubeId);
    setIsFeatured(m.isFeatured);
    setIsFilmModalOpen(true);
  };

  const handleSaveFilm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const genres = genreInput.split(',').map(g => g.trim()).filter(Boolean);
    const cast = castInput.split(',').map(c => c.trim()).filter(Boolean);

    if (editingFilmId) {
      updateMovie(editingFilmId, {
        title,
        tagline,
        synopsis,
        posterUrl: posterUrl || '/src/assets/images/poster_crimson_horizon_1793281450243.jpg',
        backdropUrl: backdropUrl || '/src/assets/images/hero_cinema_marquee_1793281430222.jpg',
        genre: genres.length ? genres : ['Cinema'],
        durationMinutes: Number(duration),
        ageRating,
        ratingScore: Number(ratingScore),
        status,
        director: director || 'Director',
        cast: cast.length ? cast : ['Cast Lead'],
        trailerYoutubeId: trailerYoutubeId || 'Way9Dexny3w',
        isFeatured
      });
    } else {
      addMovie({
        title,
        tagline,
        synopsis,
        posterUrl: posterUrl || '/src/assets/images/poster_crimson_horizon_1793281450243.jpg',
        backdropUrl: backdropUrl || '/src/assets/images/hero_cinema_marquee_1793281430222.jpg',
        genre: genres.length ? genres : ['Cinema'],
        durationMinutes: Number(duration),
        ageRating,
        ratingScore: Number(ratingScore),
        voteCount: 150,
        releaseDate: TODAY_DATE,
        status,
        director: director || 'Director',
        cast: cast.length ? cast : ['Cast Lead'],
        trailerYoutubeId: trailerYoutubeId || 'Way9Dexny3w',
        isFeatured,
        formats: ['Standard 2D', 'Dolby Cinema']
      });
    }
    setIsFilmModalOpen(false);
  };

  const handleSaveShowtime = (e: React.FormEvent) => {
    e.preventDefault();
    const room = screeningRooms.find(r => r.id === stRoomId) || screeningRooms[0];
    addShowtime({
      movieId: stMovieId,
      roomId: stRoomId,
      date: stDate,
      startTime: stTime,
      format: room.formatName,
      basePrice: Number(stPrice)
    });
    setIsShowtimeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-100 pb-20">
      {/* Top Banner */}
      <div className="bg-[#101016] border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Box Office Administration Portal</span>
            </div>
            <h1 className="font-cinematic text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Theater Operations & Catalog Manager
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors"
            >
              Exit to Customer View
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto border-t border-neutral-800/80 pt-1">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-rose-500 text-rose-400 bg-rose-950/20'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & Box Office</span>
          </button>

          <button
            onClick={() => setActiveTab('films')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'films'
                ? 'border-rose-500 text-rose-400 bg-rose-950/20'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Film Catalog ({movies.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('showtimes')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'showtimes'
                ? 'border-rose-500 text-rose-400 bg-rose-950/20'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Showtimes Schedule ({showtimes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rooms')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'rooms'
                ? 'border-rose-500 text-rose-400 bg-rose-950/20'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Auditorium Layouts (4)</span>
          </button>

          <button
            onClick={() => setActiveTab('customers')}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'customers'
                ? 'border-rose-500 text-rose-400 bg-rose-950/20'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customer Bookings ({bookings.length})</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* ================= TAB 1: OVERVIEW & ANALYTICS ================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-[#111117] border border-neutral-800">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Gross Box Office Revenue
                </span>
                <span className="font-mono text-3xl font-extrabold text-white mt-1 block">
                  ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium mt-1 block">
                  +18.4% vs last weekend
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#111117] border border-neutral-800">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Total Admission Tickets
                </span>
                <span className="font-mono text-3xl font-extrabold text-rose-400 mt-1 block">
                  {totalTicketsSold} Passes
                </span>
                <span className="text-[11px] text-neutral-400 font-medium mt-1 block">
                  {activeBookings.length} active parties in house
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#111117] border border-neutral-800">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Auditorium Occupancy Rate
                </span>
                <span className="font-mono text-3xl font-extrabold text-white mt-1 block">
                  78.2%
                </span>
                <span className="text-[11px] text-rose-400 font-medium mt-1 block">
                  Hall 1 IMAX running near capacity
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#111117] border border-neutral-800">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  Film Repertoire
                </span>
                <span className="font-mono text-3xl font-extrabold text-white mt-1 block">
                  {movies.length} Films
                </span>
                <span className="text-[11px] text-neutral-400 font-medium mt-1 block">
                  {movies.filter(m => m.status === 'now_showing').length} Now Playing · {movies.filter(m => m.status === 'coming_soon').length} Upcoming
                </span>
              </div>
            </div>

            {/* Performance breakdown grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top grossing movies */}
              <div className="p-6 rounded-2xl bg-[#111117] border border-neutral-800 space-y-4">
                <h3 className="font-cinematic text-lg font-bold text-white">
                  Top Box Office Performers
                </h3>
                <div className="space-y-3">
                  {movies.slice(0, 4).map((m, idx) => (
                    <div key={m.id} className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono font-bold text-rose-500 text-sm w-4">
                          0{idx + 1}
                        </span>
                        <img
                          src={m.posterUrl}
                          alt={m.title}
                          referrerPolicy="no-referrer"
                          className="w-10 h-14 object-cover rounded border border-neutral-800 shrink-0"
                        />
                        <div className="truncate">
                          <h4 className="font-bold text-white text-xs truncate">{m.title}</h4>
                          <span className="text-[11px] text-neutral-400">{m.genre.join(', ')}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono font-bold text-xs text-rose-400 block">
                          ${(m.voteCount * 1.8).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-neutral-500">Est. Gross</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hall Utilization */}
              <div className="p-6 rounded-2xl bg-[#111117] border border-neutral-800 space-y-4">
                <h3 className="font-cinematic text-lg font-bold text-white">
                  Auditorium Tech & Utilization
                </h3>
                <div className="space-y-3">
                  {screeningRooms.map(room => (
                    <div key={room.id} className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-white">{room.name}</span>
                        <span className="font-mono text-rose-400">{room.totalSeats} seats</span>
                      </div>
                      <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-rose-600 h-1.5 rounded-full"
                          style={{ width: `${room.type === 'IMAX' ? 88 : room.type === 'VIP' ? 74 : 65}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {room.audioSystem} · {room.screenSpecs}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: FILM CATALOG ================= */}
        {activeTab === 'films' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Filter catalog by title or director..."
                  value={filmSearch}
                  onChange={e => setFilmSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#111117] border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-600"
                />
              </div>

              <button
                onClick={handleOpenAddFilm}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Film</span>
              </button>
            </div>

            {/* Films Table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-[#111117]">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-[#16161f] text-neutral-400 uppercase tracking-wider text-[10px] font-semibold border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Film Poster & Title</th>
                    <th className="py-3 px-4">Genre / Duration</th>
                    <th className="py-3 px-4">Age / Rating</th>
                    <th className="py-3 px-4">Release Status</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80 font-normal">
                  {movies
                    .filter(m => m.title.toLowerCase().includes(filmSearch.toLowerCase()) || m.director.toLowerCase().includes(filmSearch.toLowerCase()))
                    .map(m => (
                      <tr key={m.id} className="hover:bg-neutral-900/60 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={m.posterUrl}
                              alt={m.title}
                              referrerPolicy="no-referrer"
                              className="w-9 h-12 object-cover rounded border border-neutral-800 shrink-0"
                            />
                            <div className="min-w-0 max-w-xs">
                              <h4 className="font-bold text-white text-xs truncate">{m.title}</h4>
                              <p className="text-[11px] text-neutral-400 truncate">Dir: {m.director}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div>
                            <span className="text-neutral-200 block truncate">{m.genre.join(', ')}</span>
                            <span className="text-[11px] text-neutral-500 font-mono">
                              {Math.floor(m.durationMinutes / 60)}h {m.durationMinutes % 60}m
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded border border-neutral-700 bg-neutral-900 text-[10px] font-bold">
                              {m.ageRating}
                            </span>
                            <span className="font-mono text-amber-400 font-bold">
                              ★ {m.ratingScore.toFixed(1)}
                            </span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => {
                              const newStatus = m.status === 'now_showing' ? 'coming_soon' : 'now_showing';
                              updateMovie(m.id, { status: newStatus });
                            }}
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded cursor-pointer transition-colors ${
                              m.status === 'now_showing'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900'
                                : 'bg-amber-950 text-amber-300 border border-amber-800 hover:bg-amber-900'
                            }`}
                          >
                            {m.status.replace('_', ' ')}
                          </button>
                        </td>

                        <td className="py-3 px-4">
                          <button
                            onClick={() => updateMovie(m.id, { isFeatured: !m.isFeatured })}
                            className={`p-1 rounded text-xs transition-colors ${
                              m.isFeatured ? 'text-rose-400 font-bold' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                          >
                            {m.isFeatured ? '★ Featured' : '☆ Standard'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditFilm(m)}
                              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
                              title="Edit film"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete film "${m.title}" and cancel its showtimes?`)) {
                                  deleteMovie(m.id);
                                }
                              }}
                              className="p-1.5 text-neutral-400 hover:text-rose-400 rounded hover:bg-rose-950/40 transition-colors"
                              title="Delete film"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: SHOWTIMES SCHEDULE ================= */}
        {activeTab === 'showtimes' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-cinematic text-lg font-bold text-white">
                  Auditorium Showtime Schedules
                </h3>
                <p className="text-xs text-neutral-400">
                  Manage screening time slots, format assignments, and pricing
                </p>
              </div>

              <button
                onClick={() => setIsShowtimeModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Schedule Showtime</span>
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-[#111117]">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-[#16161f] text-neutral-400 uppercase tracking-wider text-[10px] font-semibold border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Film</th>
                    <th className="py-3 px-4">Auditorium / Format</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Start Time</th>
                    <th className="py-3 px-4">Base Price</th>
                    <th className="py-3 px-4">Occupancy</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {showtimes.map(st => {
                    const movie = movies.find(m => m.id === st.movieId);
                    const room = screeningRooms.find(r => r.id === st.roomId);
                    const bookedCount = st.reservedSeats.length;
                    const totalCap = room ? room.totalSeats : 90;

                    return (
                      <tr key={st.id} className="hover:bg-neutral-900/60 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">
                          {movie?.title || st.movieId}
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <span className="text-neutral-200 block">{room?.name || st.roomId}</span>
                            <span className="text-[10px] text-rose-400 font-semibold">{st.format}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-300">
                          {st.date}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-white">
                          {st.startTime}
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-200 font-bold">
                          ${st.basePrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs">
                          <span className="text-rose-400 font-bold">{bookedCount}</span>
                          <span className="text-neutral-500"> / {totalCap}</span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete this showtime slot?`)) {
                                deleteShowtime(st.id);
                              }
                            }}
                            className="p-1.5 text-neutral-400 hover:text-rose-400 rounded hover:bg-rose-950/40 transition-colors"
                            title="Delete showtime"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 4: AUDITORIUMS ================= */}
        {activeTab === 'rooms' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h3 className="font-cinematic text-lg font-bold text-white">
                Screening Rooms & Seating Matrix
              </h3>
              <p className="text-xs text-neutral-400">
                Acoustic calibration, seating capacity, and screen dimensions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {screeningRooms.map(room => (
                <div key={room.id} className="p-6 rounded-2xl bg-[#111117] border border-neutral-800 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest block">
                        {room.formatName}
                      </span>
                      <h4 className="font-cinematic text-lg font-bold text-white mt-0.5">
                        {room.name}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-neutral-900 border border-neutral-700 text-rose-300">
                      {room.totalSeats} Total Seats
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-neutral-800/80 pb-1.5">
                      <span className="text-neutral-400">Seating Layout:</span>
                      <span className="text-neutral-200 font-mono font-semibold">
                        {room.rows} Rows (A to {String.fromCharCode(64 + room.rows)}) × {room.seatsPerRow} Seats/Row
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-neutral-800/80 pb-1.5">
                      <span className="text-neutral-400">Audio System:</span>
                      <span className="text-neutral-200 font-semibold truncate max-w-xs">{room.audioSystem}</span>
                    </div>

                    <div className="flex justify-between pb-1">
                      <span className="text-neutral-400">Screen Specifications:</span>
                      <span className="text-neutral-200 font-semibold truncate max-w-xs">{room.screenSpecs}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 5: CUSTOMER BOOKINGS & USHER CHECK-IN ================= */}
        {activeTab === 'customers' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-cinematic text-lg font-bold text-white">
                  Customer Reservations & Admission Gate
                </h3>
                <p className="text-xs text-neutral-400">
                  Inspect booked passes, customer details, and validate entries
                </p>
              </div>

              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search by customer name or ref code..."
                  value={customerSearch}
                  onChange={e => setCustomerSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-[#111117] border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-600"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-neutral-800 bg-[#111117]">
              <table className="w-full text-left text-xs text-neutral-300">
                <thead className="bg-[#16161f] text-neutral-400 uppercase tracking-wider text-[10px] font-semibold border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Booking Ref</th>
                    <th className="py-3 px-4">Customer Details</th>
                    <th className="py-3 px-4">Movie & Hall</th>
                    <th className="py-3 px-4">Showtime</th>
                    <th className="py-3 px-4">Seats Booked</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Admit / Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/80">
                  {bookings
                    .filter(b =>
                      b.customerName.toLowerCase().includes(customerSearch.toLowerCase()) ||
                      b.id.toLowerCase().includes(customerSearch.toLowerCase()) ||
                      b.movieTitle.toLowerCase().includes(customerSearch.toLowerCase())
                    )
                    .map(b => (
                      <tr key={b.id} className="hover:bg-neutral-900/60 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-rose-400">
                          {b.id}
                        </td>

                        <td className="py-3 px-4">
                          <div>
                            <span className="font-bold text-white block">{b.customerName}</span>
                            <span className="text-[11px] text-neutral-400">{b.customerEmail}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <div>
                            <span className="text-white font-medium block truncate max-w-xs">{b.movieTitle}</span>
                            <span className="text-[11px] text-neutral-400">{b.roomName}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono">
                          <span className="text-neutral-200 block">{b.showtimeDate}</span>
                          <span className="text-rose-400 font-bold">{b.showtimeStart}</span>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-neutral-200">
                          {b.seats.map(s => s.id).join(', ')}
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-neutral-100">
                          ${b.totalAmount.toFixed(2)}
                        </td>

                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                              b.status === 'confirmed'
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : b.status === 'checked_in'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {b.status.replace('_', ' ')}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {b.status === 'confirmed' && (
                              <button
                                onClick={() => updateBookingStatus(b.id, 'checked_in')}
                                className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 transition-colors cursor-pointer"
                                title="Validate ticket & admit customer"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Admit</span>
                              </button>
                            )}

                            {b.status !== 'cancelled' && (
                              <button
                                onClick={() => {
                                  if (window.confirm(`Cancel reservation ${b.id}?`)) {
                                    cancelBooking(b.id);
                                  }
                                }}
                                className="p-1 text-neutral-400 hover:text-red-400 transition-colors"
                                title="Cancel booking"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL: ADD / EDIT FILM ================= */}
      {isFilmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-[#121218] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#16161f]">
              <h3 className="font-cinematic text-lg font-bold text-white">
                {editingFilmId ? 'Edit Film Details' : 'Add New Film to Repertoire'}
              </h3>
              <button
                onClick={() => setIsFilmModalOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFilm} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Film Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Synopsis</label>
                <textarea
                  rows={3}
                  value={synopsis}
                  onChange={e => setSynopsis(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">Poster Image URL</label>
                  <input
                    type="text"
                    value={posterUrl}
                    onChange={e => setPosterUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Backdrop Image URL</label>
                  <input
                    type="text"
                    value={backdropUrl}
                    onChange={e => setBackdropUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">Duration (mins)</label>
                  <input
                    type="number"
                    value={duration}
                    onChange={e => setDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Age Rating</label>
                  <select
                    value={ageRating}
                    onChange={e => setAgeRating(e.target.value as AgeRating)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  >
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Rating Score (1-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="10"
                    value={ratingScore}
                    onChange={e => setRatingScore(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">Genres (comma separated)</label>
                  <input
                    type="text"
                    value={genreInput}
                    onChange={e => setGenreInput(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Status</label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as MovieStatus)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  >
                    <option value="now_showing">Now Showing</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-neutral-400 mb-1">Director</label>
                  <input
                    type="text"
                    value={director}
                    onChange={e => setDirector(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Trailer YouTube ID</label>
                  <input
                    type="text"
                    value={trailerYoutubeId}
                    onChange={e => setTrailerYoutubeId(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={isFeatured}
                  onChange={e => setIsFeatured(e.target.checked)}
                  className="rounded bg-neutral-900 border-neutral-700 text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="featuredToggle" className="text-neutral-300 font-medium">
                  Feature in Marquee Spotlight & Trailer Showcase
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsFilmModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow"
                >
                  Save Film
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD SHOWTIME ================= */}
      {isShowtimeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md bg-[#121218] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#16161f]">
              <h3 className="font-cinematic text-base font-bold text-white">
                Schedule New Showtime Slot
              </h3>
              <button
                onClick={() => setIsShowtimeModalOpen(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveShowtime} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Select Film</label>
                <select
                  value={stMovieId}
                  onChange={e => setStMovieId(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                >
                  {movies.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.title} ({m.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Select Auditorium</label>
                <select
                  value={stRoomId}
                  onChange={e => setStRoomId(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                >
                  {screeningRooms.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.formatName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={stDate}
                    onChange={e => setStDate(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Start Time (24h)</label>
                  <input
                    type="time"
                    required
                    value={stTime}
                    onChange={e => setStTime(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Base Ticket Price ($)</label>
                <input
                  type="number"
                  step="0.5"
                  required
                  value={stPrice}
                  onChange={e => setStPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsShowtimeModalOpen(false)}
                  className="px-4 py-2 text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg shadow"
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
