import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Movie,
  ScreeningRoom,
  Showtime,
  TicketBooking,
  ConcessionItem,
  NotificationItem,
  SelectedSeatInfo
} from '../types/cinema';
import { INITIAL_MOVIES } from '../data/mockMovies';
import { INITIAL_ROOMS } from '../data/mockScreeningRooms';
import { INITIAL_SHOWTIMES } from '../data/mockShowtimes';
import { INITIAL_BOOKINGS } from '../data/mockBookings';
import { INITIAL_CONCESSIONS } from '../data/mockConcessions';
import { INITIAL_NOTIFICATIONS } from '../data/mockNotifications';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface CinemaContextType {
  movies: Movie[];
  screeningRooms: ScreeningRoom[];
  showtimes: Showtime[];
  bookings: TicketBooking[];
  concessions: ConcessionItem[];
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  toasts: ToastMessage[];

  // Modals & Navigation
  activeBookingMovie: Movie | null;
  activeShowtime: Showtime | null;
  selectedSeats: SelectedSeatInfo[];
  selectedConcessions: { id: string; name: string; quantity: number; price: number }[];
  isBookingOpen: boolean;
  activeTrailerMovie: Movie | null;
  activeTicketPass: TicketBooking | null;
  isMyBookingsOpen: boolean;
  isAdminOpen: boolean;

  // Actions
  openBookingModal: (movie: Movie, showtimeId?: string) => void;
  closeBookingModal: () => void;
  setActiveShowtime: (showtime: Showtime | null) => void;
  toggleSeat: (seat: SelectedSeatInfo) => void;
  clearSelectedSeats: () => void;
  updateConcessionQuantity: (item: ConcessionItem, delta: number) => void;
  confirmBooking: (customer: { name: string; email: string; phone: string }) => TicketBooking;

  openTrailer: (movie: Movie) => void;
  closeTrailer: () => void;
  openTicketPass: (booking: TicketBooking) => void;
  closeTicketPass: () => void;
  setIsMyBookingsOpen: (open: boolean) => void;
  setIsAdminOpen: (open: boolean) => void;

  // Admin Actions
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  addShowtime: (showtime: Omit<Showtime, 'id' | 'reservedSeats'>) => void;
  deleteShowtime: (id: string) => void;
  updateBookingStatus: (bookingId: string, status: 'confirmed' | 'checked_in' | 'cancelled') => void;
  cancelBooking: (bookingId: string) => void;

  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
}

const CinemaContext = createContext<CinemaContextType | undefined>(undefined);

