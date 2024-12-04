import React, { FC,useState } from "react";
import Textarea from '@/shared/Textarea';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Link from 'next/link';
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { 
  getUserFullName,
  getUserEmail
} from '@/store/slices/userProfileSlice';
import translations2 from '@/utils/translation2';

export interface ContactFormProps {
  className?: string;
}

const ContactForm: FC<ContactFormProps> = ({
  className = "",
}) => {
  const x = translations2.get();
	const[t,setT] = useState(x);
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const [contactName , setContactName]= useState(useSelector(getUserFullName));
  const [contactEmail , setContactEmail]= useState(useSelector(getUserEmail));
  const [contactPhone , setContactPhone]= useState(userProfile.phoneNumber);
  const [listingRE, setListingRE] = useState(t.regardingListing); //todo: enter in listing # once redux is fixed.

  return (
    <div className="w-full flex flex-col space-y-6 xl:space-y-7">
				<Input value={contactName} placeholder={t.yourName} onChange={(e) => setContactName(e.target.value)}
 />			<Input type="text" value={listingRE} placeholder={t.regardingListing} onChange={(e) => setListingRE(e.target.value)} />

				<Input type="email" value={contactEmail} placeholder={t.email} onChange={(e) => setContactEmail(e.target.value)} />
        <div>
            <PhoneNumberInput
              className="mt-1.5"
              phoneNumber={contactPhone}
            />
          </div>
				<Textarea
          defaultValue={t.contactAgentPlaceholder}
        />
					
			{/*}	<Checkbox
					className="text-sm"
					name="By choosing to contact a property, you consent to receive calls or texts at the number you provided, which may involve use of automated means and prerecorded/artificial voices, from Zillow Group and the rental manager(s) you choose to contact about any inquiries you submit through our services. You don't need to consent as a condition of renting any property or buying any other goods or services. Message/data rates may apply. You also agree to Zillow's Terms of Use and Privacy Policy.
"
					label="By choosing to contact a property, you consent to receive calls or texts at the number you provided, which may involve use of automated means and prerecorded/artificial voices, from Zillow Group and the rental manager(s) you choose to contact about any inquiries you submit through our services. You don't need to consent as a condition of renting any property or buying any other goods or services. Message/data rates may apply. You also agree to Zillow's Terms of Use and Privacy Policy.
" /> */}

        <ButtonPrimary className="flex flex-1 stretch">{t.sendMessage}</ButtonPrimary>

				<ButtonSecondary className="whatsapp p-0">
          <Link aria-label="Chat on WhatsApp" className="whatsapp flex justify-center" href={`https://wa.me/${contactPhone}`}>
            <i className="lab la-whatsapp text-3xl whatsapp"></i> <div className="pt-1">{t.space}{t.messageOnWhatsApp}</div>
          </Link>
        </ButtonSecondary>
							</div>

  );
};

export default ContactForm;