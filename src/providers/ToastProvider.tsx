'use client';

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastIcon,
  ToastProvider as ToastProviderUI,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';
import { createContext, useCallback, useContext, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function useNotifications() {
  const { addToast } = useToast();

  const notifySuccess = useCallback(
    (title: string, description?: string, duration?: number) => {
      addToast({ title, description, type: 'success', duration });
    },
    [addToast]
  );

  const notifyError = useCallback(
    (title: string, description?: string, duration?: number) => {
      addToast({ title, description, type: 'error', duration });
    },
    [addToast]
  );

  const notifyInfo = useCallback(
    (title: string, description?: string, duration?: number) => {
      addToast({ title, description, type: 'info', duration });
    },
    [addToast]
  );

  const notifyWarning = useCallback(
    (title: string, description?: string, duration?: number) => {
      addToast({ title, description, type: 'warning', duration });
    },
    [addToast]
  );

  return {
    notifySuccess,
    notifyError,
    notifyInfo,
    notifyWarning,
  };
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const newToast: ToastMessage = {
        ...toast,
        id,
        duration: toast.duration || 5000,
      };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    },
    [removeToast]
  );

  const getToastClassName = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-green-500/30 bg-gradient-to-r from-green-500/10 to-green-500/5';
      case 'error':
        return 'border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-500/5';
      case 'warning':
        return 'border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 to-yellow-500/5';
      case 'info':
        return 'border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-blue-500/5';
      default:
        return '';
    }
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      <ToastProviderUI>
        {children}
        {toasts.map((toast) => (
          <Toast key={toast.id} className={getToastClassName(toast.type)}>
            <ToastIcon type={toast.type} />
            <div className="grid gap-1">
              <ToastTitle>{toast.title}</ToastTitle>
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </div>
            <ToastClose onClick={() => removeToast(toast.id)} />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProviderUI>
    </ToastContext.Provider>
  );
}
