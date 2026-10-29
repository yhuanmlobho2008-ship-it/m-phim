import React, { useRef } from 'react';
import { useCinema } from '../context/CinemaContext';
import { X, Printer, Calendar, CheckCircle2, QrCode, Film, Clock, MapPin, Sparkles } from 'lucide-react';

export const TicketPassModal: React.FC = () => {
  const { activeTicketPass, closeTicketPass, setIsMyBookingsOpen, showToast } = useCinema();
  const ticketRef = useRef<HTMLDivElement>(null);

  if (!activeTicketPass) return null;

  const handlePrint = () => {
    window.print();
    showToast('Sent ticket pass to printer.', 'info');
  };

  const handleAddToCalendar = () => {
    // Generate simple calendar event
    const title = `Movie: ${activeTicketPass.movieTitle} at Crimson Cinema`;
    const details = `Auditorium: ${activeTicketPass.roomName}\\nSeats: ${activeTicketPass.seats.map(s => s.id).join(', ')}\\nBooking Ref: ${activeTicketPass.id}`;
    const location = `Crimson Cinema Premier, Screen ${activeTicketPass.roomName}`;

    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location}`,
      `DTSTART:${activeTicketPass.showtimeDate.replace(/-/g, '')}T${activeTicketPass.showtimeStart.replace(':', '')}00Z`,
      `DTEND:${activeTicketPass.showtimeDate.replace(/-/g, '')}T235900Z`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${activeTicketPass.id}_cinema_ticket.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Calendar invite (.ics) downloaded.', 'success');
  };

  const handleOpenMyBookings = () => {
    closeTicketPass();
    setIsMyBookingsOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0e0e13] border border-neutral-800 rounded-3xl shadow-2xl shadow-rose-950/40 overflow-hidden my-auto">
        {/* Top ribbon */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-[#14141d] border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Booking Confirmed & Ready
            </span>
          </div>

          <button
            onClick={closeTicketPass}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            aria-label="Close pass"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Ticket Container */}
        <div ref={ticketRef} className="p-6 space-y-6">
          {/* Boarding Pass Box */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#181822] via-[#121218] to-[#0c0c10] border border-neutral-700/80 shadow-2xl">
            {/* Ticket Header */}
            <div className="p-5 border-b border-dashed border-neutral-700 bg-gradient-to-r from-rose-950/60 to-neutral-900/80 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-1.5 text-rose-500 font-cinematic text-xs font-bold tracking-widest uppercase mb-1">
                  <Film className="w-3.5 h-3.5" />
                  <span>Crimson Cinema Premiere Pass</span>
                </div>
                <h3 className="font-cinematic text-xl font-black text-white leading-tight">
                  {activeTicketPass.movieTitle}
                </h3>
                <span className="inline-block mt-1 text-[11px] font-bold text-rose-300 px-2 py-0.5 rounded bg-rose-900/60 border border-rose-800">
                  {activeTicketPass.format}
                </span>
              </div>

              {/* Booking Ref */}
              <div className="text-right shrink-0">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-mono">
                  Booking Ref
                </span>
                <span className="text-sm font-mono font-black text-rose-400 tracking-wider">
                  {activeTicketPass.id}
                </span>
              </div>
            </div>

            {/* Cutout punch holes */}
            <div className="absolute -left-3 top-[102px] w-6 h-6 rounded-full bg-[#0e0e13] border-r border-neutral-700" />
            <div className="absolute -right-3 top-[102px] w-6 h-6 rounded-full bg-[#0e0e13] border-l border-neutral-700" />

            {/* Ticket Details Body */}
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Screening Date</span>
                  <div className="flex items-center gap-1 text-neutral-200 font-semibold font-mono mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{activeTicketPass.showtimeDate}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Showtime Starts</span>
                  <div className="flex items-center gap-1 text-white font-bold font-mono text-sm mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-rose-500" />
                    <span>{activeTicketPass.showtimeStart}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Auditorium</span>
                  <div className="flex items-center gap-1 text-neutral-200 font-semibold mt-0.5 truncate">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{activeTicketPass.roomName}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Passholder</span>
                  <span className="text-neutral-200 font-semibold block mt-0.5 truncate">
                    {activeTicketPass.customerName}
                  </span>
                </div>
              </div>

              {/* Reserved Seats Bar */}
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
                  Reserved Seats ({activeTicketPass.seats.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeTicketPass.seats.map(s => (
                    <span
                      key={s.id}
                      className="px-2.5 py-1 text-xs font-mono font-extrabold rounded-md bg-rose-950 border border-rose-800 text-rose-200"
                    >
                      Row {s.row} · Seat {s.number}
                    </span>
                  ))}
                </div>
              </div>

              {/* Concessions if any */}
              {activeTicketPass.concessions.length > 0 && (
                <div className="p-3 rounded-xl bg-neutral-900/70 border border-neutral-800/80 text-xs">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block mb-1">
                    Refreshments Included
                  </span>
                  <div className="space-y-1">
                    {activeTicketPass.concessions.map(c => (
                      <div key={c.id} className="flex justify-between text-neutral-300 text-[11px]">
                        <span>{c.quantity}x {c.name}</span>
                        <span className="font-mono">${(c.price * c.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* QR Code & Barcode Verification */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800">
                <div className="flex items-center gap-3">
                  {/* Visual QR Code box */}
                  <div className="w-20 h-20 p-1.5 rounded-lg bg-white flex items-center justify-center shrink-0 shadow">
                    <QrCode className="w-full h-full text-black stroke-[1.5]" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                      Digital Admission Gate
                    </span>
                    <p className="text-[11px] text-neutral-300 font-mono mt-0.5">
                      Present at usher entrance or counter.
                    </p>
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-1">
                      Status: Valid for Entry
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 block font-mono">Total Paid/Reserved</span>
                  <span className="text-xl font-mono font-black text-rose-400">
                    ${activeTicketPass.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="p-4 bg-[#14141d] border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-400" />
              <span>Print / Save Pass</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-rose-400" />
              <span>Add to Calendar</span>
            </button>
          </div>

          <button
            onClick={handleOpenMyBookings}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950 transition-all cursor-pointer"
          >
            View in My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};
