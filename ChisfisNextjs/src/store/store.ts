import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userProfileReducer from './slices/userProfileSlice'
import signUpReducer from './slices/signUpSlice'
import forgotPasswordReducer from './slices/forgotPasswordSlice'
import translationsReducer from './slices/translationsSlice'
import { PreloadedState } from './type'

let store: ReturnType<typeof makeStore> | undefined

const makeStore = (preloadedState?: PreloadedState) => {
	return configureStore({
		reducer: {
			auth: authReducer,
			userProfile: userProfileReducer,
			signUp: signUpReducer,
			forgotPassword: forgotPasswordReducer,
			translations: translationsReducer,
		},
		preloadedState,
		devTools: process.env.NODE_ENV !== 'production',
	})
}

export const initializeStore = (preloadedState?: PreloadedState) => {
	let _store = store ?? makeStore(preloadedState)

	if (preloadedState && store) {
		_store = makeStore({
			...store.getState(),
			...preloadedState,
		})
	}

	// For SSG and SSR always create a new store
	if (typeof window === 'undefined') return _store

	// Create the store once in the client
	if (!store) store = _store

	return _store
}
