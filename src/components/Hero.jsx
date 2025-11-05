import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Calendar, ShoppingCart } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1494314671902-399b18174975?q=80&w=2000&auto=format&fit=crop"
          alt="Тёплая атмосфера кофейни"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-900/60 via-amber-900/60 to-amber-900/80" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-amber-50">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow"
        >
          Добро пожаловать в нашу кофейню в Аруше
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg sm:text-xl text-amber-100/90"
        >
          Ароматный кофе, домашняя выпечка и уют, который хочется разделить. Мы создаём тёплые моменты каждый день.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#menu"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 text-amber-950 px-6 py-3 font-semibold shadow-lg hover:bg-amber-400 transition"
          >
            <Coffee size={20} /> Посмотреть меню
          </a>
          <a
            href="#reservation"
            className="inline-flex items-center gap-2 rounded-full bg-amber-900/40 border border-amber-300/30 text-amber-50 px-6 py-3 font-semibold backdrop-blur-sm hover:bg-amber-800/50 transition"
          >
            <Calendar size={20} /> Забронировать стол
          </a>
          <a
            href="#cart"
            className="inline-flex items-center gap-2 rounded-full bg-amber-900/40 border border-amber-300/30 text-amber-50 px-6 py-3 font-semibold backdrop-blur-sm hover:bg-amber-800/50 transition"
          >
            <ShoppingCart size={20} /> Корзина
          </a>
        </motion.div>
      </div>
    </section>
  );
}
