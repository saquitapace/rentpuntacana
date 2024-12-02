import axios from "axios";

const translation2 = (function() {

    const init = async () => {
    
        try {
            const language = localStorage.getItem("langPref");
            
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/translations/${language}/get`);
            
            if (response.data && response.data[0]) {
    
                const newArray = response.data[0];  
    
                let e = "";
                let i = 0;
                
                const obj = new Object();
    
                newArray.forEach(l => {
    
                  obj[l.ky]=l.string;

                  if(i=== newArray.length-1){

                    const x = JSON.stringify(obj);
                    localStorage.setItem("translations3",x);
                    window.location.reload(); //todo: saquiita; temp code. issue with router hook here 
                  }
                  i++;
            });
            }
        } catch (error) {
            console.error("Error getting translations:", error);
        }
    };

    // Helper function to safely parse localStorage data
    // const safeGetOptions = () => {
    //     if (typeof window === 'undefined') return null;
        
    //     try {
    //         const options = localStorage.getItem("options");
    //         return options ? JSON.parse(options) : null;
    //     } catch (error) {
    //         console.error("Error parsing options:", error);
    //         return null;
    //     }
    // };
    
    const get = function() {
        const x = localStorage.getItem("translations3");
        const y = JSON.parse(x);
        return y;
    };
      
    return {
        init,
        get
    };
})();

export default translation2;