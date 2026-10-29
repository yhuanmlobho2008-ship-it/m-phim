export type AgeRating = 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
export type MovieStatus = 'now_showing' | 'coming_soon';
export type CinemaFormat = 'IMAX 3D' | 'Dolby Cinema' | '4DX Motion' | 'Standard 2D' | 'VIP Lounge';

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  genre: string[];
  durationMinutes: number;
  ageRating: AgeRating;
  ratingScore: number;
  voteCount: number;
  releaseDate: string;
  status: MovieStatus;
  isFeatured: boolean;
  director: string;
  cast: string[];
  trailerYoutubeId: string;
  formats: CinemaFormat[];
}

export type SeatType = 'standard' | 'vip' | 'couple' | 'accessible';
export type SeatStatus = 'available' | 'reserved' | 'selected';

export interface Seat {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  price: number;
  status: SeatStatus;
}

export interface ScreeningRoom {
  id: string;
  name: string;
  type: 'IMAX' | 'Dolby' | 'VIP' | 'Standard';
  formatName: CinemaFormat;
  rows: number;
  seatsPerRow: number;
  totalSeats: number;
  audioSystem: string;
  screenSpecs: string;
  basePriceMultiplier: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  roomId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM (e.g. "14:30")
  format: CinemaFormat;
  basePrice: number;
  reservedSeats: string[]; // array of seat IDs like "C-4", "E-7"
}

export interface ConcessionItem {
  id: string;
  name: string;
  category: 'combo' | 'popcorn' | 'beverage' | 'snack';
  price: number;
  description: string;
  iconName: string;
}

export interface SelectedSeatInfo {
  id: string;
  row: string;
  number: number;
  type: SeatType;
  price: number;
}

export interface TicketBooking {
  id: string;
  bookingDate: string;
  movieId: string;
  movieTitle: string;
  posterUrl: string;
  roomId: string;
  roomName: string;
  format: CinemaFormat;
  showtimeDate: string;
  showtimeStart: string;
  seats: SelectedSeatInfo[];
  concessions: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: 'confirmed' | 'checked_in' | 'cancelled';
  qrCodeValue: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'booking' | 'reminder' | 'trailer' | 'promo';
  read: boolean;
  bookingId?: string;
}
