import { createContext, useState, useEffect, ReactNode } from 'react';

interface LocationContextType {
    latitude: number | null;
    longitude: number | null;
}

export const LocationContext = createContext<LocationContextType>({
    latitude: null,
    longitude: null,
});

interface LocationProviderProps {
    children: ReactNode;
}

// LocationProvider provides the latitude and longitude of the user
export function LocationProvider({ children }: LocationProviderProps) {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);

    useEffect(() => {
        // get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                function (error) {
                    console.log('Geolocation Error: ', error);
                }
            );
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <LocationContext.Provider value={{ latitude, longitude }}>
            {children}
        </LocationContext.Provider>
    );
}
