import { TicketBooking } from '../types/cinema';
import { TODAY_DATE, TOMORROW_DATE } from './mockShowtimes';

export const INITIAL_BOOKINGS: TicketBooking[] = [
  {
    id: 'CRMSN-94812',
    bookingDate: `${TODAY_DATE} 10:14`,
    movieId: 'film-1',
    movieTitle: 'Crimson Horizon',
    posterUrl: '/src/assets/images/poster_crimson_horizon_1793281450243.jpg',
    roomId: 'room-1',
    roomName: 'Hall 1 — Grand IMAX® Laser',
    format: 'IMAX 3D',
    showtimeDate: TODAY_DATE,
    showtimeStart: '16:45',
    seats: [
      { id: 'E-5', row: 'E', number: 5, type: 'vip', price: 27.00 },
      { id: 'E-6', row: 'E', number: 6, type: 'vip', price: 27.00 }
    ],
    concessions: [
      { id: 'conc-1', name: 'Royale Truffle Popcorn Combo', quantity: 1, price: 15.50 }
    ],
    totalAmount: 69.50,
    customerName: 'Marcus Sterling',
    customerEmail: 'marcus.sterling@example.com',
    customerPhone: '+1 (555) 234-8901',
    status: 'confirmed',
    qrCodeValue: 'CRMSN-94812-FLM1-RM1-E5E6'
  },
  {
    id: 'CRMSN-81203',
    bookingDate: `${TODAY_DATE} 09:22`,
    movieId: 'film-2',
    movieTitle: 'Night Hath No Eyes',
    posterUrl: '/src/assets/images/poster_noir_shadow_1793281450938.jpg',
    roomId: 'room-2',
    roomName: 'Hall 2 — Dolby Cinema™ Atmos',
    format: 'Dolby Cinema',
    showtimeDate: TODAY_DATE,
    showtimeStart: '18:00',
    seats: [
      { id: 'D-5', row: 'D', number: 5, type: 'standard', price: 21.00 },
      { id: 'D-6', row: 'D', number: 6, type: 'standard', price: 21.00 }
    ],
    concessions: [
      { id: 'conc-4', name: 'Crimson Reserve Craft Soda', quantity: 2, price: 12.00 }
    ],
    totalAmount: 54.00,
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@cinemamail.com',
    customerPhone: '+1 (555) 887-1923',
    status: 'checked_in',
    qrCodeValue: 'CRMSN-81203-FLM2-RM2-D5D6'
  },
  {
    id: 'CRMSN-75190',
    bookingDate: `${TODAY_DATE} 11:45`,
    movieId: 'film-3',
    movieTitle: 'Neon Fury',
    posterUrl: '/src/assets/images/poster_cyber_odyssey_1793281450562.jpg',
    roomId: 'room-1',
    roomName: 'Hall 1 — Grand IMAX® Laser',
    format: 'IMAX 3D',
    showtimeDate: TODAY_DATE,
    showtimeStart: '23:15',
    seats: [
      { id: 'D-6', row: 'D', number: 6, type: 'standard', price: 23.00 },
      { id: 'D-7', row: 'D', number: 7, type: 'standard', price: 23.00 }
    ],
    concessions: [],
    totalAmount: 46.00,
    customerName: 'Julian Vance',
    customerEmail: 'julian.vance@techcorp.io',
    customerPhone: '+1 (555) 304-5821',
    status: 'confirmed',
    qrCodeValue: 'CRMSN-75190-FLM3-RM1-D6D7'
  },
  {
    id: 'CRMSN-63914',
    bookingDate: `${TODAY_DATE} 08:30`,
    movieId: 'film-6',
    movieTitle: 'Symphony of Ash',
    posterUrl: 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=800&q=80',
    roomId: 'room-3',
    roomName: 'Hall 3 — Velvet VIP Gold Lounge',
    format: 'VIP Lounge',
    showtimeDate: TODAY_DATE,
    showtimeStart: '21:30',
    seats: [
      { id: 'B-3', row: 'B', number: 3, type: 'vip', price: 32.00 },
      { id: 'B-4', row: 'B', number: 4, type: 'vip', price: 32.00 }
    ],
    concessions: [
      { id: 'conc-2', name: 'Gourmet Artisanal Caramel Popcorn', quantity: 1, price: 8.50 },
      { id: 'conc-4', name: 'Crimson Reserve Craft Soda', quantity: 2, price: 12.00 }
    ],
    totalAmount: 84.50,
    customerName: 'Sophia Montgomery',
    customerEmail: 'sophia.m@luxuryestate.com',
    customerPhone: '+1 (555) 712-4499',
    status: 'confirmed',
    qrCodeValue: 'CRMSN-63914-FLM6-RM3-B3B4'
  },
  {
    id: 'CRMSN-52119',
    bookingDate: `${TODAY_DATE} 07:15`,
    movieId: 'film-8',
    movieTitle: 'Starlight Reverie',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    roomId: 'room-4',
    roomName: 'Hall 4 — Cinema Classic Screen',
    format: 'Standard 2D',
    showtimeDate: TOMORROW_DATE,
    showtimeStart: '11:00',
    seats: [
      { id: 'D-3', row: 'D', number: 3, type: 'standard', price: 14.00 },
      { id: 'D-4', row: 'D', number: 4, type: 'standard', price: 14.00 },
      { id: 'D-5', row: 'D', number: 5, type: 'standard', price: 14.00 }
    ],
    concessions: [
      { id: 'conc-6', name: 'Double Classic Popcorn & Soda Duo', quantity: 1, price: 13.00 }
    ],
    totalAmount: 55.00,
    customerName: 'Arthur & Clara Dent',
    customerEmail: 'arthur.dent@galaxymail.org',
    customerPhone: '+1 (555) 420-1981',
    status: 'confirmed',
    qrCodeValue: 'CRMSN-52119-FLM8-RM4-D3D4D5'
  }
];
