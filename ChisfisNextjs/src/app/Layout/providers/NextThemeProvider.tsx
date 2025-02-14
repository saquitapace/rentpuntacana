'use client'
import { ThemeProvider } from 'next-themes'
import React, { useEffect, useState } from 'react'

const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return <>{children}</> // Render children without ThemeProvider during SSR
	}

	return <ThemeProvider attribute="class">{children} </ThemeProvider>
}

export default NextThemeProvider
