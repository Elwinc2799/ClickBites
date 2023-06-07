import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import UseLoadingAnimation from '@/components/utils/UseLoadingAnimation';
import NavBar from '@/components/NavigationBar/NavBar';
import { Background } from '@/components/Background/Background';
import Footer from '@/components/Layout/Footer';
import Image from 'next/image';

interface Business {
    name: string;
    address: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    stars: number;
    review_count: number;
    categories: string;
    hours: object;
    description: string;
    view_count: number;
    vector: any;
    business_pic: string;
}

function Dashboard() {
    const [business, setBusiness] = useState<Business | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get<Business>(
                    `${process.env.API_URL}/api/dashboard`,
                    {
                        headers: {
                            Authorization: `Bearer ${getCookie('token')}`,
                        },
                        withCredentials: true,
                    }
                );

                console.log('response.data', response.data);

                setBusiness(response.data);
            } catch (error) {
                console.log(
                    'There was an error fetching the business data',
                    error
                );
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <UseLoadingAnimation isLoading={isLoading} />
            ) : (
                <>
                    <NavBar isLanding={false} />
                    <Background color="bg-gray-100">
                        <div className="px-44 py-24 flex flex-col w-full justify-start items-center">
                            <Image
                                src={`data:image/jpeg;base64,${business?.business_pic}`}
                                alt="restaurant image"
                                width={0}
                                height={0}
                                sizes="(max-width: 640px) 640px, 100vw"
                                className="w-full h-96 object-cover rounded-tl-lg rounded-tr-lg"
                            />
                            <h1 className="text-4xl mb-4">{business?.name}</h1>
                            <p className="mb-2">Address: {business?.address}</p>
                            <p className="mb-2">City: {business?.city}</p>
                            <p className="mb-2">State: {business?.state}</p>
                            <p className="mb-2">
                                Latitude: {business?.latitude}
                            </p>
                            <p className="mb-2">
                                Longitude: {business?.longitude}
                            </p>
                            <p className="mb-2">Stars: {business?.stars}</p>
                            <p className="mb-2">
                                Review count: {business?.review_count}
                            </p>
                            <p className="mb-2">
                                Categories: {business?.categories}
                            </p>
                            <p className="mb-2">
                                Hours:{' '}
                                {JSON.stringify(business?.hours, null, 2)}
                            </p>
                            <p className="mb-2">
                                Description: {business?.description}
                            </p>
                            <p className="mb-2">
                                Description: {business?.description}
                            </p>
                            <p className="mb-2">
                                Description: {business?.description}
                            </p>
                            <p className="mb-2">
                                View count: {business?.view_count}
                            </p>
                            <p className="mb-2">
                                Vector:{' '}
                                {JSON.stringify(business?.vector, null, 2)}
                            </p>
                        </div>
                    </Background>
                    <Footer />
                </>
            )}
        </>
    );
}

export default Dashboard;
