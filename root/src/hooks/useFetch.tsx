import { useEffect, useState } from "react";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setData(undefined);
      setIsLoading(false);
      setError(null);
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        const json = await res.json();
        setData(json);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
          setData(undefined);
        } else {
          throw error;
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
}