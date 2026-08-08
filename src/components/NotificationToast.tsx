import React from 'react';
import { CheckCircle2, Flame, X } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  onClose: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-zinc-900 border border-amber-500/50 rounded-2xl p-4 shadow-2xl text-zinc-100 flex items-center justify-between gap-3 animate-in slide-in-from-bottom-5 duration-300 gold-border-glow">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
          <Flame className="w-5 h-5 fill-amber-400" />
        </div>
        <p className="text-xs font-bold text-zinc-200">{message}</p>
      </div>

      <button
        onClick={onClose}
        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
