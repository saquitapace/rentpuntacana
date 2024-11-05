import axios from "axios";

const i18n = (function() {

    const init = async () => {
        const strings = await axios.get(process.env.NEXT_PUBLIC_API_URL+'/auth/i18n', {
        }).then((response) => {
            //console.log("get i18n:");
            //console.log(response.data[0]);
            
            //setting array to local storage
            localStorage.setItem("i18n",JSON.stringify(response.data[0]))
            
        }).catch(function (error) {
            console.log("Error getting i18n");
        });
    }
      
    const i18nSet : string = localStorage.getItem('i18n') ?? '';
    if (i18nSet === ''){
        init();
    } else {
        console.log("i18n are already set in localStorage so no need to call it again;");
    }

    const getLanguage = function(){
        return "en";
    }

    const getStrings = function() {
        const r = JSON.parse(localStorage.getItem("i18n"));
        console.log(r)
        return r;
    };
      
    return {
        getStrings : getStrings,
        getLanguage : getLanguage,
    }
})();

export default i18n;