import React, { useState, useRef, useEffect } from 'react';
import { useCinema } from '../context/CinemaContext';
import { Bell, Film, Ticket, Sparkles, Clock, CheckCheck, Trash2 } from 'lucide-react';

export const NotificationsDropdown: React.FC = () => {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    clearNotifications,
    bookings,
    openTicketPass
  } = useCinema();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleNotificationClick = (item: (typeof notifications)[0]) => {
    markNotificationAsRead(item.id);
    if (item.bookingId) {
      const b = bookings.find(x => x.id === item.bookingId);
      if (b) {
        openTicketPass(b);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-neutral-300 hover:text-white hover:bg-neutral-900/80 rounded-lg transition-colors border border-transparent hover:border-neutral-800"
        aria-label="View notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold text-white bg-rose-600 rounded-full shadow-lg shadow-rose-900/50">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#111116] border border-neutral-800/90 rounded-xl shadow-2xl shadow-black/80 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-[#16161d]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Cinema Alerts</span>
              {unreadNotificationsCount > 0 && (
                <span className="text-[11px] text-neutral-400">({unreadNotificationsCount} new)</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadNotificationsCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="flex items-center gap-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                  <span>Mark read</span>
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="p-1 text-neutral-400 hover:text-rose-400 transition-colors"
                  title="Clear all notifications"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-neutral-900">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 text-xs">
                No notifications right now. Check back during showtime updates!
              </div>
            ) : (
              notifications.map(item => {
                const getIcon = () => {
                  switch (item.type) {
                    case 'booking':
                      return <Ticket className="w-4 h-4 text-rose-400" />;
                    case 'trailer':
                      return <Film className="w-4 h-4 text-amber-400" />;
                    case 'reminder':
                      return <Clock className="w-4 h-4 text-cyan-400" />;
                    default:
                      return <Sparkles className="w-4 h-4 text-rose-400" />;
                  }
                };

                return (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className={`p-3.5 cursor-pointer transition-colors hover:bg-neutral-900/60 flex items-start gap-3 ${
                      !item.read ? 'bg-rose-950/15' : 'bg-transparent'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-neutral-900/80 border border-neutral-800 shrink-0 mt-0.5">
                      {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-xs font-semibold truncate ${!item.read ? 'text-white' : 'text-neutral-300'}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] text-neutral-500 shrink-0">{item.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {item.message}
                      </p>
                      {item.bookingId && (
                        <span className="inline-block mt-1 text-[10px] text-rose-400 hover:underline font-medium">
                          Tap to view digital pass →
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
