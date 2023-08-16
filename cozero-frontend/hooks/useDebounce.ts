import { useEffect, useState } from 'react';

export const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [value, 500]);

  return debouncedValue;
};
