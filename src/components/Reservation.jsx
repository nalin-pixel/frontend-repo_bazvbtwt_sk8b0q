import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users } from 'lucide-react';
import { useToast } from './Toast.jsx';

export default function Reservation() {
  const { notify } = useToast();
  const [form, setForm] = useState({
    date: '',
    time: '',
    guests: '2',
    notes: '',
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.date || !form.time) {
      notify('Выберите дату и время бронирования', 'error');
      return;
    }
    notify('Бронирование отправлено! Мы свяжемся с вами для подтверждения.', 'success');
    setForm({ date: '', time: '', guests: '2', notes: '' });
  };

  return (
    <section id="reservation" className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-amber-900">Бронирование стола</h2>
        <p className="text-amber-800/70 mt-1">Выберите удобные дату и время. Мы с радостью подготовим для вас уютный столик.</p>
      </div>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-amber-50 border border-amber-200 rounded-xl p-6 shadow-sm"
      >
        <label className="flex flex-col gap-2">
          <span className="text-amber-900 font-semibold flex items-center gap-2"><Calendar size={18} /> Дата</span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            className="px-4 py-3 rounded-lg bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-amber-900 font-semibold flex items-center gap-2"><Clock size={18} /> Время</span>
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
            className="px-4 py-3 rounded-lg bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-amber-900 font-semibold flex items-center gap-2"><Users size={18} /> Гостей</span>
          <select
            value={form.guests}
            onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
            className="px-4 py-3 rounded-lg bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <option key={i + 1} value={String(i + 1)}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 sm:col-span-2">
          <span className="text-amber-900 font-semibold">Особые пожелания</span>
          <textarea
            rows={4}
            placeholder="Например: тихий стол у окна, без сахара, аллергии и т.д."
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            className="px-4 py-3 rounded-lg bg-white border border-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </label>
        <div className="sm:col-span-2 flex gap-4">
          <button
            type="submit"
            className="rounded-full bg-amber-700 text-white px-6 py-3 font-semibold hover:bg-amber-600 shadow"
          >
            Забронировать
          </button>
          <a href="#contact" className="rounded-full border border-amber-300 text-amber-900 px-6 py-3 hover:bg-amber-200">
            Связаться с нами
          </a>
        </div>
      </motion.form>
    </section>
  );
}
