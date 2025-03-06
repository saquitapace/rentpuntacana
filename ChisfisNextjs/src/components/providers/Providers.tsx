"use client";

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import ThemeProviderWrapper from '@/app/theme-provider';
import NotificationProvider from '@/providers/NotificationProvider';

interface ProvidersProps {
  children: React.ReactNode;
  session: any;
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <Provider store={store}>
        <SessionProvider session={session}>
          <ThemeProvider attribute="class">
            <ThemeProviderWrapper>
              <NotificationProvider>
                {children}
              </NotificationProvider>
            </ThemeProviderWrapper>
          </ThemeProvider>
        </SessionProvider>
    </Provider>
  );
} 