import { useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import { formatDateJoined } from "@/utils/helpers";
import axios from 'axios';

const useFetchListingDetail = (par) => {

  const [params, setParams] = useState(par);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        params.userId = user.userId;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/listingDetail/get`, params);
        const r2 = response.data;

        r2.amenities = JSON.parse(r2.amenities);
        r2.map = JSON.parse(r2.map);
        r2.price = parseInt(r2.price);
        r2.authorCreatedAt = formatDateJoined(r2.authorCreatedAt);

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
    error
  };
};

export default useFetchListingDetail;