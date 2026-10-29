import { Showtime } from '../types/cinema';

// Generate dynamic dates (today, tomorrow, +2 days, +3 days)
const getFormattedDate = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const TODAY_DATE = getFormattedDate(0);
export const TOMORROW_DATE = getFormattedDate(1);
export const DAY_AFTER_DATE = getFormattedDate(2);
export const DAY_THREE_DATE = getFormattedDate(3);

export const INITIAL_SHOWTIMES: Showtime[] = [
  // Film 1: Crimson Horizon (IMAX Laser & Dolby & VIP)
  {
    id: 'st-101',
    movieId: 'film-1',
    roomId: 'room-1',
    date: TODAY_DATE,
    startTime: '13:00',
    format: 'IMAX 3D',
    basePrice: 22.50,
    reservedSeats: ['D-5', 'D-6', 'D-7', 'E-5', 'E-6', 'F-6', 'F-7']
  },
  {
    id: 'st-102',
    movieId: 'film-1',
    roomId: 'room-1',
    date: TODAY_DATE,
    startTime: '16:45',
    format: 'IMAX 3D',
    basePrice: 24.00,
    reservedSeats: ['C-5', 'C-6', 'D-5', 'D-6', 'D-7', 'D-8', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'F-5', 'F-6']
  },
  {
    id: 'st-103',
    movieId: 'film-1',
    roomId: 'room-1',
    date: TODAY_DATE,
    startTime: '20:30',
    format: 'IMAX 3D',
    basePrice: 25.00,
    reservedSeats: ['D-4', 'D-5', 'D-6', 'D-7', 'D-8', 'D-9', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9', 'F-6', 'F-7']
  },
  {
    id: 'st-104',
    movieId: 'film-1',
    roomId: 'room-3',
    date: TODAY_DATE,
    startTime: '18:15',
    format: 'VIP Lounge',
    basePrice: 32.00,
    reservedSeats: ['B-3', 'B-4', 'C-3', 'C-4']
  },
  {
    id: 'st-105',
    movieId: 'film-1',
    roomId: 'room-1',
    date: TOMORROW_DATE,
    startTime: '14:00',
    format: 'IMAX 3D',
    basePrice: 22.50,
    reservedSeats: ['D-6', 'D-7', 'E-6', 'E-7']
  },
  {
    id: 'st-106',
    movieId: 'film-1',
    roomId: 'room-1',
    date: TOMORROW_DATE,
    startTime: '19:30',
    format: 'IMAX 3D',
    basePrice: 25.00,
    reservedSeats: ['C-6', 'D-5', 'D-6', 'E-5', 'E-6']
  },

  // Film 2: Night Hath No Eyes
  {
    id: 'st-201',
    movieId: 'film-2',
    roomId: 'room-2',
    date: TODAY_DATE,
    startTime: '14:30',
    format: 'Dolby Cinema',
    basePrice: 19.50,
    reservedSeats: ['C-4', 'C-5', 'D-5', 'D-6']
  },
  {
    id: 'st-202',
    movieId: 'film-2',
    roomId: 'room-2',
    date: TODAY_DATE,
    startTime: '18:00',
    format: 'Dolby Cinema',
    basePrice: 21.00,
    reservedSeats: ['D-4', 'D-5', 'D-6', 'E-4', 'E-5']
  },
  {
    id: 'st-203',
    movieId: 'film-2',
    roomId: 'room-2',
    date: TODAY_DATE,
    startTime: '21:15',
    format: 'Dolby Cinema',
    basePrice: 21.00,
    reservedSeats: ['C-5', 'C-6', 'D-4', 'D-5', 'D-6', 'D-7']
  },
  {
    id: 'st-204',
    movieId: 'film-2',
    roomId: 'room-3',
    date: TOMORROW_DATE,
    startTime: '20:45',
    format: 'VIP Lounge',
    basePrice: 30.00,
    reservedSeats: ['C-2', 'C-3', 'C-4']
  },

  // Film 3: Neon Fury
  {
    id: 'st-301',
    movieId: 'film-3',
    roomId: 'room-2',
    date: TODAY_DATE,
    startTime: '12:00',
    format: 'Dolby Cinema',
    basePrice: 19.50,
    reservedSeats: ['C-3', 'C-4', 'D-4', 'D-5']
  },
  {
    id: 'st-302',
    movieId: 'film-3',
    roomId: 'room-4',
    date: TODAY_DATE,
    startTime: '15:30',
    format: 'Standard 2D',
    basePrice: 15.00,
    reservedSeats: ['D-4', 'D-5', 'E-5', 'E-6', 'F-5']
  },
  {
    id: 'st-303',
    movieId: 'film-3',
    roomId: 'room-1',
    date: TODAY_DATE,
    startTime: '23:15',
    format: 'IMAX 3D',
    basePrice: 23.00,
    reservedSeats: ['D-6', 'D-7', 'E-6', 'E-7']
  },
  {
    id: 'st-304',
    movieId: 'film-3',
    roomId: 'room-2',
    date: TOMORROW_DATE,
    startTime: '17:30',
    format: 'Dolby Cinema',
    basePrice: 20.00,
    reservedSeats: ['D-5', 'E-5', 'E-6']
  },

  // Film 4: The Velvet Heist
  {
    id: 'st-401',
    movieId: 'film-4',
    roomId: 'room-3',
    date: TODAY_DATE,
    startTime: '15:15',
    format: 'VIP Lounge',
    basePrice: 28.00,
    reservedSeats: ['B-2', 'B-3', 'C-4', 'C-5']
  },
  {
    id: 'st-402',
    movieId: 'film-4',
    roomId: 'room-4',
    date: TODAY_DATE,
    startTime: '19:00',
    format: 'Standard 2D',
    basePrice: 15.00,
    reservedSeats: ['E-4', 'E-5', 'E-6']
  },

  // Film 5: Chrono Mirage
  {
    id: 'st-501',
    movieId: 'film-5',
    roomId: 'room-4',
    date: TODAY_DATE,
    startTime: '13:00',
    format: 'Standard 2D',
    basePrice: 15.00,
    reservedSeats: ['D-4', 'D-5']
  },
  {
    id: 'st-502',
    movieId: 'film-5',
    roomId: 'room-2',
    date: TODAY_DATE,
    startTime: '15:45',
    format: 'Dolby Cinema',
    basePrice: 19.50,
    reservedSeats: ['C-5', 'D-6']
  },

  // Film 6: Symphony of Ash
  {
    id: 'st-601',
    movieId: 'film-6',
    roomId: 'room-1',
    date: TODAY_DATE,
    startTime: '10:00',
    format: 'IMAX 3D',
    basePrice: 22.00,
    reservedSeats: ['E-5', 'E-6', 'F-5', 'F-6']
  },
  {
    id: 'st-602',
    movieId: 'film-6',
    roomId: 'room-3',
    date: TODAY_DATE,
    startTime: '21:30',
    format: 'VIP Lounge',
    basePrice: 32.00,
    reservedSeats: ['B-3', 'B-4', 'D-4', 'D-5']
  },

  // Film 7: Phantom Protocol
  {
    id: 'st-701',
    movieId: 'film-7',
    roomId: 'room-4',
    date: TODAY_DATE,
    startTime: '16:45',
    format: 'Standard 2D',
    basePrice: 15.00,
    reservedSeats: ['C-4', 'C-5']
  },

  // Film 8: Starlight Reverie
  {
    id: 'st-801',
    movieId: 'film-8',
    roomId: 'room-4',
    date: TODAY_DATE,
    startTime: '11:00',
    format: 'Standard 2D',
    basePrice: 14.00,
    reservedSeats: ['D-3', 'D-4', 'D-5', 'E-3', 'E-4', 'E-5']
  },
  {
    id: 'st-802',
    movieId: 'film-8',
    roomId: 'room-2',
    date: TODAY_DATE,
    startTime: '13:45',
    format: 'Dolby Cinema',
    basePrice: 18.50,
    reservedSeats: ['C-5', 'C-6', 'D-5']
  },

  // Film 9: Obsidian Crest
  {
    id: 'st-901',
    movieId: 'film-9',
    roomId: 'room-4',
    date: TODAY_DATE,
    startTime: '21:45',
    format: 'Standard 2D',
    basePrice: 15.00,
    reservedSeats: ['E-5', 'E-6']
  },

  // Film 10: Deep Trench: Protocol Zero
  {
    id: 'st-1001',
    movieId: 'film-10',
    roomId: 'room-3',
    date: TODAY_DATE,
    startTime: '12:30',
    format: 'VIP Lounge',
    basePrice: 28.00,
    reservedSeats: ['B-4', 'C-4']
  },

  // Film 11: The Paris Encounter
  {
    id: 'st-1101',
    movieId: 'film-11',
    roomId: 'room-3',
    date: TODAY_DATE,
    startTime: '16:00',
    format: 'VIP Lounge',
    basePrice: 28.00,
    reservedSeats: ['A-3', 'A-4', 'B-3', 'B-4']
  },

  // Film 12: Apex Predator
  {
    id: 'st-1201',
    movieId: 'film-12',
    roomId: 'room-4',
    date: TODAY_DATE,
    startTime: '23:00',
    format: 'Standard 2D',
    basePrice: 14.50,
    reservedSeats: ['D-4', 'E-4']
  }
];
