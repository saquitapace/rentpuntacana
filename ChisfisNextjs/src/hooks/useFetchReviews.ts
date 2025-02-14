import { useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';

const useFetchReviews = (par) => {

  const [params, setParams] = useState(par);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reviews/${params.type}/get`, params);
      const r2 = response.data[0];
        
      r2.map((str) => {
          str.time = moment(new Date(str.time)).fromNow();   
      });

      setData(r2);

      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [params]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchReviews;