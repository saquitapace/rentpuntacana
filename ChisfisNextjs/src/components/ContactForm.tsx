import React, { FC, useEffect, useState } from 'react'
import Textarea from '@/shared/Textarea'
import Input from '@/shared/Input'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Link from 'next/link'
import PhoneNumberInput from '@/components/PhoneNumberInput'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Checkbox from '@/shared/Checkbox'
import { useForm } from 'react-hook-form'
import axios from '@/config/axios'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

export interface ContactFormProps {
	data?: any
	className?: string
}
export interface ContactFormInputs {
	fullname?: string
	subject: string
	email: string
	phoneNo?: string
	message?: string
}
const ContactForm: FC<ContactFormProps> = ({
	className = '',
	data = '{listing ID}',
}) => {
	const { translations, isLoading, error } = useSelector(
		(state: RootState) => state.translations,
	)
	const _Data = data

	const userProfile = useSelector((state: RootState) => state.userProfile)
	// const [contactName, setContactName] = useState('')
	// const [contactEmail, setContactEmail] = useState('')
	// const [contactPhone, setContactPhone] = useState('')
	const [listingRE, setListingRE] = useState('') //todo: enter in listing # once redux is fixed.
	const [termChecked, setTermCheck] = useState(false)
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: { errors },
	} = useForm<ContactFormInputs>({
		defaultValues: {
			fullname: '',
			subject: '',
			email: userProfile.email || '',
			phoneNo: userProfile.phoneNumber || '',
			message: translations.contactAgentPlaceholder || '',
		},
	})
	const formSubmit = (data: ContactFormInputs) => {
		axios
			.post('auth/contact/create', data)
			.then((response: any) => {
				console.log('first', response)
				if (response.status == 201) {
					alert('SuccessFull')

					reset()
				} else {
					alert(response?.data?.message)
				}
			})
			.catch((error: any) => {
				alert('Something Wrong')
			})
	}
	useEffect(() => {
		if (userProfile.userId != '') {
			// setContactName(`${userProfile.firstName} ${userProfile.lastName}`)
			// setContactEmail(userProfile.email || '')
			// setContactPhone(userProfile.phoneNumber || '')
		}
		setListingRE(`${translations.regardingListing || ''} ${_Data}`)
		setValue('subject', `${translations.regardingListing || ''} ${_Data}`)
	}, [userProfile, translations, _Data])

	return (
		<div className="flex w-full flex-col space-y-6 xl:space-y-7">
			<Input
				type="text"
				name="fullname"
				placeholder={translations.yourName}
				{...register('fullname', { required: 'Name is required' })}
			/>
			{errors.fullname && (
				<div className="text-sm text-red-600">{errors.fullname.message}</div>
			)}
			<Input
				type="text"
				name="subject"
				value={listingRE}
				placeholder={translations.regardingListing}
				readOnly
			/>
			<Input
				type="email"
				name="email"
				placeholder={translations.email}
				autoComplete="off"
				{...register('email', { required: 'Email is required' })}
			/>
			{errors.email && (
				<div className="text-sm text-red-600">{errors.email.message}</div>
			)}
			<div>
				<PhoneInput
					international
					className="mt-1.5 block h-11 w-full rounded-2xl border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25"
					placeholder="Phone number"
					{...register('phoneNo', {
						required: 'Phone Number is required',
					})}
				/>
				{/* <PhoneNumberInput
					className="mt-1.5"
					phoneNumber={watch('phoneNo')}
					{...register('phoneNo')}
				/> */}
			</div>
			{errors.phoneNo && (
				<div className="text-sm text-red-600">{errors.phoneNo.message}</div>
			)}
			<Textarea
				name="message"
				defaultValue={translations.contactAgentPlaceholder}
				{...register('message', { required: 'body is required' })}
			/>
			{errors.message && (
				<div className="text-sm text-red-600">{errors.message.message}</div>
			)}
			<Checkbox
				className="termsAndConditions"
				name="termsAndConditions"
				label={translations.contactTerms}
				defaultChecked={termChecked}
				onChange={() => setTermCheck(!termChecked)}
			/>
			<ButtonPrimary
				className="stretch flex flex-1"
				disabled={!termChecked}
				onClick={handleSubmit(formSubmit)}
			>
				{translations.sendMessage}
			</ButtonPrimary>
			<ButtonSecondary className="whatsapp p-0">
				<Link
					aria-label="Chat on WhatsApp"
					className="whatsapp flex justify-center"
					target="_blank"
					href={`https://wa.me/${watch('phoneNo')}?text=${translations.contactAgentPlaceholder}`}
				>
					<i className="lab la-whatsapp whatsapp text-3xl"></i>{' '}
					<div className="pt-1">
						{translations.space}
						{translations.messageOnWhatsApp}
					</div>
				</Link>
			</ButtonSecondary>
		</div>
	)
}

export default ContactForm
