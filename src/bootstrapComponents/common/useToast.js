"use client";

import { useContext } from 'react';
import { ToastContext } from './ToastContext';

/**
 * Custom React hook to access toast functions (success, error, warning, info, toast, removeToast, clearAll)
 */
export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};

export default useToast;
