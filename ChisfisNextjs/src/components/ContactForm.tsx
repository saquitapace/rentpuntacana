import React, { FC,useState } from "react";
import Textarea from '@/shared/Textarea';
import Input from '@/shared/Input';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonSecondary from '@/shared/ButtonSecondary';
import Link from 'next/link';
import PhoneNumberInput from "@/components/PhoneNumberInput";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import Checkbox from "@/shared/Checkbox";

export interface ContactFormProps {
  data?: any;
  className?: string;
}

const ContactForm: FC<ContactFormProps> = ({
  className = "",
  data = "{listing ID}",
}) => {

  const { translations, isLoading, error } = useSelector(
		(state) => state.translations
	);
  const _Data = data;
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const [contactName , setContactName]= useState(userProfile.firstName+" "+ userProfile.lastName );
  const [contactEmail , setContactEmail]= useState(userProfile.email);
  const [contactPhone , setContactPhone]= useState(userProfile.phoneNumber);
  const [listingRE, setListingRE] = useState(translations.regardingListing +_Data); //todo: enter in listing # once redux is fixed.

  return (
    <div className="w-full flex flex-col space-y-6 xl:space-y-7">
				<Input value={contactName} placeholder={translations.yourName} onChange={(e) => setContactName(e.target.value)}
 />			<Input type="text" value={listingRE} placeholder={translations.regardingListing} onChange={(e) => setListingRE(e.target.value)} />

				<Input type="email" value={contactEmail} placeholder={translations.email} onChange={(e) => setContactEmail(e.target.value)} />
        <div>
            <PhoneNumberInput
              className="mt-1.5"
              phoneNumber={contactPhone}
            />
          </div>
				<Textarea
          defaultValue={translations.contactAgentPlaceholder}
        />
					
				<Checkbox
					className="termsAndConditions"
					name=""
					label={translations.contactTerms}
        />
        <ButtonPrimary className="flex flex-1 stretch">{translations.sendMessage}</ButtonPrimary>

				<ButtonSecondary className="whatsapp p-0">
          <Link aria-label="Chat on WhatsApp" className="whatsapp flex justify-center" target="_blank" href={`https://wa.me/${contactPhone}?text=${translations.contactAgentPlaceholder}`}>
            <i className="lab la-whatsapp text-3xl whatsapp"></i> <div className="pt-1">{translations.space}{translations.messageOnWhatsApp}</div>
          </Link>
        </ButtonSecondary>
			</div>
  );
};

export default ContactForm;