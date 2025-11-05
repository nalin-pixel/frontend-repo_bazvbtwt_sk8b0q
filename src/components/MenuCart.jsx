import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { useToast } from './Toast.jsx';

const MENU = [
  // Кофе
  { id: 'c1', name: 'Эспрессо', category: 'Кофе', price: 3500, img: 'https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=800&auto=format&fit=crop' },
  { id: 'c2', name: 'Капучино', category: 'Кофе', price: 6000, img: 'https://images.unsplash.com/photo-1503481766315-7a586b20f66d?q=80&w=800&auto=format&fit=crop' },
  { id: 'c3', name: 'Латте', category: 'Кофе', price: 6500, img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop' },
  { id: 'c4', name: 'Американо', category: 'Кофе', price: 4500, img: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop' },
  // Чай
  { id: 't1', name: 'Чёрный чай', category: 'Чай', price: 4000, img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop' },
  { id: 't2', name: 'Зелёный чай', category: 'Чай', price: 4500, img: 'https://images.unsplash.com/photo-1470167290877-7d5d3446de4c?q=80&w=800&auto=format&fit=crop' },
  { id: 't3', name: 'Масала-чай', category: 'Чай', price: 5500, img: 'https://images.unsplash.com/photo-1581481906067-ff1899f8c8bd?q=80&w=800&auto=format&fit=crop' },
  // Десерты
  { id: 'd1', name: 'Чизкейк', category: 'Десерты', price: 9000, img: 'https://images.unsplash.com/photo-1551024709-8f23befc6cf7?q=80&w=800&auto=format&fit=crop' },
  { id: 'd2', name: 'Тирамису', category: 'Десерты', price: 10000, img: 'https://images.unsplash.com/photo-1603899121269-18e5f72b0b24?q=80&w=800&auto=format&fit=crop' },
  { id: 'd3', name: 'Маффин шоколадный', category: 'Десерты', price: 5500, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476e?q=80&w=800&auto=format&fit=crop' },
  // Закуски
  { id: 's1', name: 'Круассан', category: 'Закуски', price: 5000, img: 'https://images.unsplash.com/photo-1541599188778-cdc73298e8f8?q=80&w=800&auto=format&fit=crop' },
  { id: 's2', name: 'Сэндвич с курицей', category: 'Закуски', price: 9500, img: 'https://images.unsplash.com/photo-1604908554007-0276e14888db?q=80&w=800&auto=format&fit=crop' },
  { id: 's3', name: 'Гранола с йогуртом', category: 'Закуски', price: 7000, img: 'https://images.unsplash.com/photo-1552767059-8f73a6d4aa9b?q=80&w=800&auto=format&fit=crop' },
];

const CATEGORIES = ['Все', 'Кофе', 'Чай', 'Десерты', 'Закуски'];

export default function MenuCart() {
  const { notify } = useToast();
  const [active, setActive] = useState('Все');
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('coffeehouse_cart');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('coffeehouse_cart', JSON.stringify(cart));
  }, [cart]);

  const items = useMemo(() => {
    let list = MENU;
    if (active !== 'Все') list = list.filter((i) => i.category === active);
    if (query.trim())
      list = list.filter((i) => i.name.toLowerCase().includes(query.toLowerCase()));
    return list;
  }, [active, query]);

  const total = useMemo(() => {
    return Object.entries(cart).reduce((sum, [id, qty]) => {
      const item = MENU.find((m) => m.id === id);
      return sum + (item ? item.price * qty : 0);
    }, 0);
  }, [cart]);

  const add = (id) => {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
    const item = MENU.find((m) => m.id === id);
    notify(`Добавлено в корзину: ${item?.name}`, 'info');
  };
  const inc = (id) => setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  const dec = (id) =>
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      next[id] = next[id] - 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  const clear = () => setCart({});

  return (
    <section id="menu" className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900">Меню</h2>
          <p className="text-amber-800/70 mt-1">Выберите свою категорию и найдите любимый вкус</p>
        </div>
        <button
          id="cart"
          onClick={() => setCartOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-amber-600 text-white px-4 py-2 shadow hover:bg-amber-500"
        >
          <ShoppingCart size={18} /> Корзина ({Object.values(cart).reduce((a, b) => a + b, 0)})
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-4 py-2 rounded-full border transition ${
              active === c
                ? 'bg-amber-700 text-white border-amber-700'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
          >
            {c}
          </button>
        ))}
        <div className="ml-auto relative">
          <input
            type="text"
            placeholder="Поиск по меню..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded-full bg-amber-50 border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="group rounded-xl overflow-hidden bg-amber-50 border border-amber-200 shadow-sm hover:shadow-md transition"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                <div className="absolute top-2 right-2 bg-white/90 text-amber-900 text-xs font-semibold px-2 py-1 rounded-full shadow">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900">{item.name}</h3>
                    <p className="text-amber-800/70 text-sm mt-1">
                      {new Intl.NumberFormat('ru-RU').format(item.price)} TZS
                    </p>
                  </div>
                  <button
                    onClick={() => add(item.id)}
                    className="shrink-0 inline-flex items-center gap-2 rounded-full bg-amber-600 text-white px-3 py-2 hover:bg-amber-500"
                  >
                    <Plus size={16} /> В корзину
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
          >
            <div className="absolute inset-0 bg-amber-950/40" onClick={() => setCartOpen(false)} />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="absolute right-0 top-0 h-full w-full max-w-md bg-amber-50 shadow-xl border-l border-amber-200"
            >
              <div className="flex items-center justify-between p-4 border-b border-amber-200 bg-amber-100/60">
                <h3 className="text-xl font-bold text-amber-900">Ваша корзина</h3>
                <button onClick={() => setCartOpen(false)} className="p-2 rounded-full hover:bg-amber-200">
                  <X />
                </button>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-200px)]">
                {Object.keys(cart).length === 0 && (
                  <p className="text-amber-800/70">Здесь пока пусто. Добавьте что-нибудь из меню.</p>
                )}
                {Object.entries(cart).map(([id, qty]) => {
                  const item = MENU.find((m) => m.id === id);
                  if (!item) return null;
                  return (
                    <div key={id} className="flex items-center gap-3 border border-amber-200 rounded-lg p-3 bg-white">
                      <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <div className="font-semibold text-amber-900">{item.name}</div>
                        <div className="text-sm text-amber-800/70">
                          {new Intl.NumberFormat('ru-RU').format(item.price)} TZS
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => dec(id)} className="p-2 rounded-full bg-amber-100 hover:bg-amber-200">
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-semibold text-amber-900">{qty}</span>
                        <button onClick={() => inc(id)} className="p-2 rounded-full bg-amber-100 hover:bg-amber-200">
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-4 border-t border-amber-200 bg-amber-100/60">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-amber-900 font-semibold">Итого</span>
                  <span className="text-amber-900 font-bold text-lg">{new Intl.NumberFormat('ru-RU').format(total)} TZS</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={clear}
                    className="flex-1 rounded-full border border-amber-300 text-amber-900 px-4 py-2 hover:bg-amber-200"
                  >
                    Очистить
                  </button>
                  <button
                    onClick={() => notify('Спасибо! Мы приняли ваш заказ на стойке. Оплата при получении.', 'success')}
                    className="flex-1 rounded-full bg-amber-700 text-white px-4 py-2 hover:bg-amber-600"
                  >
                    Оформить
                  </button>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
