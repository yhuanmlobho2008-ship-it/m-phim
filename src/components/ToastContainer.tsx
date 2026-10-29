import React from 'react';
import { useCinema } from '../context/CinemaContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCinema();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-[#180d12]/95 border-rose-900/60 text-neutral-100 shadow-rose-950/40'
                : isError
                ? 'bg-[#1a0a0a]/95 border-red-800 text-neutral-100 shadow-red-950/40'
                : 'bg-[#121217]/95 border-neutral-800 text-neutral-100 shadow-black/50'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-rose-500" />}
              {isError && <AlertCircle className="w-4 h-4 text-red-500" />}
              {!isSuccess && !isError && <Info className="w-4 h-4 text-neutral-400" />}
            </div>
            <div className="flex-1 text-xs leading-relaxed font-medium">
              {toast.message}
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-neutral-400 hover:text-neutral-100 shrink-0 p-0.5 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
