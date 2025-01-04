// types/store.ts
export interface PreloadedState {
	auth?: {
		isAuthenticated: boolean
		user: any | null
		isLoading: boolean
		error: string | null
	}
	userProfile?: {
		userId: string
		accountType: string
		avatar: string
		companyName: string
		fullName: string
		displayName: string
		firstName: string
		lastName: string
		email: string
		location: string
		phoneNumber: string
		about: string
		languages: string[]
		socials: string[]
		createdAt: string
		isLoading: boolean
		error: string | null
	}
	signUp?: {
		isLoading: boolean
		success: boolean
		error: string | null
	}
	forgotPassword?: {
		isLoading: boolean
		success: boolean
		error: string | null
	}
	translations?: {
		translations: Record<string, string>
		isLoading: boolean
		error: string | null
	}
}
