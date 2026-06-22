import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            if (typeof window !== 'undefined') {
                const item = window.localStorage.getItem(key);
                if (item && item.startsWith('{') && item.endsWith('}')) {
                    return item ? JSON.parse(item) : initialValue;
                } else {
                    return item ? item : initialValue;
                }
            }
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (valueToStore && valueToStore.startsWith('{') && valueToStore.endsWith('}')) {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
            else {
                window.localStorage.setItem(key, valueToStore);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as const;
}

export default useLocalStorage;
