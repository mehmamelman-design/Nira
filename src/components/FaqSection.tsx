import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Çatdırılma nə qədər çəkir?',
    answer: 'Sifarişləriniz qısa müddət ərzində, isti və təzə şəkildə qapınıza çatdırılır (orta hesabla ünvandan və sıxlıqdan asılı olaraq dəyişə bilər).'
  },
  {
    id: 'faq-2',
    question: 'Yeməklərin tərkibi nədən ibarətdir?',
    answer: 'Bütün fast-food məhsullarımız və dönərlərimiz yalnız gündəlik, təmiz və keyfiyyətli ərzaqlardan, xüsusi souslardan və təzə tərəvəzlərdən hazırlanır.'
  },
  {
    id: 'faq-3',
    question: 'Fast-food və pizza yumşaqdırmı?',
    answer: 'Bəli, bəyəndiyiniz pizzalar və fast-food məhsulları xüsusi reseptlə hazırlanır, içi yumşaq və şirəli, kənarları isə ideal qızardılmış şəkildə təqdim olunur.'
  },
  {
    id: 'faq-4',
    question: 'Restoranın iş saatları necədir?',
    answer: 'Restoranımız hər gün səhər saatlarından gecəyə qədər fasiləsiz olaraq xidmətinizdədir.'
  },
  {
    id: 'faq-5',
    question: 'Allergik və ya xüsusi tərkib istəklərini qeyd etmək olarmı?',
    answer: 'Bəli, sifariş zamanı qeyd bölməsində istəklərinizi (məsələn, sousun və ya hansısa inqrediyentin çıxarılmasını) yazaraq sifarişinizi fərdiləşdirə bilərsiniz.'
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-b border-zinc-200 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-10">
          <span className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-widest block">
            TEZ-TEZ VERİLƏN SUALLAR
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 tracking-tight">
            Tez-tez verilən suallar
          </h2>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-emerald-200">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="py-3 transition-colors duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-2 flex items-center justify-between gap-2.5 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-2 min-w-0 overflow-hidden">
                    <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-bold text-emerald-950 whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-emerald-700 transition-colors">
                      {item.question}
                    </span>
                  </div>

                  <div className={`p-1 text-emerald-800 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-emerald-700' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-3 pt-1 pl-6 text-xs sm:text-sm font-semibold text-zinc-800 leading-relaxed animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
