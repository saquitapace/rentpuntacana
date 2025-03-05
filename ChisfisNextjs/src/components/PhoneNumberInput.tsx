import React, { FC, useState } from 'react'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'

{
	/* //https://catamphetamine.github.io/react-phone-number-input/ */
}

interface Props {
	className?: '' | string
	phoneNumber?: '' | string
}

const PhoneNumberInput: FC<Props> = ({ className = '', phoneNumber = '' }) => {
	const [val, setVal] = useState(phoneNumber)

	return (
		<div className={className}>
			<PhoneInput
				international
				className="mt-1.5 block h-11 w-full rounded-2xl border-neutral-200 bg-white px-4 py-3 text-sm font-normal focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:bg-neutral-900 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25"
				value={phoneNumber}
				placeholder="Phone number"
				onChange={setVal}
				name="phoneNumber"
				error={
					phoneNumber
						? isValidPhoneNumber(phoneNumber)
							? undefined
							: 'Invalid phone number'
						: 'Phone number required'
				}
			/>
		</div>
	)
}

export default PhoneNumberInput
