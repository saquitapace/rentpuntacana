'use client'

import { Provider } from 'react-redux'
import { initializeStore } from '@/store/store'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import ThemeProviderWrapper from '@/app/Layout/theme-provider'
import { PreloadedState } from '@/store/type'
import NextThemeProvider from './providers/NextThemeProvider'

interface ProvidersProps {
	children: React.ReactNode
	session: any
	preloadedState?: PreloadedState
}

export function Providers({
	children,
	session,
	preloadedState,
}: ProvidersProps) {
	const store = initializeStore(preloadedState)

	return (
		<Provider store={store}>
			<SessionProvider session={session}>
				<NextThemeProvider>
					<ThemeProviderWrapper>{children}</ThemeProviderWrapper>
				</NextThemeProvider>
			</SessionProvider>
		</Provider>
	)
}
