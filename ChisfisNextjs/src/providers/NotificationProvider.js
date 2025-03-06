'use client';
import {
  Notification,
  NotificationsProvider,
  Position,
  Theme,
  useNotifications,
} from 'reapop';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { setUpNotifications } from 'reapop';

// Dynamically import NotificationsSystem to avoid SSR issues
const DynamicNotificationsSystem = dynamic(
  () => import('reapop').then((mod) => mod.default),
  { ssr: false }
);

// Theme configuration
const THEME_CONFIG = {
  primary: {
    light: {
      background: '#ffffff',
      text: '#1f2937',
      border: '#e5e7eb',
      buttons: { text: '#ffffff', background: '#3b82f6' },
    },
    dark: {
      background: '#1f2937',
      text: '#f3f4f6',
      border: '#374151',
      buttons: { text: '#ffffff', background: '#3b82f6' },
    },
  },
  success: {
    light: {
      background: '#f0fdf4',
      text: '#166534',
      border: '#bbf7d0',
      buttons: { text: '#ffffff', background: '#22c55e' },
    },
    dark: {
      background: '#14532d',
      text: '#4ade80',
      border: '#166534',
      buttons: { text: '#ffffff', background: '#22c55e' },
    },
  },
  error: {
    light: {
      background: '#fef2f2',
      text: '#991b1b',
      border: '#fecaca',
      buttons: { text: '#ffffff', background: '#ef4444' },
    },
    dark: {
      background: '#7f1d1d',
      text: '#fca5a5',
      border: '#991b1b',
      buttons: { text: '#ffffff', background: '#ef4444' },
    },
  },
  warning: {
    light: {
      background: '#fffbeb',
      text: '#92400e',
      border: '#fef3c7',
      buttons: { text: '#ffffff', background: '#f59e0b' },
    },
    dark: {
      background: '#78350f',
      text: '#fbbf24',
      border: '#92400e',
      buttons: { text: '#ffffff', background: '#f59e0b' },
    },
  },
  info: {
    light: {
      background: '#eff6ff',
      text: '#1e40af',
      border: '#bfdbfe',
      buttons: { text: '#ffffff', background: '#3b82f6' },
    },
    dark: {
      background: '#1e3a8a',
      text: '#60a5fa',
      border: '#1e40af',
      buttons: { text: '#ffffff', background: '#3b82f6' },
    },
  },
};

const NotificationComponent = () => {
  const { notifications, dismissNotification } = useNotifications();

  useEffect(() => {
    setUpNotifications({
      defaultProps: {
        position: 'top-center',
        dismissible: true,
        closeButton: true,
        duration: 5000,
      },
    });
  }, []);

  const getStatusStyles = (status) => {
    const colorMode = 'light';
    return THEME_CONFIG[status]?.[colorMode] || THEME_CONFIG.primary[colorMode];
  };

  const getNotificationStyles = () => ({
    container: (position, singleContainer) => ({
      position: 'fixed',
      padding: '1rem',
      zIndex: 1000,
      ...(position.includes('top') ? { top: 0 } : { bottom: 0 }),
      ...(position.includes('left') ? { left: 0 } : {}),
      ...(position.includes('right') ? { right: 0 } : {}),
      ...(position.includes('center')
        ? {
            left: '50%',
            transform: 'translateX(-50%)',
          }
        : {}),
    }),

    notification: (notification) => {
      const statusStyles = getStatusStyles(notification.status);
      return {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        marginBottom: '0.5rem',
        backgroundColor: statusStyles.background,
        color: statusStyles.text,
        borderColor: statusStyles.border,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '0.5rem',
        padding: '1rem',
        minWidth: '320px',
        maxWidth: '500px',
      };
    },

    notificationDismissIcon: (notification) => ({
      width: '1.25rem',
      height: '1.25rem',
      cursor: 'pointer',
      opacity: 0.75,
      position: 'absolute',
      top: '0.75rem',
      right: '0.75rem',
    }),

    notificationIcon: (notification) => ({
      width: '1.5rem',
      height: '1.5rem',
      marginRight: '0.75rem',
      flexShrink: 0,
    }),

    notificationImageContainer: (notification) => ({
      width: '4rem',
      height: '4rem',
      marginRight: '1rem',
      flexShrink: 0,
    }),

    notificationImage: (notification) => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '0.25rem',
    }),

    notificationMeta: (notification) => ({
      flex: 1,
      marginRight: '2rem',
    }),

    notificationTitle: (notification) => ({
      fontWeight: 600,
      marginBottom: '0.25rem',
    }),

    notificationMessage: (notification) => ({
      fontSize: '0.875rem',
    }),

    notificationButtons: (notification) => ({
      display: 'flex',
      gap: '0.5rem',
      marginTop: '0.75rem',
    }),

    notificationButton: (notification, position, state) => {
      const statusStyles = getStatusStyles(notification.status);
      return {
        padding: '0.375rem 0.75rem',
        borderRadius: '0.375rem',
        border: 'none',
        cursor: state.isActive ? 'wait' : 'pointer',
        fontSize: '0.875rem',
        fontWeight: 500,
        backgroundColor: statusStyles.buttons.background,
        color: statusStyles.buttons.text,
      };
    },

    notificationButtonText: () => ({
      color: 'inherit',
    }),
  });

  return (
    <DynamicNotificationsSystem
      notifications={notifications}
      dismissNotification={dismissNotification}
      theme={getNotificationStyles()}
    />
  );
};

export default function NotificationProvider({ children }) {
  return (
    <NotificationsProvider>
      <NotificationComponent />
      {children}
    </NotificationsProvider>
  );
}
