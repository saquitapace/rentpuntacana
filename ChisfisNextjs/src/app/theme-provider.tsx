'use client'

import { APIProvider } from '@vis.gl/react-google-maps'

interface ThemeProviderWrapperProps {
	children: React.ReactNode;
}

export default function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}>
			{children}
		</APIProvider>
	)
}
