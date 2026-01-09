"use client";

import { createContext, useContext, useState } from "react";

import Image from "next/image";

import styles from "./styles.module.scss";

type ToastContextType = {
  showError: (message: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [message, setMessage] = useState<string | null>(null);

  const showError = (msg: string) => {
    setMessage(msg);

    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  return (
    <ToastContext.Provider value={{ showError }}>
      {children}

      {message && (
        <div className={styles.toastError}>
          <Image
            src="/assets/warn.png"
            alt="Error"
            width={20}
            height={20}
            className={styles.toastIcon}
          />
          <span className={styles.toastMessage}>{message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};
