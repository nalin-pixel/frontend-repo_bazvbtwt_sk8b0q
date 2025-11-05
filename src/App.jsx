import React from 'react';
import Hero from './components/Hero.jsx';
import MenuCart from './components/MenuCart.jsx';
import Reservation from './components/Reservation.jsx';
import Showcase from './components/Showcase.jsx';
import ToastProvider from './components/Toast.jsx';

export default function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-amber-100 text-amber-950">
        {/* Навигация */}
        <header className="sticky top-0 z-30 backdrop-blur-md bg-amber-50/70 border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="#home" className="font-extrabold tracking-tight text-amber-900 text-xl">Arusha Coffee House</a>
            <nav className="hidden sm:flex items-center gap-6 text-amber-900/80">
              <a href="#menu" className="hover:text-amber-900">Меню</a>
              <a href="#reservation" className="hover:text-amber-900">Бронь</a>
              <a href="#contact" className="hover:text-amber-900">Контакты</a>
            </nav>
            <a href="#cart" className="sm:hidden rounded-full bg-amber-700 text-white px-3 py-2 text-sm">Корзина</a>
          </div>
        </header>

        <main>
          <Hero />
          <MenuCart />
          <Reservation />
          <Showcase />
        </main>

        <footer className="border-t border-amber-200 bg-amber-50/70">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-sm text-amber-900/70 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>© {new Date().getFullYear()} Arusha Coffee House. Все права защищены.</div>
            <div>Сделано с любовью к кофе и людям.</div>
          </div>
        </footer>
      </div>
    </ToastProvider>
  );
}
