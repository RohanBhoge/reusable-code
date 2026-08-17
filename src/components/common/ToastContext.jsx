"use client";

import React, { createContext, useCallback, useState } from 'react';
import ToastContainer from './ToastContainer';

export const ToastContext = createContext(null);

/**
 * Toast Provider Component
 * Wraps the app to manage active toast state and render the ToastContainer
 */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  /**
   * Remove a specific toast by ID
   */
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  /**
   * Clear all active toasts
   */
  const clearAll = useCallback(() => {
    setToasts([]);
  }, []);

  /**
   * Base add toast function
   */
  const addToast = useCallback((options) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    
    let newToast = {
      id,
      type: 'info',
      duration: 4000,
    };

    if (typeof options === 'string') {
      newToast.message = options;
    } else if (typeof options === 'object' && options !== null) {
      newToast = {
        ...newToast,
        ...options,
      };
    }

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, []);

  /**
   * Helper format helper to parse polymorphic args:
   * e.g. success("Message") or success("Message", "Title") or success("Message", { duration: 5000, title: "Title" })
   */
  const createToastHandler = useCallback(
    (type) => (messageOrOptions, optionsOrTitle) => {
      if (typeof messageOrOptions === 'object' && messageOrOptions !== null) {
        return addToast({ ...messageOrOptions, type });
      }

      let toastOptions = {
        type,
        message: messageOrOptions,
      };

      if (typeof optionsOrTitle === 'string') {
        toastOptions.title = optionsOrTitle;
      } else if (typeof optionsOrTitle === 'object' && optionsOrTitle !== null) {
        toastOptions = {
          ...toastOptions,
          ...optionsOrTitle,
        };
      }

      return addToast(toastOptions);
    },
    [addToast]
  );

  const success = useCallback(createToastHandler('success'), [createToastHandler]);
  const error = useCallback(createToastHandler('error'), [createToastHandler]);
  const warning = useCallback(createToastHandler('warning'), [createToastHandler]);
  const info = useCallback(createToastHandler('info'), [createToastHandler]);

  const value = {
    toast: addToast,
    addToast,
    success,
    error,
    warning,
    info,
    removeToast,
    clearAll,
    toasts,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

export default ToastProvider;
