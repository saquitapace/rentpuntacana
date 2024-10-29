'use client'

import { APIProvider } from '@vis.gl/react-google-maps'
import { Provider } from 'react-redux';
import store from '@/store/store';

export default function ThemeProvider({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<Provider store={store}>
			<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
				{children}
			</APIProvider>
		</Provider>
	)
}
