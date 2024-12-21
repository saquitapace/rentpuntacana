import React, { FC, useState} from "react";
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';

{/* //https://catamphetamine.github.io/react-phone-number-input/ */}

interface Props {
  className?: "" | string;
  phoneNumber?: "" | string;
}

const PhoneNumberInput: FC<Props> = ({ 
  className = "",
  phoneNumber = ""
}) => {

  const [val, setVal] = useState(phoneNumber);

  return (
    <div className={className}>

    <PhoneInput
      international
      className="block w-full border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl text-sm font-normal h-11 px-4 py-3 mt-1.5"
      value={phoneNumber}
      placeholder="Phone number"
      onChange={setVal}
      name="phoneNumber"
      error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : 'Invalid phone number') : 'Phone number required'}/>
    </div>
  );
};

export default PhoneNumberInput;