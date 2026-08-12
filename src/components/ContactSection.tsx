import React, { useState } from 'react';
import { MapPin, Phone, Clock, ExternalLink, MessageCircle, Navigation, Flame, Check } from 'lucide-react';
import { BRANCHES } from '../data/initialData';

export const ContactSection: React.FC = () => {
  const [selectedBranch, setSelectedBranch] = useState(BRANCHES[0]);

  return (
    <section id="contact" className="py-20 bg-white border-b border-zinc-200 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 tracking-tight">
            Bizim Filialımız Və <span className="text-emerald-700">Xəritədə Yerləşməsi</span>
          </h2>
          <p className="text-emerald-800 text-sm sm:text-base font-semibold">
            Qonağımız olun və ya bircə zənglə/WhatsApp mesajı ilə bəyəndiyiniz yeməyi ünvana sifariş edin.
          </p>
        </div>

        {/* Branch Details & Interactive Buttons + Embedded Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch max-w-6xl mx-auto">
          
          {/* Branch Info Card & Action Buttons */}
          <div className="lg:col-span-5 bg-white border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm flex flex-col justify-between">
            
            <div className="space-y-1">
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] font-extrabold uppercase tracking-wider inline-block">
                Seçilmiş Filial
              </span>
              <h3 className="text-xl font-black text-emerald-950">
                {selectedBranch.name}
              </h3>
            </div>

            <div className="space-y-3 pt-2 border-t border-emerald-200 text-xs">
              
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-emerald-800" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                    Dəqiq Ünvan:
                  </span>
                  <p className="text-zinc-800 font-medium leading-snug">
                    {selectedBranch.address}
                  </p>
                </div>
              </div>

              {/* Working Hours & Phone in a row for compact balance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Working Hours */}
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 shrink-0">
                    <Clock className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      İş Saatları:
                    </span>
                    <p className="text-zinc-900 font-semibold text-xs">
                      {selectedBranch.workingHours}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-emerald-100 text-emerald-900 shrink-0">
                    <Phone className="w-4 h-4 text-emerald-800" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                      Əlaqə:
                    </span>
                    <p className="text-emerald-950 font-extrabold text-xs">
                      {selectedBranch.phone}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Action Buttons */}
            <div className="pt-3 border-t border-emerald-200 space-y-2">
              <span className="block text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                Tez Və Sürətli Əlaqə
              </span>

              <div className="grid grid-cols-2 gap-2">
                
                {/* 1. Zəng Et Button */}
                <a
                  href={`tel:${selectedBranch.phone.replace(/\s+/g, '')}`}
                  className="py-2.5 px-3 rounded-xl bg-emerald-700 text-white font-extrabold text-xs hover:bg-emerald-800 transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 fill-white text-white" />
                  <span>Zəng Et</span>
                </a>

                {/* 2. WhatsApp ilə Sifariş Button */}
                <a
                  href={`https://wa.me/${selectedBranch.whatsapp}?text=Salam!%20${encodeURIComponent(selectedBranch.name)}-dan%20sifaris%20vermek%20isteyirem`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-700 text-white font-extrabold text-xs hover:bg-emerald-600 transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp</span>
                </a>

              </div>

              {/* 3. Xəritədə Bax Button */}
              <a
                href={selectedBranch.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-950 border border-emerald-800 text-white font-bold text-xs hover:border-white transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5 text-white" />
                <span>Google Maps / Xəritədə Bax</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>

            </div>

          </div>

          {/* Embedded Google Maps iFrame */}
          <div className="lg:col-span-7 bg-emerald-950 border border-emerald-800 rounded-3xl p-2.5 overflow-hidden shadow-xl min-h-[360px] lg:min-h-full relative">
            <iframe
              title={`Xəritə - ${selectedBranch.name}`}
              src={selectedBranch.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '1.25rem', minHeight: '340px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="dark-map-iframe"
            />
            <div className="absolute top-5 right-5 bg-zinc-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-zinc-800 text-[10px] font-semibold text-amber-400 shadow-xl flex items-center gap-1.5">
              <MapPin className="w-3 h-3" />
              <span>{selectedBranch.name}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
