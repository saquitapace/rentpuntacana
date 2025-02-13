"use client";

import { Provider } from 'react-redux';
// import { store } from '@/store/store';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children, session }: { children: React.ReactNode, session: any }) {
  return (
    // <Provider store={store}>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    // </Provider>
  );
} 