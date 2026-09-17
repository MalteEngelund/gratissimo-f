import { useEffect, useState } from "react";

export function useFetchV2<T>(url: string, token?: string) {
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
        const res = await fetch(url, {
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        });

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
          setError("An unknown error occurred");
          setData(undefined);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url, token]);

  return { data, isLoading, error };
}
