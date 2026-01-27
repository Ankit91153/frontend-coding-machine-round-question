import { useEffect, useRef, useState } from "react";
import { debounce } from "./debounce";

const LIMIT = 10;
export const useProductFetch = (query: string, skip: number) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);
  const cacheRef = useRef<Map<string, any>>(new Map());

  const fetchData = async (query: string, skip: number) => {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${query}&limit=${LIMIT}&skip=${skip}`,
    );
    const data = res.json();
    return data;
  };
  useEffect(() => {
    const cacheKey = `${query}_${skip}`;

    async function runthis() {
      if (cacheRef.current.has(cacheKey)) {
        const cached = cacheRef.current.get(cacheKey);
        setData(cached.products);
        setTotal(cached.total);
        return;
      }
      try {
        setLoading(true);
        const data = await fetchData(query, skip);
        setData(data.products);
        setTotal(Math.ceil(data.total / LIMIT));

        cacheRef.current.set(cacheKey, {
          products: data.products,
          total: Math.ceil(data.total / LIMIT),
        });
      } catch (err: any) {
        console.log(err);
        setError("Error while fetching product");
      } finally {
        setLoading(false);
      }
    }
    runthis();
  }, [query, skip]);

  return { loading, data, error, total };
};
