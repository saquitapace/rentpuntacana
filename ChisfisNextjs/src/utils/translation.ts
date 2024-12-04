import axios from "axios";

export const translation = (key) => {
    console.log(key)
    
    const changeTranslation = async () => {
        
        alert("translation change");

    };

    const init = async () => {
        try {
            const language = 'sp';
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/translations/${language}/get`);
            if (response.data && response.data[0]) {
                localStorage.setItem("translations", JSON.stringify(response.data[0]));
            }
        } catch (error) {
            //alert()
            console.error("Error getting translations:", error);
        }
    };
   
    // Helper function to safely parse localStorage data
    const safeGetTranslations = () => {
        if (typeof window === 'undefined') return null;
        
        try {
            const translations = localStorage.getItem("translations");
            return translations ? JSON.parse(translations) : null;
        } catch (error) {
            console.error("Error parsing translations:", error);
            return null;
        }
    };

    // Initialize if needed
    if (typeof window !== 'undefined') {
         const translationsSet = localStorage.getItem('translations');
         if (!translationsSet) {
            init();
         }
    }

        const translations = safeGetTranslations();
        const x = translations?.filter(li => li.ky === key).map((item) => {
            return item.string;
        });

        let string;
        
        if(x && x.length >0) {
            string = x[0];
            return string

        } else {
            return
            string ="{ADD TRANSLATION FOR "+key+"}"
        }
}