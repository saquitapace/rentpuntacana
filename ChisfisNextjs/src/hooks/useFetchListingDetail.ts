import { useEffect, useState} from 'react';
import { useSession } from "next-auth/react";
import { formatDateJoined } from "@/utils/helpers";
import axios from 'axios';

const useFetchListingDetail = (par) => {

  const [params, setParams] = useState(par);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: session } = useSession();
        const user = session?.user;
        params.userId = user.userId;
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/listingDetail/get`, params);
        const r2 = response.data;

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