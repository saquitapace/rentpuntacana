'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useThemeMode } from '@/utils/useThemeMode';
import useInitTranslation from "@/hooks/useInitTranslation";

const ClientCommons = () => {
	//
	useThemeMode()
	//

	const {
		data,
		loading,
		error,
	  } = useInitTranslation();
	  
	//   console.log(data);
	//   console.log(loading);
	//   console.log(error);

	  
	const pathname = usePathname()
	//  CUSTOM THEME STYLE
	useEffect(() => {
		const $body = document.querySelector('body')
		if (!$body) return

		let newBodyClass = ''

		if (pathname === '/home-3') {
			newBodyClass = 'theme-purple-blueGrey'
		}
		if (pathname === '/home-2') {
			newBodyClass = 'theme-cyan-blueGrey'
		}

		newBodyClass && $body.classList.add(newBodyClass)
		return () => {
			newBodyClass && $body.classList.remove(newBodyClass)
		}
	}, [pathname])

	return <></>
}

export default ClientCommons
