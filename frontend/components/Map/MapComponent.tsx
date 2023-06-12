/// <reference types="googlemaps" />

import React, { useEffect, useContext } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { LocationContext } from '@/components/utils/LocationContext';

declare global {
    interface Window {
        google: any;
    }
}

interface MapComponentProps {
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
}

function MapComponent({ setLat, setLng }: MapComponentProps) {
    const { latitude, longitude } = useContext(LocationContext);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        if (!apiKey) {
            throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set');
        }
        const loader = new Loader({
            apiKey: apiKey,
            version: 'weekly',
        });

        let map;

        loader.load().then(() => {
            const mapElement = document.getElementById('map');
            if (mapElement) {
                const pos = {
                    lat: latitude ?? 0, // if latitude is null or undefined, use 0 as default value
                    lng: longitude ?? 0, // if longitude is null or undefined, use 0 as default value
                };

                map = new google.maps.Map(mapElement, {
                    center: pos,
                    zoom: 8,
                });

                const marker = new google.maps.Marker({
                    position: pos,
                    map,
                    draggable: true,
                });

                google.maps.event.addListener(
                    marker,
                    'dragend',
                    function (evt) {
                        console.log(
                            'Current Latitude:',
                            evt.latLng.lat(),

                            'Current Longitude:',
                            evt.latLng.lng()
                        );
                        setLat(evt.latLng.lat());
                        setLng(evt.latLng.lng());
                    }
                );
            }
        });
    }, [apiKey, latitude, longitude, setLat, setLng]); // Add latitude and longitude to the dependencies array

    return <div id="map" style={{ height: '100vh', width: '100%' }}></div>;
}

export default MapComponent;
