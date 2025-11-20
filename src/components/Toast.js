'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Toast Notification Component
 * Shows success/error messages with auto-dismiss
 */
let toastId = 0;

export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <i
        className={`fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}`}
      ></i>
      <span>{message}</span>
      <button onClick={onClose} className="toast-close" aria-label="Close">
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
  onClose: PropTypes.func.isRequired,
};

/**
 * Toast Container - Manages multiple toasts
 */
export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    // Listen for toast events
    const handleToast = (event) => {
      const { message, type } = event.detail;
      const id = toastId++;
      setToasts((prev) => [...prev, { id, message, type }]);
    };

    window.addEventListener('showToast', handleToast);
    return () => window.removeEventListener('showToast', handleToast);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}

/**
 * Helper function to show toast
 */
export function showToast(message, type = 'success') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('showToast', {
        detail: { message, type },
      })
    );
  }
}
