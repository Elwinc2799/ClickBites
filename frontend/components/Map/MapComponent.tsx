import React, { useEffect, useRef, useContext } from 'react';
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
    height: string;
}

function MapComponent({ setLat, setLng, height }: MapComponentProps) {
    const { latitude, longitude } = useContext(LocationContext);
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    const searchBoxRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!apiKey) {
            throw new Error('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set');
        }
        const loader = new Loader({
            apiKey: apiKey,
            version: 'weekly',
            libraries: ['places'], // you need to load the places library
        });

        let map: google.maps.Map

        loader.load().then(() => {
            const mapElement = document.getElementById('map');
            if (mapElement) {
                const pos = {
                    lat: latitude ?? 0,
                    lng: longitude ?? 0,
                };

                map = new google.maps.Map(mapElement as HTMLElement, {
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
                    function (evt: google.maps.MouseEvent) {
                        setLat(evt.latLng.lat());
                        setLng(evt.latLng.lng());
                    }
                );

                const searchBox = new google.maps.places.SearchBox(searchBoxRef.current as HTMLInputElement);
                map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(searchBoxRef.current as Node);

                // Bias the SearchBox results towards current map's viewport.
                map.addListener('bounds_changed', function () {
                    searchBox.setBounds(map.getBounds() as google.maps.LatLngBounds);
                });

                searchBox.addListener('places_changed', function () {
                    const places = searchBox.getPlaces();

                    if (places.length == 0) {
                        return;
                    }

                    // Clear out the old markers.
                    marker.setMap(null);

                    // For each place, get the icon, name and location.
                    const bounds = new window.google.maps.LatLngBounds();
                    places.forEach(function (place) {
                        if (!place.geometry) {
                            console.log("Returned place contains no geometry");
                            return;
                        }

                        marker.setPosition(place.geometry.location);
                        marker.setMap(map);

                        if (place.geometry.viewport) {
                            // Only geocodes have viewport.
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    map.fitBounds(bounds);
                });
            }
        });
    }, [apiKey, latitude, longitude, setLat, setLng]);

    return (
        <div style={{ height: `${height}`, width: '100%' }}>
            <input ref={searchBoxRef} type="text" placeholder="Search places..." className='rounded-sm w-80 h-11 mt-2 text-lg'/>
            <div id="map" style={{ height: '100%', width: '100%' }}></div>
        </div>
    );
}

export default MapComponent;
