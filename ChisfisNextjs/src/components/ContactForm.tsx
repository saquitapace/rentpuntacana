import React, { FC,useEffect,useState } from "react";
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
    (state: RootState) => state.translations
	);
  const _Data = data;
  
  const userProfile = useSelector((state: RootState) => state.userProfile);
  const [contactName , setContactName]= useState("");
  const [contactEmail , setContactEmail]= useState("");
  const [contactPhone , setContactPhone]= useState("");
  const [listingRE, setListingRE] = useState(""); //todo: enter in listing # once redux is fixed.

  useEffect(() => {
    if (userProfile) {
      setContactName(`${userProfile.firstName} ${userProfile.lastName}`);
      setContactEmail(userProfile.email || "");
      setContactPhone(userProfile.phoneNumber || "");
      setListingRE(`${translations.regardingListing || ""} ${_Data}`);
    }
  }, [userProfile, translations, _Data]);

  return (
    <div className="w-full flex flex-col space-y-6 xl:space-y-7">
				<Input value={contactName} 
        type="text"
        name="contactName"
        placeholder={translations.yourName} 
        onChange={(e) => setContactName(e.target.value)} />			
        
        <Input 
        type="text" 
        name="subject"
        value={listingRE} 
        placeholder={translations.regardingListing} 
        onChange={(e) => setListingRE(e.target.value)} />

				<Input 
        type="email"
        name="email"
        value={contactEmail} 
        placeholder={translations.email}
        autoComplete="off"
        onChange={(e) => setContactEmail(e.target.value)} />

        <div>
            <PhoneNumberInput
              className="mt-1.5"
              phoneNumber={contactPhone}
            />
         </div>

				<Textarea
          name="contactFormBody"
          defaultValue={translations.contactAgentPlaceholder}
        />
					
				<Checkbox
					className="termsAndConditions"
					name="termsAndConditions"
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