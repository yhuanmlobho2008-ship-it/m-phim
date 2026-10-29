import { ScreeningRoom } from '../types/cinema';

export const INITIAL_ROOMS: ScreeningRoom[] = [
  {
    id: 'room-1',
    name: 'Hall 1 — Grand IMAX® Laser',
    type: 'IMAX',
    formatName: 'IMAX 3D',
    rows: 8, // A to H
    seatsPerRow: 12,
    totalSeats: 96,
    audioSystem: 'IMAX 12-Channel Spatial Immersion',
    screenSpecs: '24m × 14m Curved High-Gain Silver Screen with Dual 4K Laser',
    basePriceMultiplier: 1.45
  },
  {
    id: 'room-2',
    name: 'Hall 2 — Dolby Cinema™ Atmos',
    type: 'Dolby',
    formatName: 'Dolby Cinema',
    rows: 7, // A to G
    seatsPerRow: 10,
    totalSeats: 70,
    audioSystem: 'Dolby Atmos® 128-Channel Object Audio',
    screenSpecs: 'Dolby Vision® High Dynamic Range Dual Laser',
    basePriceMultiplier: 1.30
  },
  {
    id: 'room-3',
    name: 'Hall 3 — Velvet VIP Gold Lounge',
    type: 'VIP',
    formatName: 'VIP Lounge',
    rows: 5, // A to E
    seatsPerRow: 8,
    totalSeats: 40,
    audioSystem: 'Custom JBL Synthesis Studio Reference Sound',
    screenSpecs: 'Motorized Velvet Crimson Recliners with Dine-In Service',
    basePriceMultiplier: 1.75
  },
  {
    id: 'room-4',
    name: 'Hall 4 — Cinema Classic Screen',
    type: 'Standard',
    formatName: 'Standard 2D',
    rows: 8, // A to H
    seatsPerRow: 10,
    totalSeats: 80,
    audioSystem: 'Barco 7.1 Surround Sound Array',
    screenSpecs: 'Christie CP4430 4K High Frame Rate Digital Cinema',
    basePriceMultiplier: 1.0
  }
];
