import { useSession } from "next-auth/react";

import { useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';

const useFetchMessages = () => {
  const { data: session } = useSession();
  const user = session?.user;
  //const [params, setParams] = useState(par);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
      let response;
        response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/messages/get`, 
          {userId : user.userId}
      );
     
      const r2 = response.data[0];

      console.log(r2);
      
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
  }, []);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchMessages;