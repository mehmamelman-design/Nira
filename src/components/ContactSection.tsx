import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, MessageCircle, Navigation, Flame, Check } from 'lucide-react';
import { BRANCHES } from '../data/initialData';

export const ContactSection: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

  return (
    <section id="contact" className="py-20 bg-[#0b291d] border-b border-emerald-900/80 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Bizim Filialımız Və <span className="text-emerald-300">Xəritədə Yerləşməsi</span>
          </h2>
          <p className="text-emerald-200/80 text-sm sm:text-base">
            Qonağımız olun və ya bircə zənglə/WhatsApp mesajı ilə bəyəndiyiniz yeməyi ünvana sifariş edin.
          </p>
        </div>

        {/* Branch Details & Interactive Buttons + Embedded Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Info Card & Action Buttons */}
          <div className="lg:col-span-5 bg-emerald-900/70 border border-emerald-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 border border-emerald-700 text-white text-[11px] font-bold uppercase tracking-wider">
                Seçilmiş Filial
              </span>
              <h3 className="text-2xl font-black text-white">
                {selectedBranch.name}
              </h3>
            </div>

            <div className="space-y-4 pt-2 border-t border-emerald-800/80 text-sm">
              
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-black/60 text-white shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Dəqiq Ünvan:
                  </span>
                  <p className="text-emerald-100 font-medium leading-relaxed">
                    {selectedBranch.address}
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-black/60 text-white shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    İş Saatları:
                  </span>
                  <p className="text-white font-semibold">
                    {selectedBranch.workingHours}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-black/60 text-white shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Birbaşa Əlaqə Nömrəsi:
                  </span>
                  <p className="text-white font-extrabold text-base">
                    {selectedBranch.phone}
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive Action Buttons */}
            <div className="pt-4 border-t border-emerald-800/80 space-y-3">
              <span className="block text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Tez Və Sürətli Əlaqə
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* 1. Zəng Et Button */}
                <a
                  href={`tel:${selectedBranch.phone.replace(/\s+/g, '')}`}
                  className="py-3 px-4 rounded-xl bg-black text-white font-extrabold text-xs hover:bg-zinc-900 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 fill-white text-white" />
                  <span>Zəng Et</span>
                </a>

                {/* 2. WhatsApp ilə Sifariş Button */}
                <a
                  href={`https://wa.me/${selectedBranch.whatsapp}?text=Salam!%20${encodeURIComponent(selectedBranch.name)}-dan%20sifaris%20vermek%20isteyirem`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-700 text-white font-extrabold text-xs hover:bg-emerald-600 transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span>WhatsApp İlə Sifariş</span>
                </a>

              </div>

              {/* 3. Xəritədə Bax Button */}
              <a
                href={selectedBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-950 border border-emerald-800 text-white font-bold text-xs hover:border-white transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4 text-white" />
                <span>Google Maps / Xəritədə Bax</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

            </div>

          </div>

          {/* Embedded Google Maps iFrame */}
          <div className="lg:col-span-7 bg-emerald-950 border border-emerald-800 rounded-3xl p-3 overflow-hidden shadow-2xl h-[460px] relative">
            <iframe
              title={`Xəritə - ${selectedBranch.name}`}
              src={selectedBranch.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.25rem' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="dark-map-iframe"
            />
            <div className="absolute top-6 right-6 bg-zinc-950/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-zinc-800 text-[11px] font-semibold text-amber-400 shadow-xl flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>{selectedBranch.name}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
