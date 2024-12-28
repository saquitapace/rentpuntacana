import { Poppins } from 'next/font/google';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/globals.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';
import { Metadata } from 'next';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../utils/authOptions';

import { Providers } from '@/components/providers/Providers';

import NewHeader from './(client-components)/(Header)/NewHeader';
import ClientCommons from '@/app/Layout/ClientCommons';
import Footer from '@/app/Layout/Footer';
import FooterNav from '@/app/Layout/FooterNav';

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
	const session = await getServerSession(authOptions);
	
	return (
		<html lang="en" className={poppins.className}>
			<body className="bg-white text-base text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
				<Providers session={session}>
					<div>
						<NewHeader/>
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
