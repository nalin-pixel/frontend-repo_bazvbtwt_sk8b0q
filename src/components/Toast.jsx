import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';

const ToastContext = createContext({ notify: (msg, type) => {} });

export function useToast() {
  return useContext(ToastContext);
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((t) => t.filter((toast) => toast.id !== id));
  }, []);

  const notify = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2);
    const toast = { id, message, type };
    setToasts((t) => [...t, toast]);
    setTimeout(() => remove(id), 3000);
  }, [remove]);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-3 rounded-lg shadow-lg px-4 py-3 backdrop-blur-sm transition-all border ${
              t.type === 'error'
                ? 'bg-red-500/90 border-red-400 text-white'
                : t.type === 'info'
                ? 'bg-amber-500/90 border-amber-400 text-white'
                : 'bg-emerald-600/90 border-emerald-400 text-white'
            }`}
          >
            <div className="text-sm font-medium">{t.message}</div>
            <button
              aria-label="Закрыть уведомление"
              onClick={() => remove(t.id)}
              className="ml-2 opacity-80 hover:opacity-100"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
