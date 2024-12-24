import { useEffect, useState} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

const useFetchListings = () => {
	const { data: session } = useSession();
	const user = session?.user;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
      const userId =  user ? user.userId : 'guest';
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/listings/get`, {userId:userId});
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

  }, [user, setData]);

  return {
    data,
    loading,
    error
  };
};

export default useFetchListings;