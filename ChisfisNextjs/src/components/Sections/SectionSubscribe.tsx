'use client'

import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as YUP from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import ErrorText from '../ui/ErrorText'
import ButtonCircle from '@/shared/ButtonCircle'
import rightImg from '@/images/SVG-subcribe2.png'
import Badge from '@/shared/Badge'
import Input from '@/shared/Input'
import Image from 'next/image'
import toast from 'react-hot-toast'
import axios from '@/config/axios'

export interface SectionSubscribeProps {
	className?: string
}
export interface NEWSLETTER_ADD {
	email?: string
}

const SectionSubscribe: FC<SectionSubscribeProps> = ({ className = '' }) => {
	const NewsLetterValidation: YUP.ObjectSchema<NEWSLETTER_ADD> =
		YUP.object().shape({
			email: YUP.string().email().required('Provide your email id'),
		})
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<NEWSLETTER_ADD>({
		resolver: yupResolver(NewsLetterValidation),
		mode: 'all',
	})
	const formSubmit = (data: NEWSLETTER_ADD) => {
		axios
			.post('auth/newslater', { email: String(data.email) })
			.then((response: any) => {
				console.log('first', response)
				if (response.data.success) {
					toast.success(response.data.message)
					reset()
				} else {
					toast.error(response.data.message)
				}
			})
			.catch((error: any) => {
				toast.error(error.response.data.message)
			})
	}

	const handleClick = (e) => {
		alert('update subscriptin in user pref, display success or failure')
	}
	return (
		<div
			className={`nc-SectionSubscribe relative flex flex-col lg:flex-row lg:items-center ${className}`}
			data-nc-id="SectionSubscribe"
		>
			<div className="mb-10 flex-shrink-0 lg:mb-0 lg:mr-10 lg:w-2/5">
				<h2 className="text-4xl font-semibold">Join our newsletter 🎉</h2>
				<span className="mt-5 block text-neutral-500 dark:text-neutral-400">
					Read and share new perspectives on just about any topic. Everyone’s
					welcome.
				</span>
				<ul className="mt-10 space-y-4">
					<li className="flex items-center space-x-4">
						<Badge name="01" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300">
							Get updates on new Listings
						</span>
					</li>
					<li className="flex items-center space-x-4">
						<Badge color="red" name="02" />
						<span className="font-medium text-neutral-700 dark:text-neutral-300">
							Get premium discounts
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
						placeholder="Email"
						type="text"
						id="email"
						autoComplete="off"
						rounded="rounded-full"
						sizeClass="h-12 px-5 py-3"
						{...register('email')}
					/>

					<ButtonCircle
						//type="submit"
						//onClick={handleClick}
						className="absolute right-1.5 top-1/2 -translate-y-1/2 transform"
						size="w-10 h-10"
					>
						<i className="las la-arrow-right text-xl"></i>
					</ButtonCircle>
				</form>
				{errors.email && (
					<ErrorText className="mt-2">{errors.email.message}</ErrorText>
				)}
			</div>
			<div className="flex-grow">
				<Image alt="" src={rightImg} />
			</div>
		</div>
	)
}

export default SectionSubscribe
