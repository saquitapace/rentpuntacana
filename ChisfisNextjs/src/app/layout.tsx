import { Poppins } from 'next/font/google'
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css'
import '@/styles/globals.css'
import '@/styles/index.scss'
//import 'rc-slider/assets/index.css';
import { Metadata } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../utils/authOptions'

import NewHeader from './(client-components)/(Header)/NewHeader'

import { Providers } from '@/app/Layout/Providers'
import ClientCommons from '@/app/Layout/ClientCommons'
import dynamic from 'next/dynamic'
import { headers } from 'next/headers'
import { PreloadedState } from '@/store/type'
import { getDefaultTranslations } from '@/utils/helpers'
import axios from 'axios'
// import Footer from '@/app/Layout/Footer'
// import FooterNav from '@/app/Layout/FooterNav'
import { Toaster } from 'react-hot-toast'

const Footer = dynamic(() => import('@/app/Layout/Footer'), { ssr: false })
const FooterNav = dynamic(() => import('@/app/Layout/FooterNav'), {
	ssr: false,
})

const poppins = Poppins({
	subsets: ['latin'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
	title: 'Chisfis - Booking online React Next Template',
	description: 'Booking online & rental online React Next Template',
	keywords: 'Chisfis, Booking online, React Next Template',
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getServerSession(authOptions)
	let defaultTranslations = getDefaultTranslations()

	const headersList = headers()
	const langPref =
		headersList.get('accept-language')?.split(',')[0].split('-')[0] || 'en'
	console.log('langPref', langPref)
	const response = await axios.get(
		`${process.env.NEXT_PUBLIC_API_URL}/auth/translations/${langPref}/get`,
	)

	if (response.data?.[0]) {
		const translationsArray = response.data[0]
		const translationsObject = translationsArray.reduce(
			(acc: Record<string, string>, item: { ky: string; string: string }) => {
				acc[item.ky] = item.string
				return acc
			},
			{},
		)

		defaultTranslations = translationsObject
	}
	const preloadedState: PreloadedState = {
		auth: {
			isAuthenticated: !!session,
			user: session?.user || null,
			isLoading: false,
			error: null,
		},
		userProfile: session?.user
			? {
					userId: session.user.id || '',
					email: session.user.email || '',
					firstName: session.user.firstName || '',
					lastName: session.user.lastName || '',
					accountType: session.user.accountType || '',
					avatar: session.user.avatar || '',
					companyName: session.user.companyName || '',
					fullName: session.user.fullName || '',
					displayName: session.user.displayName || '',
					location: session.user.location || '',
					phoneNumber: session.user.phoneNumber || '',
					isLoading: false,
					error: null,
					about: session.user.about || '',
					languages: session.user.languages || [],
					socials: session.user.socials || [],
					createdAt: session.user.createdAt || '',
				}
			: undefined,
		translations: {
			translations: defaultTranslations,
			isLoading: false,
			error: null,
		},
	}
	return (
		<html lang={langPref} className={poppins.className}>
			<body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
				<Toaster />
				<Providers session={session} preloadedState={preloadedState}>
					<div>
						<NewHeader />
						{children}
						<FooterNav />
						<Footer />
					</div>
					<ClientCommons />
				</Providers>
			</body>
		</html>
	)
}
