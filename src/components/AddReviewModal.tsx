import React, { useState } from 'react';
import { Star, X, Check, MessageSquare, User, Sparkles } from 'lucide-react';
import { Review } from '../types';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [orderedItem, setOrderedItem] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Zəhmət olmasa adınızı qeyd edin.');
      return;
    }
    if (!comment.trim() || comment.trim().length < 10) {
      setError('Zəhmət olmasa ən azı 10 simvoldan ibarət şərh yazın.');
      return;
    }

    onSubmitReview({
      name: name.trim(),
      rating,
      comment: comment.trim(),
      orderedItem: orderedItem.trim() || 'Alov Menyusu',
      isVerified: true
    });

    // Reset & close
    setName('');
    setRating(5);
    setComment('');
    setOrderedItem('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative gold-border-glow"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-zinc-900/90 border-b border-zinc-800 p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-zinc-100">Şərh və Rəy Əlavə Et</h3>
              <p className="text-xs text-zinc-400">Təcrübənizi bizimlə və digər qonaqlarla bölüşün</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800/80 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-red-900/30 border border-red-800/50 text-red-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Adınız və Soyadınız *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="məs. Məmməd Məmmədov"
                className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                required
              />
            </div>
          </div>

          {/* Star Rating Interactive Selection */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Qiymətləndirməniz (Ulduz) *
            </label>
            <div className="flex items-center gap-2 bg-zinc-900 p-3 rounded-2xl border border-zinc-800 justify-center">
              {[1, 2, 3, 4, 5].map((star) => {
                const isActive = (hoverRating || rating) >= star;
                return (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    onClick={() => setRating(star)}
                    className="p-1 focus:outline-none transition-transform hover:scale-125"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        isActive
                          ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                          : 'fill-zinc-800 text-zinc-700'
                      }`}
                    />
                  </button>
                );
              })}
              <span className="ml-3 text-amber-400 font-extrabold text-lg">
                {hoverRating || rating}.0
              </span>
            </div>
          </div>

          {/* Ordered Dish (Optional) */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Daddığınız Məhsul (İstəyə görə)
            </label>
            <input
              type="text"
              value={orderedItem}
              onChange={(e) => setOrderedItem(e.target.value)}
              placeholder="məs. Kuşbaşı Pide, Smash Burger, Lahmacun"
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Comment Textarea */}
          <div>
            <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Şərhiniz *
            </label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Yeməyin dadı, çatdırılma sürəti və xidmət barədə təəssüratlarınızı yazın..."
              className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-zinc-100 text-sm focus:outline-none focus:border-amber-500"
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-800"
            >
              Ləğv Et
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-zinc-950 text-xs font-extrabold hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-zinc-950" />
              <span>Rəyi Göndər</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
