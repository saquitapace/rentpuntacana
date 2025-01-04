export const formatDateJoined = (dateString: string | null): string => {
	if (!dateString) return ''

	const date = new Date(dateString)
	if (isNaN(date.getTime())) return ''

	const year = date.getFullYear()
	const month = date.toLocaleString('us-US', { month: 'long' })

	return `${month} ${year}`
}

export const redirect = (accountType: 'renter' | 'property' | 'default') => {
	switch (accountType) {
		case 'renter':
			return '/listing-search'
		case 'property':
			return '/author'
		default:
			return '/'
	}
}

export const isTokenValid = (exp?: number): boolean => {
	if (!exp) return false
	const currentTime = Math.floor(Date.now() / 1000)
	return exp > currentTime
}

export const generateUserId = () => {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	)
}

export const getLangPref = () => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('langPref') || 'en'
	}
}

export const getCurrPref = () => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('currPref') || 'USD'
	}
}

export const getCurrencies = () => {
	try {
		if (typeof window !== 'undefined') {
			return JSON.parse(localStorage.getItem('currencies') || 'null')
		}
	} catch {
		console.error('Invalid JSON in localStorage')
		return null
	}
}

export const getDefaultTranslations = () => {
	try {
		if (typeof window !== 'undefined') {
			return (
				JSON.parse(localStorage.getItem('translations3') || 'null') ?? {
					save: 'Ahorrar',
					continue: 'Continuar',
					share: 'Compartir',
					loading: 'Cargando',
					month: 'Mes',
					print: 'Imprimir',
					listing: 'Listado',
					listings: 'Listados',
					bedroom: 'Dormitorio',
					bedrooms: 'Dormitorios',
					bathroom: 'Baño',
					bathrooms: 'Baños',
					wifi: 'Wifi',
					smoking: 'De fumar',
					noSmoking: 'No Fumar',
					showAllPhotos: 'Mostrar todas las fotos',
					space: ' ',
					amenities: 'Comodidades',
					reviews: 'Reseñas',
					listingAgent: 'Agente de listado',
					seeAgentProfile: '\nVer perfil del agente',
					location: 'Ubicación',
					checkoutThisListing: '¡Mira este listado!',
					listingDescription: 'Descripción del listado',
					showOriginal: 'Mostrar original',
					someInfoAutomaticallyTranslated:
						'Parte de la información ha sido traducida automáticamente.',
					notifications: 'Notificaciones',
					cancel: 'Cancelar',
					noReviews: 'sin Reseñas',
					joinedIn: 'Se unió',
					responseRate: 'Tasa de respuesta',
					fastResponse: 'Respuesta rápida: en unas pocas horas',
					profile: 'Perfil',
					settings: 'Ajustes',
					messages: 'Mensajes',
					favorites: 'Favoritas',
					darkTheme: 'Tema Oscuro',
					logout: 'Finalizar la sesión',
					home: null,
					beds: 'camas',
					baths: 'baños',
					propertyType: 'Tipo de propiedad',
					priceRange: 'Gama de precios',
					bedbath: 'Cama / Baño',
					moreFilters: 'Más filtros',
					availabilityDate: 'Fecha de disponibilidad',
					select: 'Seleccionar',
					viewAll: 'Ver todo',
					messageOnWhatsApp: 'Mensaje en Whatsapp',
					sendMessage: 'Enviar Mensaje',
					email: 'Correo electrónico',
					regardingListing: 'Respecto al listado #',
					yourName: 'Su nombre',
					contactAgentPlaceholder:
						'Hola, estoy muy interesado en este listado. Y me gustaría recibir más información al respecto. ¡Gracias!',
					noPriceSet: 'sin precio',
					minPrice: 'Precio mínimo',
					maxPrice: 'Precio máximo',
					general: 'General',
					other: 'Otro',
					rules: 'Normas',
					safe: 'Seguro',
					notSet: 'ninguno',
					bed: 'cama',
					bath: 'baño',
					addDates: 'Agregar fechas',
					contactTerms:
						'Al elegir comunicarse con un Agente de listado, usted acepta recibir llamadas o mensajes de texto al número que proporcionó, de RentaPuntaCana Group y de los administradores de alquiler y/o corredores. También acepta los Términos de uso y la Política de privacidad de RentaPuntaCana.',
					homeH2: 'Encuentra tu próximo lugar al que llamar hogar',
					startYourSearch: 'Comience su búsqueda',
					addListing: 'Agregar Listado',
					signIn: 'Iniciar Sesión',
					signUp: 'Inscribirse',
					previewPublicProfile: 'Vista previa del perfil público',
					speaks: 'Habla',
					profileIncomplete: 'perfil incompleto',
					drafts: 'Damas',
					published: 'Publicado',
					forgotPassword: '¿Has olvidado tu contraseña?',
					or: 'O',
					password: 'Contraseña',
					newUser: '¿Nuevo Usuario?',
					createAnAccount: 'Crear una cuenta',
					signingIn: 'Iniciando sesión...',
					anErrorOccurredDuringSignIn: 'Se produjo un error al Iniciar Sesión',
				}
			)
		}
	} catch {
		console.error('Invalid JSON in localStorage')
		return null
	}
}

export const getChatLayout = () => {
	try {
		if (typeof window !== 'undefined') {
			return JSON.parse(
				localStorage.getItem('react-resizable-panels:layout') || 'null',
			)
		}
	} catch {
		console.error('Invalid JSON in localStorage')
		return null
	}
}
