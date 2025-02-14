import {NavItemType } from '@/shared/Navigation/NavigationItem';
import ncNanoId from '@/utils/ncNanoId';

const demoChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/home-2',
		name: 'Home 2',
		isNew: true,
	},
]

export const NAVIGATION_DEMO: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		children: demoChildMenus,
		type: 'dropdown',

		isNew: true,
	}
]