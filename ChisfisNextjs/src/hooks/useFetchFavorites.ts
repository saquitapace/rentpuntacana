import { useEffect, useState} from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react";

const useFetchFavorites = () => {
	const { data: session } = useSession();
	const user = session?.user;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
      let response;
        response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/listings/favorites`, {userId:user.userId});
      const r2 = response.data[0];
        
      setData(r2);

      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, [user.userId, setData]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchFavorites;