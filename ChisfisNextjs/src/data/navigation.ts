import { MegamenuItem, NavItemType } from '@/shared/Navigation/NavigationItem'
import ncNanoId from '@/utils/ncNanoId'
import { Route } from '@/routers/types'
import __megamenu from './jsons/__megamenu.json'

const megaMenuDemo: MegamenuItem[] = [
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/1591373/pexels-photo-1591373.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Company',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Company,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'App Name',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.AppName,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/5059013/pexels-photo-5059013.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'City',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.City,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/5159141/pexels-photo-5159141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Contruction',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Contruction,
		})),
	},
	{
		id: ncNanoId(),
		image:
			'https://images.pexels.com/photos/7473041/pexels-photo-7473041.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		title: 'Country',
		items: __megamenu.map((i) => ({
			id: ncNanoId(),
			href: '/',
			name: i.Country,
		})),
	},
]

const demoChildMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Online booking',
	},
	{
		id: ncNanoId(),
		href: '/home-2',
		name: 'Real estate',
		isNew: true,
	},
	{
		id: ncNanoId(),
		href: '/home-3',
		name: 'Home 3',
		isNew: true,
	},
]

const otherPageChildMenus: NavItemType[] = [
	{ id: ncNanoId(), href: '/add-listing/1' as Route, name: '+ Add listing' },
]

const templatesChildrenMenus: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/add-listing/1' as Route,
		name: '+ Add listing',
		type: 'dropdown',
		children: [
			{
				id: ncNanoId(),
				href: '/add-listing/1' as Route,
				name: 'Add listing 1',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/2' as Route,
				name: 'Add listing 2',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/3' as Route,
				name: 'Add listing 3',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/4' as Route,
				name: 'Add listing 4',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/5' as Route,
				name: 'Add listing 5',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/6' as Route,
				name: 'Add listing 6',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/7' as Route,
				name: 'Add listing 7',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/8' as Route,
				name: 'Add listing 8',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/9' as Route,
				name: 'Add listing 9',
			},
			{
				id: ncNanoId(),
				href: '/add-listing/10' as Route,
				name: 'Add listing 10',
			},
		],
	},
]

export const NAVIGATION_DEMO: NavItemType[] = [
	{
		id: ncNanoId(),
		href: '/',
		name: 'Home',
		children: demoChildMenus,
		isNew: true,
	}
]

export const NAVIGATION_DEMO_2: NavItemType[] = [
	//
	{
		id: ncNanoId(),
		href: '/listing-stay',
		name: 'Listing pages user for how it works',
		children: [
			{ id: ncNanoId(), href: '/listing-stay', name: 'Stay listings' },
			{
				id: ncNanoId(),
				href: '/listing-stay-map',
				name: 'Stay listings (map)',
			},
			{ id: ncNanoId(), href: '/listing-stay-detail', name: 'Stay detail' },
		],
	},
	{
		id: ncNanoId(),
		href: '/listing-car',
		name: 'Listing pages',
		children: [
			//
			{
				id: ncNanoId(),
				href: '/listing-real-estate',
				name: 'Real estate listings',
			},
			{
				id: ncNanoId(),
				href: '/listing-real-estate-map',
				name: 'Real estate (map)',
			},
		],
	},

	//
	{
		id: ncNanoId(),
		href: '/author',
		name: 'Templates',
		type: 'dropdown',
		children: templatesChildrenMenus,
	},

	//
	{
		id: ncNanoId(),
		href: '/blog',
		name: 'Other pages',
		type: 'dropdown',
		children: otherPageChildMenus,
	},
]
