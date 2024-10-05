'use client'

import './styles/index.css'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FC, Fragment, Suspense, useEffect, useRef } from 'react'
import Modal from './components/Modal'
import type { ListingGalleryImage } from './utils/types'
import { useLastViewedPhoto } from './utils/useLastViewedPhoto'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from '@headlessui/react'
import LikeSaveBtns from '../LikeSaveBtns'
import { Route } from 'next'

const PHOTOS: string[] = [
	'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
	'https://images.pexels.com/photos/7163619/pexels-photo-7163619.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/6527036/pexels-photo-6527036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/6438752/pexels-photo-6438752.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/261394/pexels-photo-261394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	'https://images.pexels.com/photos/2861361/pexels-photo-2861361.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
]

export const DEMO_IMAGE: ListingGalleryImage[] = [...PHOTOS].map(
	(item, index): ListingGalleryImage => {
		return {
			id: index,
			url: item,
		}
	},
)

export const getNewParam = ({
	paramName = 'photoId',
	value,
}: {
	paramName?: string
	value: string | number
}) => {
	let params = new URLSearchParams(document.location.search)
	params.set(paramName, String(value))
	return params.toString()
}

interface Props {
	images?: ListingGalleryImage[]
}

const ListingImageGallery: FC<Props> = ({ images = DEMO_IMAGE }) => {
	const searchParams = useSearchParams()
	const photoId = searchParams?.get('photoId')
	const modal = searchParams?.get('modal')
	const isShowModal = modal === 'PHOTO_TOUR_SCROLLABLE'
	const router = useRouter()
	const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto()

	const lastViewedPhotoRef = useRef<HTMLDivElement>(null)
	const thisPathname = usePathname()
	useEffect(() => {
		// This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
		if (lastViewedPhoto && !photoId) {
			lastViewedPhotoRef.current?.scrollIntoView({ block: 'center' })
			setLastViewedPhoto(null)
		}
	}, [photoId, lastViewedPhoto, setLastViewedPhoto])

	const handleClose = () => {
		let params = new URLSearchParams(document.location.search)
		params.delete('modal')
		router.push(`${thisPathname}/?${params.toString()}` as Route)
	}

	const renderContent = () => {
		return (
			<div className=" ">
				{photoId && (
					<Suspense>
						<Modal
							images={images}
							onClose={() => {
								// @ts-ignore
								setLastViewedPhoto(photoId)
								let params = new URLSearchParams(document.location.search)
								params.delete('photoId')
								router.push(`${thisPathname}/?${params.toString()}` as Route)
							}}
						/>
					</Suspense>
				)}

				<div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
					{images.map(({ id, url }) => (
						<div
							key={id}
							onClick={() => {
								const newPathname = getNewParam({ value: id })
								router.push(`${thisPathname}/?${newPathname}` as Route)
							}}
							ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
							className="after:content after:shadow-highlight group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg focus:outline-none"
						>
							<Image
								alt="chisfis listing gallery "
								className="transform rounded-lg brightness-90 transition will-change-auto focus:outline-none group-hover:brightness-110"
								style={{
									transform: 'translate3d(0, 0, 0)',
								}}
								src={url}
								width={720}
								height={480}
								sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 350px"
							/>
						</div>
					))}
				</div>
			</div>
		)
	}

	return (
		<>
			<Transition appear show={isShowModal} as={Fragment}>
				<Dialog as="div" className="relative z-40" onClose={handleClose}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-white" />
					</TransitionChild>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 xl:px-10">
							<button
								className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100 focus:outline-none focus:ring-0"
								onClick={handleClose}
							>
								<ArrowLeftIcon className="h-6 w-6" />
							</button>
							<LikeSaveBtns />
						</div>

						<div className="flex min-h-full items-center justify-center pt-0 text-center sm:p-4">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-5"
								enterTo="opacity-100 translate-y-0"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0"
								leaveTo="opacity-0 translate-y-5"
							>
								<DialogPanel className="mx-auto w-full max-w-screen-lg transform p-4 pt-0 text-left transition-all">
									{renderContent()}
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}

export default ListingImageGallery
