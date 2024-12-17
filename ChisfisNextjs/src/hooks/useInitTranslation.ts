// useInitTranslation
import { useEffect, useState} from 'react';
import axios from 'axios';

const useInitTranslation = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const language = localStorage.getItem("langPref") ? localStorage.getItem("langPref") : "en";
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/translations/${language}/get`);
        
        if (response.data && response.data[0]) {

            const newArray = response.data[0];
            //console.log(newArray.length);

            let e = "";
            let i = 0;
            
            const obj = new Object();

            newArray.forEach(l => {

              obj[l.ky]=l.string;

              if(i=== newArray.length-1){
                const x = JSON.stringify(obj);
                localStorage.setItem("translations",x);
              }
              i++;
        });
        }
        
    } catch (error) {
        console.error("Error getting translations:", error);
    }
      setLoading(false);
    };

    if (typeof window !== 'undefined') {
      const translationSet = localStorage.getItem('translations');

      if (!translationSet) {
        //console.log("translation not set");
        fetchData();
      }
      else {
        setLoading(false);
        //console.log("already set, return");
        return;
      }
    }
  }, []);

  return {
    data,
    loading,
    error
  };
};

export default useInitTranslation;