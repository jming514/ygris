import { useEffect, useState } from 'react';

const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {

    let currentValue: unknown;

    try {
      currentValue = JSON.parse(localStorage.getItem(key) || defaultValue);
    } catch (error) {
      currentValue = defaultValue;
    }

    return currentValue;
  })

  useEffect(() => {

    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage;
