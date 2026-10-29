import React, { useState } from 'react';
import { useCinema } from '../context/CinemaContext';
import { X, Ticket, Calendar, Clock, MapPin, QrCode, AlertTriangle } from 'lucide-react';
import { TicketBooking } from '../types/cinema';

export const MyBookingsModal: React.FC = () => {
  const {
    isMyBookingsOpen,
    setIsMyBookingsOpen,
    bookings,
    openTicketPass,
    cancelBooking
  } = useCinema();

  const [filter, setFilter] = useState<'all' | 'confirmed' | 'checked_in' | 'cancelled'>('all');

  if (!isMyBookingsOpen) return null;

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#0f0f14] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-[#14141d] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-800/60 flex items-center justify-center">
              <Ticket className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <h2 className="font-cinematic text-lg font-bold text-white">
                My Cinema Passes & Cart
              </h2>
              <p className="text-xs text-neutral-400">
                Manage your active theater bookings and scannable tickets
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsMyBookingsOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter strip */}
        <div className="px-6 py-3 border-b border-neutral-800/60 bg-[#111117] flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'all' ? 'bg-rose-900/80 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'confirmed' ? 'bg-rose-900/80 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Active Passes ({bookings.filter(b => b.status === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilter('checked_in')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'checked_in' ? 'bg-rose-900/80 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Admitted ({bookings.filter(b => b.status === 'checked_in').length})
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              filter === 'cancelled' ? 'bg-rose-900/80 text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            Cancelled ({bookings.filter(b => b.status === 'cancelled').length})
          </button>
        </div>

        {/* Bookings List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="py-16 text-center text-neutral-400 space-y-2">
              <Ticket className="w-10 h-10 text-neutral-600 mx-auto" />
              <p className="text-sm font-semibold text-neutral-300">No ticket passes found</p>
              <p className="text-xs text-neutral-500">
                Reserve tickets from our Now Showing schedule to view them here.
              </p>
            </div>
          ) : (
            filteredBookings.map((booking: TicketBooking) => {
              const isConfirmed = booking.status === 'confirmed';
              const isCheckedIn = booking.status === 'checked_in';
              const isCancelled = booking.status === 'cancelled';

              return (
                <div
                  key={booking.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    isConfirmed
                      ? 'bg-[#15151e] border-neutral-800 hover:border-neutral-700'
                      : isCheckedIn
                      ? 'bg-[#121614] border-emerald-950/80'
                      : 'bg-[#161214] border-neutral-900 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={booking.posterUrl}
                      alt={booking.movieTitle}
                      referrerPolicy="no-referrer"
                      className="w-16 h-22 object-cover rounded-lg border border-neutral-800 shrink-0"
                    />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold text-rose-400">
                          {booking.id}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isConfirmed
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : isCheckedIn
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                              : 'bg-neutral-800 text-neutral-400'
                          }`}
                        >
                          {booking.status.replace('_', ' ')}
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-base leading-tight">
                        {booking.movieTitle}
                      </h3>

                      <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
                        <span className="flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3 text-neutral-500" />
                          {booking.showtimeDate}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1 font-mono text-white">
                          <Clock className="w-3 h-3 text-rose-500" />
                          {booking.showtimeStart}
                        </span>
                        <span>·</span>
                        <span className="text-rose-300">{booking.format}</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1 text-xs text-neutral-300">
                        <span className="text-neutral-500">Seats:</span>
                        <div className="flex flex-wrap gap-1">
                          {booking.seats.map(s => (
                            <span
                              key={s.id}
                              className="font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-200 text-[11px]"
                            >
                              {s.id}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-800 shrink-0">
                    <span className="text-base font-mono font-black text-white">
                      ${booking.totalAmount.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      {!isCancelled && (
                        <button
                          onClick={() => openTicketPass(booking)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all cursor-pointer"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>View Pass</span>
                        </button>
                      )}

                      {isConfirmed && (
                        <button
                          onClick={() => {
                            if (window.confirm(`Cancel reservation ${booking.id} and release seats?`)) {
                              cancelBooking(booking.id);
                            }
                          }}
                          className="px-2.5 py-1.5 text-xs font-medium text-neutral-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors cursor-pointer"
                          title="Cancel Booking & Refund Seats"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
