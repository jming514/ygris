import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

const useLocalStorage = <T>(key: string, defaultValue: T): [T, SetValue<T>] => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null
        ? (JSON.parse(storedValue) as T)
        : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (!hasMounted || typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [hasMounted, key, value]);

  return [value, setValue];
};

export default useLocalStorage;
