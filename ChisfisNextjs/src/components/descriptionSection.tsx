import { FC, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { LanguageIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Props {
  className?: "" | string;
  description?: "" | string;
}

const DescriptionSection: FC<Props> = ({ 
  className = "",
  description = ""
}) => {
	
	const descr = useRef(description);

  	const { translations, isLoading, error } = useSelector(
		(state: RootState) => state.translations
	);
  
  return (
    <div className="listingSection__wrap">
		<h2 className="text-xl font-semibold items-end">{translations.listingDescription} 
			<div className="flex p-0 m-0 text-xs font-normal">
				<i>{translations.someInfoAutomaticallyTranslated}</i> 
				<Link className="pl-3 underline" href="#">{translations.showOriginal}</Link>
				<LanguageIcon className="pl-1 h-6 w-6" />
			</div>
		</h2>
		
		<div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
		<div className="text-neutral-6000 dark:text-neutral-300">
			<div>
				{descr.current}
			</div>
		</div>
	</div>
  );
};

export default DescriptionSection;