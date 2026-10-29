import React, { useState, useMemo } from 'react';
import { useCinema } from '../context/CinemaContext';
import {
  X,
  Calendar,
  Clock,
  Ticket,
  Check,
  Armchair,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { SeatType, SelectedSeatInfo } from '../types/cinema';
import { TODAY_DATE, TOMORROW_DATE, DAY_AFTER_DATE, DAY_THREE_DATE } from '../data/mockShowtimes';

export const BookingModal: React.FC = () => {
  const {
    activeBookingMovie,
    isBookingOpen,
    closeBookingModal,
    showtimes,
    screeningRooms,
    concessions,
    selectedSeats,
    toggleSeat,
    clearSelectedSeats,
    selectedConcessions,
    updateConcessionQuantity,
    confirmBooking,
    activeShowtime,
    setActiveShowtime,
    showToast
  } = useCinema();

  // Booking step: 1 = Showtime & Date, 2 = Seat Map, 3 = Concessions & Checkout
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>(TODAY_DATE);

  // Customer form details
  const [customerName, setCustomerName] = useState<string>('Alex Thorne');
  const [customerEmail, setCustomerEmail] = useState<string>('alex.thorne@cinema-member.com');
  const [customerPhone, setCustomerPhone] = useState<string>('+1 (555) 782-9014');
  const [formError, setFormError] = useState<string>('');

  if (!isBookingOpen || !activeBookingMovie) return null;

  // Available dates for selector
  const dateOptions = [
    { label: 'Today', value: TODAY_DATE },
    { label: 'Tomorrow', value: TOMORROW_DATE },
    { label: 'Day 3', value: DAY_AFTER_DATE },
    { label: 'Day 4', value: DAY_THREE_DATE }
  ];

  // Showtimes for active movie on selected date
  const filteredShowtimes = showtimes.filter(
    s => s.movieId === activeBookingMovie.id && s.date === selectedDate
  );

  // If no active showtime or active showtime is for a different movie/date, select first available
  const currentShowtime = activeShowtime && activeShowtime.movieId === activeBookingMovie.id && activeShowtime.date === selectedDate
    ? activeShowtime
    : filteredShowtimes[0] || null;

  // Active screening room
  const currentRoom = screeningRooms.find(r => r.id === currentShowtime?.roomId) || screeningRooms[0];

  // Generate seating grid based on room layout
  const rowsList = useMemo(() => {
    const list = [];
    for (let i = 0; i < currentRoom.rows; i++) {
      const rowLetter = String.fromCharCode(65 + i); // A, B, C...
      const seats = [];

      for (let num = 1; num <= currentRoom.seatsPerRow; num++) {
        const seatId = `${rowLetter}-${num}`;
        let type: SeatType = 'standard';
        let price = currentShowtime ? currentShowtime.basePrice : 18;

        // Seat type logic
        if (i === 0 && (num <= 2 || num >= currentRoom.seatsPerRow - 1)) {
          type = 'accessible';
          price = Math.round(price * 0.9);
        } else if (i >= currentRoom.rows - 3 && i < currentRoom.rows - 1) {
          type = 'vip';
          price = Math.round(price * 1.3);
        } else if (i === currentRoom.rows - 1) {
          type = 'couple';
          price = Math.round(price * 1.25);
        }

        const isReserved = currentShowtime?.reservedSeats.includes(seatId);
        const isSelected = selectedSeats.some(s => s.id === seatId);

        seats.push({
          id: seatId,
          row: rowLetter,
          number: num,
          type,
          price,
          status: isReserved ? ('reserved' as const) : isSelected ? ('selected' as const) : ('available' as const)
        });
      }
      list.push({ rowLetter, seats });
    }
    return list;
  }, [currentRoom, currentShowtime, selectedSeats]);

  // Calculations
  const seatsSubtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const concessionsSubtotal = selectedConcessions.reduce((sum, c) => sum + (c.price * c.quantity), 0);
  const totalAmount = seatsSubtotal + concessionsSubtotal;

  const handleSeatClick = (seat: { id: string; row: string; number: number; type: SeatType; price: number; status: string }) => {
    if (seat.status === 'reserved') {
      showToast(`Seat ${seat.id} is already reserved by another guest.`, 'info');
      return;
    }
    toggleSeat({
      id: seat.id,
      row: seat.row,
      number: seat.number,
      type: seat.type,
      price: seat.price
    });
  };

  const handleProceedToConcessions = () => {
    if (selectedSeats.length === 0) {
      showToast('Please select at least 1 seat before proceeding.', 'info');
      return;
    }
    setCurrentStep(3);
  };

  const handleFinalBookingConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) {
      setFormError('Please provide your name and email for the ticket pass.');
      return;
    }
    setFormError('');
    confirmBooking({
      name: customerName,
      email: customerEmail,
      phone: customerPhone
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0f0f14] border border-neutral-800 rounded-2xl shadow-2xl shadow-black overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800/80 bg-[#14141b] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-950 border border-rose-800/60 flex items-center justify-center">
              <Ticket className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                  {currentStep === 1 ? 'Step 1: Showtime' : currentStep === 2 ? 'Step 2: Auditorium Seating' : 'Step 3: Review & Pass Confirmation'}
                </span>
                <span className="text-neutral-600">·</span>
                <span className="text-xs text-neutral-400">{activeBookingMovie.ageRating}</span>
              </div>
              <h2 className="font-cinematic text-lg sm:text-xl font-bold text-white truncate max-w-md">
                {activeBookingMovie.title}
              </h2>
            </div>
          </div>

          {/* Stepper indicator & close */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-400">
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${currentStep === 1 ? 'bg-rose-600 text-white' : 'bg-neutral-800 text-neutral-300'}`}>1</span>
              <span className="text-neutral-600">—</span>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${currentStep === 2 ? 'bg-rose-600 text-white' : currentStep > 2 ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-neutral-800 text-neutral-400'}`}>2</span>
              <span className="text-neutral-600">—</span>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${currentStep === 3 ? 'bg-rose-600 text-white' : 'bg-neutral-800 text-neutral-400'}`}>3</span>
            </div>

            <button
              onClick={closeBookingModal}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close booking modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* ================= STEP 1: DATE & SHOWTIME ================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Date selection strip */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                  Select Screening Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {dateOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedDate(opt.value)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        selectedDate === opt.value
                          ? 'bg-rose-950/80 border-rose-600 text-white shadow-lg shadow-rose-950/40'
                          : 'bg-[#141419] border-neutral-800 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
                      }`}
                    >
                      <span className="text-xs font-bold">{opt.label}</span>
                      <span className="text-[11px] text-neutral-400 font-mono mt-0.5">{opt.value}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Showtimes slots */}
              <div>
                <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2.5">
                  Available Showtimes & Auditoriums ({filteredShowtimes.length})
                </label>

                {filteredShowtimes.length === 0 ? (
                  <div className="p-8 text-center rounded-xl bg-neutral-900/50 border border-neutral-800 text-neutral-400 text-xs">
                    No scheduled screenings for {selectedDate}. Please select another date above or visit our Coming Soon section.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredShowtimes.map(st => {
                      const room = screeningRooms.find(r => r.id === st.roomId) || screeningRooms[0];
                      const isCurrent = currentShowtime?.id === st.id;
                      const availableCount = room.totalSeats - st.reservedSeats.length;

                      return (
                        <div
                          key={st.id}
                          onClick={() => setActiveShowtime(st)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isCurrent
                              ? 'bg-gradient-to-br from-rose-950/70 to-[#180d13] border-rose-600 shadow-xl shadow-rose-950/30'
                              : 'bg-[#14141a] border-neutral-800/90 hover:border-neutral-700 hover:bg-[#181820]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-xl font-extrabold text-white">
                                  {st.startTime}
                                </span>
                                <span className="text-[11px] font-bold text-rose-300 px-2 py-0.5 rounded bg-rose-950 border border-rose-800">
                                  {st.format}
                                </span>
                              </div>
                              <h4 className="text-xs font-semibold text-neutral-200">
                                {room.name}
                              </h4>
                              <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                                {room.audioSystem}
                              </p>
                            </div>

                            <div className="text-right">
                              <span className="text-sm font-bold text-neutral-100 font-mono">
                                ${st.basePrice.toFixed(2)}
                              </span>
                              <span className="block text-[10px] text-neutral-400">per ticket</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80 text-[11px]">
                            <span className="text-neutral-400">
                              <span className="text-emerald-400 font-bold">{availableCount}</span> of {room.totalSeats} seats open
                            </span>
                            <span className={`font-semibold ${isCurrent ? 'text-rose-400' : 'text-neutral-400'}`}>
                              {isCurrent ? 'Selected ✓' : 'Click to Select'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Step 1 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="px-4 py-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={!currentShowtime}
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:pointer-events-none rounded-xl shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
                >
                  <span>Choose Seats</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: INTERACTIVE SEATING MAP ================= */}
          {currentStep === 2 && currentShowtime && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Screening summary bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-[#14141b] border border-neutral-800 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">{currentRoom.name}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-rose-400 font-mono font-bold">{currentShowtime.format}</span>
                  <span className="text-neutral-600">·</span>
                  <span className="text-neutral-300 font-mono">{currentShowtime.date} at {currentShowtime.startTime}</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <span>Selected:</span>
                  <span className="font-bold text-white font-mono">{selectedSeats.length} seats</span>
                  <span className="text-rose-400 font-bold font-mono">(${seatsSubtotal.toFixed(2)})</span>
                </div>
              </div>

              {/* CINEMA SCREEN PROJECTION ARCH */}
              <div className="relative pt-2 pb-6 flex flex-col items-center">
                <div className="w-4/5 max-w-xl h-2 bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full shadow-[0_0_25px_rgba(244,63,94,0.7)] mb-2" />
                <div className="w-3/4 max-w-lg h-8 bg-gradient-to-b from-rose-500/10 to-transparent rounded-t-[100%] border-t border-rose-400/40" />
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-neutral-400">
                  Auditorium Curved Screen
                </span>
              </div>

              {/* SEAT GRID */}
              <div className="overflow-x-auto pb-4">
                <div className="min-w-[620px] max-w-3xl mx-auto space-y-2">
                  {rowsList.map(({ rowLetter, seats }) => (
                    <div key={rowLetter} className="flex items-center justify-center gap-2">
                      {/* Row Label Left */}
                      <span className="w-5 text-center text-xs font-bold text-neutral-500 font-mono">
                        {rowLetter}
                      </span>

                      {/* Seats in row */}
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {seats.map((seat, seatIdx) => {
                          const isAisle = (seatIdx === 2 || seatIdx === seats.length - 3);

                          let buttonStyle = 'bg-neutral-800/80 border-neutral-700/80 text-neutral-300 hover:border-rose-500 hover:bg-neutral-700';

                          if (seat.status === 'reserved') {
                            buttonStyle = 'bg-neutral-900 border-neutral-900 text-neutral-700 cursor-not-allowed opacity-40';
                          } else if (seat.status === 'selected') {
                            buttonStyle = 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-900/60 scale-105';
                          } else if (seat.type === 'vip') {
                            buttonStyle = 'bg-[#1f1519] border-amber-500/50 text-amber-200 hover:border-amber-400 hover:bg-amber-950/40';
                          } else if (seat.type === 'couple') {
                            buttonStyle = 'bg-[#210c14] border-rose-700/70 text-rose-200 hover:border-rose-500';
                          } else if (seat.type === 'accessible') {
                            buttonStyle = 'bg-[#101923] border-cyan-800 text-cyan-200 hover:border-cyan-500';
                          }

                          return (
                            <React.Fragment key={seat.id}>
                              <button
                                type="button"
                                disabled={seat.status === 'reserved'}
                                onClick={() => handleSeatClick(seat)}
                                title={`${seat.row}${seat.number} (${seat.type.toUpperCase()}) - $${seat.price.toFixed(2)}`}
                                className={`w-8 sm:w-9 h-8 sm:h-9 rounded-lg border flex flex-col items-center justify-center text-[10px] font-mono font-bold transition-all ${buttonStyle}`}
                              >
                                {seat.status === 'selected' ? (
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                ) : (
                                  <span>{seat.number}</span>
                                )}
                              </button>
                              {/* Add walking aisle spacing */}
                              {isAisle && <div className="w-4 sm:w-6" />}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      {/* Row Label Right */}
                      <span className="w-5 text-center text-xs font-bold text-neutral-500 font-mono">
                        {rowLetter}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEAT LEGEND */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-neutral-800 border border-neutral-700" />
                  <span>Available ($18–$24)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-rose-600 border border-rose-400" />
                  <span className="text-white font-medium">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-neutral-900 border border-neutral-900 opacity-40" />
                  <span>Reserved</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-[#1f1519] border border-amber-500/70" />
                  <span>VIP Recliner ($28+)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-[#101923] border border-cyan-800" />
                  <span>Wheelchair Accessible</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-[#210c14] border border-rose-700" />
                  <span>Couple Sofa</span>
                </div>
              </div>

              {/* Selected Seats summary strip */}
              {selectedSeats.length > 0 && (
                <div className="p-4 rounded-xl bg-[#14141c] border border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-neutral-400">Your Seats:</span>
                    {selectedSeats.map(s => (
                      <span
                        key={s.id}
                        className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-rose-950 border border-rose-800 text-rose-200"
                      >
                        {s.id} (${s.price})
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={clearSelectedSeats}
                      className="text-[11px] text-neutral-400 hover:text-white underline ml-2"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400">Seats Subtotal:</span>
                    <span className="text-base font-bold text-white font-mono">
                      ${seatsSubtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}

              {/* Step 2 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Showtimes</span>
                </button>

                <button
                  type="button"
                  disabled={selectedSeats.length === 0}
                  onClick={handleProceedToConcessions}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:pointer-events-none rounded-xl shadow-lg shadow-rose-950/50 transition-all cursor-pointer"
                >
                  <span>Continue to Add-Ons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: CONCESSIONS, REVIEW & CONFIRMATION ================= */}
          {currentStep === 3 && currentShowtime && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Concessions selection */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-4 h-4 text-rose-500" />
                      <h3 className="text-sm font-bold text-white">
                        Concessions & Gourmet Refreshments
                      </h3>
                    </div>
                    <span className="text-[11px] text-neutral-400">Optional cinema snacks</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {concessions.map(item => {
                      const selected = selectedConcessions.find(c => c.id === item.id);
                      const qty = selected?.quantity || 0;

                      return (
                        <div
                          key={item.id}
                          className="p-3.5 rounded-xl bg-[#14141a] border border-neutral-800 flex flex-col justify-between space-y-2 hover:border-neutral-700 transition-colors"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-1 mb-1">
                              <h4 className="text-xs font-bold text-white leading-snug">
                                {item.name}
                              </h4>
                              <span className="text-xs font-mono font-bold text-rose-400 shrink-0">
                                ${item.price.toFixed(2)}
                              </span>
                            </div>
                            <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800/80">
                            {qty > 0 && (
                              <button
                                type="button"
                                onClick={() => updateConcessionQuantity(item, -1)}
                                className="w-6 h-6 rounded-md bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                            )}

                            <span className="text-xs font-bold font-mono text-white min-w-[20px] text-center">
                              {qty > 0 ? `${qty} in cart` : ''}
                            </span>

                            <button
                              type="button"
                              onClick={() => updateConcessionQuantity(item, 1)}
                              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-rose-950 border border-rose-800 text-rose-200 hover:bg-rose-900 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>{qty > 0 ? 'Add more' : 'Add'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Order Summary & Customer Pass Form */}
                <div className="lg:col-span-5 bg-[#14141b] border border-neutral-800 rounded-xl p-5 space-y-4">
                  <div className="border-b border-neutral-800 pb-3">
                    <span className="text-[10px] font-bold text-rose-500 uppercase tracking-widest">
                      Reservation Summary
                    </span>
                    <h3 className="font-bold text-base text-white mt-0.5">
                      {activeBookingMovie.title}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      {currentRoom.name} ({currentShowtime.format})
                    </p>
                    <p className="text-xs text-neutral-300 font-mono mt-1">
                      {currentShowtime.date} · {currentShowtime.startTime}
                    </p>
                  </div>

                  {/* Seat badges */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Seats ({selectedSeats.length}):</span>
                      <span className="text-neutral-200 font-mono font-semibold">
                        {selectedSeats.map(s => s.id).join(', ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-neutral-400">
                      <span>Tickets Subtotal:</span>
                      <span className="font-mono text-neutral-200">${seatsSubtotal.toFixed(2)}</span>
                    </div>

                    {selectedConcessions.length > 0 && (
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>Refreshments ({selectedConcessions.reduce((a, b) => a + b.quantity, 0)}):</span>
                        <span className="font-mono text-neutral-200">${concessionsSubtotal.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-neutral-800 text-sm font-bold text-white">
                      <span>Total Amount:</span>
                      <span className="text-rose-400 font-mono text-lg">${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Customer Information Form */}
                  <form onSubmit={handleFinalBookingConfirmation} className="space-y-3 pt-3 border-t border-neutral-800">
                    <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider block">
                      Ticket Passholder Information
                    </span>

                    {formError && (
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={e => setCustomerName(e.target.value)}
                          placeholder="e.g. Marcus Sterling"
                          className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Email (for digital ticket pass)</label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={e => setCustomerEmail(e.target.value)}
                          placeholder="e.g. marcus@example.com"
                          className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] text-neutral-400 mb-1">Mobile Phone (SMS updates)</label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={customerPhone}
                          onChange={e => setCustomerPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-rose-600"
                        />
                      </div>
                    </div>

                    {/* Notice about no payment processing needed */}
                    <div className="p-2.5 rounded-lg bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-400 leading-relaxed">
                      <div className="flex items-center gap-1.5 text-rose-400 font-semibold mb-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Instant Ticket Pass Confirmation</span>
                      </div>
                      No online payment required. Confirmed tickets will be added immediately to your account and a digital cinema pass generated with QR check-in.
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 text-xs font-bold text-white bg-gradient-to-r from-rose-700 via-rose-600 to-rose-700 hover:from-rose-600 hover:to-rose-500 rounded-xl shadow-lg shadow-rose-950/60 border border-rose-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
                    >
                      Confirm Reservation & Generate Digital Pass
                    </button>
                  </form>
                </div>
              </div>

              {/* Step 3 Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-neutral-300 hover:text-white"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Seat Map</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
