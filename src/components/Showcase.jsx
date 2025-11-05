import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Coffee } from 'lucide-react';

export default function Showcase() {
  return (
    <section className="bg-gradient-to-b from-amber-50 to-amber-100/60">
      {/* Галерея */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8 flex items-center gap-3">
          <Coffee className="text-amber-700" />
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900">Атмосфера</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1513438205128-16af16010d7b?q=80&w=800&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop',
          ].map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="relative aspect-[4/3] overflow-hidden rounded-lg shadow"
            >
              <img src={src} alt="Галерея кофейни" className="w-full h-full object-cover hover:scale-105 transition duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* О нас */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white/80 border border-amber-200 rounded-2xl p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-amber-900 mb-3">О нас</h3>
          <p className="text-amber-900/80 leading-relaxed">
            Мы — уютная кофейня в самом сердце Аруши. Наши зёрна обжариваются малыми партиями, а бариста готовят каждый напиток с любовью. 
            Мы верим в гостеприимство, локальные продукты и тёплые встречи. Здесь вы найдёте идеальное место для работы, встреч и вдохновения.
          </p>
          <p className="text-amber-900/80 leading-relaxed mt-3">
            Наши ценности — качество, искренний сервис и уважение к сообществу. Мы поддерживаем местных производителей и стремимся к устойчивому развитию.
          </p>
        </div>
      </div>

      {/* Контакты */}
      <div id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/80 border border-amber-200 rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">Контакты</h3>
            <ul className="space-y-3 text-amber-900/90">
              <li className="flex items-start gap-3"><MapPin className="text-amber-700" /> <span>Сокоино-роуд, Аруша, Танзания</span></li>
              <li className="flex items-start gap-3"><Phone className="text-amber-700" /> <a className="hover:underline" href="tel:+255700000000">+255 700 000 000</a></li>
              <li className="flex items-start gap-3"><Mail className="text-amber-700" /> <a className="hover:underline" href="mailto:hello@arushacoffee.co.tz">hello@arushacoffee.co.tz</a></li>
            </ul>
            <div className="mt-4 text-amber-900/90">
              <div className="font-semibold">Часы работы</div>
              <div>Пн–Пт: 08:00–21:00</div>
              <div>Сб–Вс: 09:00–22:00</div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-amber-200 shadow-sm">
            <iframe
              title="Карта"
              src="https://www.openstreetmap.org/export/embed.html?bbox=36.62%2C-3.39%2C36.73%2C-3.33&layer=mapnik&marker=-3.3667%2C36.6833"
              className="w-full h-80"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
