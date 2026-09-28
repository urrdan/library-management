import { useEffect, useState } from "react";

export default function useDebounce(paramValue: string, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(paramValue);

  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      setDebouncedValue(paramValue);
    }, delay);

    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [paramValue, delay]);

  return debouncedValue;
}
