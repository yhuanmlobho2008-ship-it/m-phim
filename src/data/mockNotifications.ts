import { NotificationItem } from '../types/cinema';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Showtime Approaching',
    message: 'Your screening of "Crimson Horizon" in Hall 1 (IMAX 3D) starts in 2 hours. Doors open 20 minutes prior.',
    timestamp: '10 mins ago',
    type: 'reminder',
    read: false,
    bookingId: 'CRMSN-94812'
  },
  {
    id: 'notif-2',
    title: 'Exclusive Trailer Premiere',
    message: 'The official red band teaser for "Neon Fury: Tokyo Driftline" is now streaming in 4K HDR.',
    timestamp: '1 hour ago',
    type: 'trailer',
    read: false
  },
  {
    id: 'notif-3',
    title: 'New IMAX Laser Screenings Added',
    message: 'Weekend prime-time slots for "Symphony of Ash" are now open for seat reservations.',
    timestamp: '3 hours ago',
    type: 'promo',
    read: true
  },
  {
    id: 'notif-4',
    title: 'VIP Lounge Complimentary Perk',
    message: 'Gold Pass members receive complimentary artisan truffle popcorn with every Hall 3 reservation this week.',
    timestamp: 'Yesterday',
    type: 'promo',
    read: true
  }
];
