'use client'

import React, { FC, useState } from 'react';
import ButtonCircle from '@/shared/ButtonCircle';
import rightImg from '@/images/SVG-subcribe2.png';
import Badge from '@/shared/Badge';
import Input from '@/shared/Input';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import axios from '@/config/axios';
import { useNotifications } from 'reapop';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';

export interface SectionSubscribe2Props {
	className?: string
}
export interface NEWSLETTER_ADD {
	email?: string
}
const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = '' }) => {
	//const [isLoading, setIsLoading] = useState(false) todo: conflict with translations & not being used
	//const [error, setError] = useState('') todo: conflict with translations & not being used
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<NEWSLETTER_ADD>({
		defaultValues: {
			email: '',
		},
	});

	const { translations, isLoading, error } = useSelector(
		(state: RootState) => state.translations
	  );

	const { notify } = useNotifications();

	const formSubmit = (data: NEWSLETTER_ADD) => {
		axios
			.post('auth/newsletter/create', data)
			.then((response: any) => {
				if (response.status == 201) {
					notify(response?.data?.message, 'success', {
						dismissAfter : 3000
					});

					reset()
				} else {
					notify(response?.data?.message, 'error', {
						dismissAfter : 3000
					});
				}
			})
			.catch((error: any) => {
				console.log('An error occurred - subscribing to newsletter')
			})
	}

	return (
		<div
			className={`nc-SectionSubscribe2 relative flex flex-col lg:flex-row lg:items-center ${className}`}
			data-nc-id="SectionSubscribe2"
		>
			<div className="mb-10 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
				<h2 className="text-4xl font-semibold">{translations.joinOurNewsletter} 🎉</h2>
				<span className="mt-5 block text-neutral-500 dark:text-neutral-400">	
					{translations.newsletterSubtitle}
				</span>
				<ul className="mt-10 space-y-4">
					<li className="flex items-center space-x-4">
						<Badge name="01" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300">
							{translations.newsletterBulletOne}
						</span>
					</li>
					<li className="flex items-center space-x-4">
						<Badge color="red" name="02" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300">
							{translations.newsletterBulletTwo}
						</span>
					</li>
				</ul>
				<form
					className="relative mt-10 max-w-sm"
					onSubmit={handleSubmit(formSubmit)}
				>
					<Input
						name="email"
						aria-required
						placeholder={translations.newsletterPlaceholder}
						type="email"
						rounded="rounded-full"
						sizeClass="h-12 px-5 py-3"
						{...register('email', { required: translations.email  + translations.space + translations.isRequired })}
					/>
					<ButtonCircle
						type="submit"
						className="absolute right-1.5 top-1/2 -translate-y-1/2 transform"
						size="w-10 h-10"
					>
						<i className="las la-arrow-right text-xl"></i>
					</ButtonCircle>
				</form>
				{errors.email && (
					<div className="text-sm text-red-600">{errors.email.message}</div>
				)}
			</div>
			<div className="flex-grow">
				<Image alt="" src={rightImg} />
			</div>
		</div>
	)
}

export default SectionSubscribe2
