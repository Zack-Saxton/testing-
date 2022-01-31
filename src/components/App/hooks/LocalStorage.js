import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const LocalStorage = (key, defaultValue) => {
    const stored = Cookies.get(key);
    const initial = stored ? JSON.parse(stored) : defaultValue;
    const [ value, setValue ] = useState(initial);

    useEffect(() => {
        Cookies.set(key, JSON.stringify(value));
    }, [ key, value ]);

    return [ value, setValue ];
};
