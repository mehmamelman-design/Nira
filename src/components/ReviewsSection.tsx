import React, { useState, useEffect } from 'react';
import { Star, Search, Plus, ThumbsUp, CheckCircle } from 'lucide-react';
import { Review } from '../types';
import { INITIAL_REVIEWS } from '../data/initialData';
import { AddReviewModal } from './AddReviewModal';
import { saveReviewsConfig } from '../lib/cmsStore';

interface ReviewsSectionProps {
  reviews?: Review[];
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ reviews: externalReviews }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [votedHelpful, setVotedHelpful] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    if (externalReviews && externalReviews.length > 0) {
      setReviews(externalReviews);
    } else {
      setReviews(INITIAL_REVIEWS);
    }
  }, [externalReviews]);

  const handleAddReview = async (reviewData: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'İndi yazıldı',
      helpfulCount: 0,
      isVerified: true,
      avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(reviewData.name)}`,
      status: 'pending' // new customer reviews are set to pending for Admin approval
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      await saveReviewsConfig(updated);
    } catch (e) {
      console.error('Failed to save review to Firestore:', e);
    }
  };

  const handleToggleHelpful = (reviewId: string) => {
    if (votedHelpful[reviewId]) return;
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)));
    setVotedHelpful((prev) => ({ ...prev, [reviewId]: true }));
  };

  // Filter reviews (only show approved or default reviews)
  const approvedReviews = reviews.filter((r) => (r.status || 'approved') === 'approved');

  const filteredReviews = approvedReviews.filter((rev) => {
    const matchesQuery =
      rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (rev.orderedItem && rev.orderedItem.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesQuery;
  });

  // Calculate statistics
  const totalReviews = approvedReviews.length;
  const avgRating = totalReviews > 0
    ? (approvedReviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const starCounts = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: approvedReviews.filter((r) => r.rating === s).length,
    percentage: totalReviews > 0
      ? Math.round((approvedReviews.filter((r) => r.rating === s).length / totalReviews) * 100)
      : 0
  }));

  return (
    <section id="reviews" className="py-20 bg-[#0b291d] border-b border-emerald-900/80 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-700/80 text-white text-xs font-extrabold uppercase tracking-widest">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Müştəri Məmnuniyyəti</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Müştərilərimiz Bizim Haqqımızda <span className="text-emerald-300">Nə Deyir?</span>
          </h2>
          <p className="text-emerald-200/80 text-sm sm:text-base">
            Gündəlik yüzlərlə qonağımızın təəssüratları və həqiqi rəyləri. Biz hər bir rəyə xüsusi diqqətlə yanaşırıq.
          </p>
        </div>

        {/* Statistic & Filter Card */}
        <div className="bg-emerald-900/60 border border-emerald-800 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Rating Summary Block */}
            <div className="lg:col-span-4 text-center lg:text-left border-b lg:border-b-0 lg:border-r border-emerald-800/80 pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-5xl sm:text-6xl font-black text-white">{avgRating}</span>
                <div>
                  <div className="flex text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-emerald-200/80 font-medium">
                    Ümumi {totalReviews} təsdiqlənmiş rəy əsasında
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-black text-white font-extrabold text-sm hover:bg-zinc-900 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3] text-white" />
                <span className="text-white">Rəy Əlavə Et</span>
              </button>
            </div>

            {/* Rating Breakdown Bars */}
            <div className="lg:col-span-8 space-y-4">
              {/* Bars */}
              <div className="space-y-2">
                {starCounts.map((s) => (
                  <div key={s.stars} className="flex items-center gap-3 text-xs">
                    <div className="w-12 text-emerald-200 font-semibold flex items-center gap-1">
                      <span>{s.stars}</span>
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    </div>
                    <div className="flex-1 h-2.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-800">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{ width: `${s.percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-emerald-200/80 font-mono text-[11px]">
                      {s.count} rəy
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

        {/* Search Bar for Reviews */}
        <div className="mb-8 max-w-lg mx-auto relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Rəylərdə axtarış edin (məsələn: Pide, Çatdırılma, Dadlı)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-black border border-white/40 text-white placeholder-white/90 text-xs sm:text-sm focus:outline-none focus:border-white"
          />
        </div>

        {/* Reviews Cards Grid */}
        {filteredReviews.length === 0 ? (
          <div className="text-center py-12 bg-emerald-900/40 rounded-3xl border border-emerald-800">
            <p className="text-emerald-200 text-sm">Seçilmiş filtrlərə uyğun heç bir şərh tapılmadı.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-emerald-900/70 border border-emerald-800/90 rounded-3xl p-6 space-y-4 flex flex-col justify-between hover:border-emerald-600 transition-all duration-300"
              >
                <div className="space-y-3">
                  {/* Reviewer Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-700 text-amber-400 font-extrabold flex items-center justify-center text-sm shadow-sm shrink-0">
                        {rev.name ? rev.name.trim().charAt(0).toUpperCase() : 'M'}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          <span>{rev.name}</span>
                          {rev.isVerified && (
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400/20" title="Təsdiqlənmiş Müştəri" />
                          )}
                        </h4>
                        <span className="text-[11px] text-emerald-200/80 font-medium">{rev.date}</span>
                      </div>
                    </div>

                    {/* Star Rating */}
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating
                              ? 'fill-amber-400 stroke-amber-400'
                              : 'fill-emerald-950 stroke-emerald-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Ordered Dish Badge */}
                  {rev.orderedItem && (
                    <div className="inline-block px-2.5 py-1 rounded-lg bg-black/60 border border-emerald-700 text-white text-[11px] font-bold">
                      Sifariş: {rev.orderedItem}
                    </div>
                  )}

                  {/* Comment Content */}
                  <p className="text-xs text-emerald-100 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                {/* Helpful Button Footer */}
                <div className="pt-3 border-t border-emerald-800/80 flex items-center justify-between text-xs text-emerald-200">
                  <span className="text-[11px] text-emerald-200/80">Bu rəy faydalı oldu?</span>
                  <button
                    onClick={() => handleToggleHelpful(rev.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      votedHelpful[rev.id]
                        ? 'bg-black text-white border border-white/40'
                        : 'bg-emerald-950 border border-emerald-800 text-emerald-100 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{rev.helpfulCount}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Add Review Interactive Modal */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitReview={handleAddReview}
      />
    </section>
  );
};