export const CinemaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persistence state
  const [movies, setMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('crimson_movies');
    return saved ? JSON.parse(saved) : INITIAL_MOVIES;
  });

  const [screeningRooms] = useState<ScreeningRoom[]>(INITIAL_ROOMS);

  const [showtimes, setShowtimes] = useState<Showtime[]>(() => {
    const saved = localStorage.getItem('crimson_showtimes');
    return saved ? JSON.parse(saved) : INITIAL_SHOWTIMES;
  });

  const [bookings, setBookings] = useState<TicketBooking[]>(() => {
    const saved = localStorage.getItem('crimson_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [concessions] = useState<ConcessionItem[]>(INITIAL_CONCESSIONS);

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('crimson_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Modal states
  const [activeBookingMovie, setActiveBookingMovie] = useState<Movie | null>(null);
  const [activeShowtime, setActiveShowtime] = useState<Showtime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeatInfo[]>([]);
  const [selectedConcessions, setSelectedConcessions] = useState<{ id: string; name: string; quantity: number; price: number }[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [activeTrailerMovie, setActiveTrailerMovie] = useState<Movie | null>(null);
  const [activeTicketPass, setActiveTicketPass] = useState<TicketBooking | null>(null);
  const [isMyBookingsOpen, setIsMyBookingsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('crimson_movies', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('crimson_showtimes', JSON.stringify(showtimes));
  }, [showtimes]);

  useEffect(() => {
    localStorage.setItem('crimson_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('crimson_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Toast handler
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Notification actions
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared', 'info');
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: 'notif-' + Date.now(),
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [newItem, ...prev]);
  };

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Booking Flow handlers
  const openBookingModal = (movie: Movie, showtimeId?: string) => {
    setActiveBookingMovie(movie);
    setSelectedSeats([]);
    setSelectedConcessions([]);

    const movieShowtimes = showtimes.filter(s => s.movieId === movie.id);
    if (showtimeId) {
      const match = movieShowtimes.find(s => s.id === showtimeId);
      setActiveShowtime(match || movieShowtimes[0] || null);
    } else {
      setActiveShowtime(movieShowtimes[0] || null);
    }
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setActiveBookingMovie(null);
    setActiveShowtime(null);
    setSelectedSeats([]);
    setSelectedConcessions([]);
  };

  const toggleSeat = (seat: SelectedSeatInfo) => {
    setSelectedSeats(prev => {
      const exists = prev.some(s => s.id === seat.id);
      if (exists) {
        return prev.filter(s => s.id !== seat.id);
      } else {
        if (prev.length >= 8) {
          showToast('Maximum 8 seats per booking session.', 'info');
          return prev;
        }
        return [...prev, seat];
      }
    });
  };

  const clearSelectedSeats = () => {
    setSelectedSeats([]);
  };

  const updateConcessionQuantity = (item: ConcessionItem, delta: number) => {
    setSelectedConcessions(prev => {
      const existing = prev.find(c => c.id === item.id);
      if (existing) {
        const nextQty = existing.quantity + delta;
        if (nextQty <= 0) {
          return prev.filter(c => c.id !== item.id);
        }
        return prev.map(c => c.id === item.id ? { ...c, quantity: nextQty } : c);
      } else if (delta > 0) {
        return [...prev, { id: item.id, name: item.name, quantity: 1, price: item.price }];
      }
      return prev;
    });
  };

  const confirmBooking = (customer: { name: string; email: string; phone: string }): TicketBooking => {
    if (!activeBookingMovie || !activeShowtime || selectedSeats.length === 0) {
      throw new Error('Incomplete booking data');
    }

    const room = screeningRooms.find(r => r.id === activeShowtime.roomId) || screeningRooms[0];
    const seatsTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
    const concessionsTotal = selectedConcessions.reduce((acc, c) => acc + (c.price * c.quantity), 0);
    const grandTotal = seatsTotal + concessionsTotal;

    const bookingId = 'CRMSN-' + Math.floor(10000 + Math.random() * 90000);
    const dateNow = new Date().toISOString().replace('T', ' ').substring(0, 16);

    const newBooking: TicketBooking = {
      id: bookingId,
      bookingDate: dateNow,
      movieId: activeBookingMovie.id,
      movieTitle: activeBookingMovie.title,
      posterUrl: activeBookingMovie.posterUrl,
      roomId: room.id,
      roomName: room.name,
      format: activeShowtime.format,
      showtimeDate: activeShowtime.date,
      showtimeStart: activeShowtime.startTime,
      seats: [...selectedSeats],
      concessions: [...selectedConcessions],
      totalAmount: grandTotal,
      customerName: customer.name || 'Cinema Guest',
      customerEmail: customer.email || 'guest@crimsoncinema.com',
      customerPhone: customer.phone || '+1 (555) 000-0000',
      status: 'confirmed',
      qrCodeValue: `${bookingId}-${activeBookingMovie.id}-${room.id}-${selectedSeats.map(s => s.id).join('')}`
    };

    // Update showtime reserved seats
    const bookedSeatIds = selectedSeats.map(s => s.id);
    setShowtimes(prev => prev.map(st => {
      if (st.id === activeShowtime.id) {
        return {
          ...st,
          reservedSeats: [...st.reservedSeats, ...bookedSeatIds]
        };
      }
      return st;
    }));

    // Add to bookings
    setBookings(prev => [newBooking, ...prev]);

    // Add notification
    addNotification({
      title: 'Booking Confirmed!',
      message: `Your reservation for "${activeBookingMovie.title}" (${selectedSeats.map(s => s.id).join(', ')}) at ${activeShowtime.startTime} is confirmed. Pass ready.`,
      type: 'booking',
      bookingId: newBooking.id
    });

    showToast(`Booking ${bookingId} confirmed! Ticket pass generated.`, 'success');

    // Close booking modal and open ticket pass
    closeBookingModal();
    setActiveTicketPass(newBooking);

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Free up seats from corresponding showtime if found
    const seatIds = booking.seats.map(s => s.id);
    setShowtimes(prev => prev.map(st => {
      if (st.movieId === booking.movieId && st.date === booking.showtimeDate && st.startTime === booking.showtimeStart) {
        return {
          ...st,
          reservedSeats: st.reservedSeats.filter(id => !seatIds.includes(id))
        };
      }
      return st;
    }));

    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b));
    showToast(`Booking ${bookingId} has been cancelled and seats released.`, 'info');

    addNotification({
      title: 'Booking Cancelled',
      message: `Reservation ${bookingId} for "${booking.movieTitle}" has been cancelled.`,
      type: 'booking'
    });
  };

  const updateBookingStatus = (bookingId: string, status: 'confirmed' | 'checked_in' | 'cancelled') => {
    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status } : b));
    showToast(`Ticket ${bookingId} status updated to: ${status.replace('_', ' ').toUpperCase()}`, 'success');
  };

  // Trailer Handlers
  const openTrailer = (movie: Movie) => {
    setActiveTrailerMovie(movie);
  };

  const closeTrailer = () => {
    setActiveTrailerMovie(null);
  };

  // Ticket Pass Handlers
  const openTicketPass = (booking: TicketBooking) => {
    setActiveTicketPass(booking);
  };

  const closeTicketPass = () => {
    setActiveTicketPass(null);
  };

  // Admin CRUD for movies
  const addMovie = (movieData: Omit<Movie, 'id'>) => {
    const newId = 'film-' + (movies.length + 1) + '-' + Date.now().toString(36);
    const newMovie: Movie = {
      ...movieData,
      id: newId
    };
    setMovies(prev => [newMovie, ...prev]);
    showToast(`Film "${newMovie.title}" added to theater catalog!`, 'success');
  };

  const updateMovie = (id: string, updatedFields: Partial<Movie>) => {
    setMovies(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    showToast('Movie details updated successfully.', 'success');
  };

  const deleteMovie = (id: string) => {
    const target = movies.find(m => m.id === id);
    setMovies(prev => prev.filter(m => m.id !== id));
    setShowtimes(prev => prev.filter(st => st.movieId !== id));
    showToast(`Movie "${target?.title || id}" removed from cinema schedule.`, 'info');
  };

  // Admin CRUD for showtimes
  const addShowtime = (stData: Omit<Showtime, 'id' | 'reservedSeats'>) => {
    const newId = 'st-' + Date.now();
    const newShowtime: Showtime = {
      ...stData,
      id: newId,
      reservedSeats: []
    };
    setShowtimes(prev => [...prev, newShowtime]);
    showToast(`Showtime added for ${stData.date} at ${stData.startTime}!`, 'success');
  };

  const deleteShowtime = (id: string) => {
    setShowtimes(prev => prev.filter(st => st.id !== id));
    showToast('Showtime slot removed.', 'info');
  };

  return (
    <CinemaContext.Provider
      value={{
        movies,
        screeningRooms,
        showtimes,
        bookings,
        concessions,
        notifications,
        unreadNotificationsCount,
        toasts,

        activeBookingMovie,
        activeShowtime,
        selectedSeats,
        selectedConcessions,
        isBookingOpen,
        activeTrailerMovie,
        activeTicketPass,
        isMyBookingsOpen,
        isAdminOpen,

        openBookingModal,
        closeBookingModal,
        setActiveShowtime,
        toggleSeat,
        clearSelectedSeats,
        updateConcessionQuantity,
        confirmBooking,

        openTrailer,
        closeTrailer,
        openTicketPass,
        closeTicketPass,
        setIsMyBookingsOpen,
        setIsAdminOpen,

        addMovie,
        updateMovie,
        deleteMovie,
        addShowtime,
        deleteShowtime,
        updateBookingStatus,
        cancelBooking,

        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        addNotification,
        showToast,
        dismissToast
      }}
    >
      {children}
    </CinemaContext.Provider>
  );
};

export const useCinema = () => {
  const context = useContext(CinemaContext);
  if (!context) {
    throw new Error('useCinema must be used within a CinemaProvider');
  }
  return context;
};
