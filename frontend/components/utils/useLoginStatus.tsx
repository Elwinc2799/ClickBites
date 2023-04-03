import { useState, useEffect } from 'react';
import { hasCookie } from 'cookies-next';

function useLoginStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (hasCookie('token')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return isLoggedIn;
}

export { useLoginStatus };
