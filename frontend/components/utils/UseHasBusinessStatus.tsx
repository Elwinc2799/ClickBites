import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import axios from 'axios';

function useHasBusinessStatus() {
    const [hasBusiness, setHasBusiness] = useState<Boolean | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<{ has_business: boolean }>(
                    process.env.API_URL + '/api/getHasBusinessFlag',
                    {
                        headers: {
                            Authorization: `Bearer ${getCookie('token')}`,
                        },
                        withCredentials: true,
                    }
                );
                if (res.status !== 200) {
                    setHasBusiness(false);
                }
                else {
                    setHasBusiness(res.data.has_business);
                }
                
            } catch (error) {
                console.log(error);
                setHasBusiness(false);
            }
        };

        fetchData();
    }, []);

    return hasBusiness; // Return the value from the hook
}

export default useHasBusinessStatus;
