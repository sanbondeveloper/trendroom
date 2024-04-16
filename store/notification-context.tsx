'use client';

import { createContext, useEffect, useMemo, useState } from 'react';

interface NotificationData {
  title: string;
  message: string;
  status: 'pending' | 'success' | 'error';
}

export const NotificationValueContext = createContext<NotificationData | null>(null);
export const NotificationActionsContext = createContext<{
  showNotification(notificationData: NotificationData): void;
  hideNotification(): void;
} | null>(null);

export function NotificationContextProvider(props: { children: React.ReactNode }) {
  const [activeNotification, setActiveNotification] = useState<NotificationData | null>(null);
  const actions = useMemo(
    () => ({
      showNotification(notificationData: NotificationData) {
        setActiveNotification(notificationData);
      },
      hideNotification() {
        setActiveNotification(null);
      },
    }),
    [],
  );

  useEffect(() => {
    if (activeNotification && (activeNotification.status === 'success' || activeNotification.status === 'error')) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  return (
    <NotificationActionsContext.Provider value={actions}>
      <NotificationValueContext.Provider value={activeNotification}>{props.children}</NotificationValueContext.Provider>
    </NotificationActionsContext.Provider>
  );
}
