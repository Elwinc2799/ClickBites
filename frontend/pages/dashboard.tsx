import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import UseLoadingAnimation from '@/components/utils/UseLoadingAnimation';
import { Background } from '@/components/Background/Background';
import DashboardFooter from '@/components/Layout/DashboardFooter';
import DashboardNavbar from '@/components/NavigationBar/DashboardNavBar';
import Image from 'next/image';
import DashboardHeader from '@/components/Layout/DashboardHeader';
import CardProfile from '@/components/Dashboard/CardProfile';
import ReviewsTable from '@/components/Dashboard/ReviewsTable';
import AspectRadar from '@/components/SharedComponents/AspectRadar';

interface Review {
    _id: string;
    user_id: string;
    business_id: string;
    business_name: string;
    business_city: string;
    stars: number;
    text: string;
    date: string;
}
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
    reviews: Review[];
}

type VectorScore = {
    text: string;
    score: string;
};

const blankBusinessPics = [
    'business_1.jpg',
    'business_2.jpg',
    'business_3.jpg',
    'business_4.jpg',
    'business_5.jpg',
];

function Dashboard() {
    const [business, setBusiness] = useState<Business | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [vectorScores, setVectorScores] = useState<VectorScore[]>([]);

    const [defaultPic, setDefaultPic] = useState('');

    useEffect(() => {
        const randomPic =
            blankBusinessPics[
                Math.floor(Math.random() * blankBusinessPics.length)
            ];
        setDefaultPic(randomPic);
    }, []);

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

                const newVectorText = [
                    'Food',
                    'Service',
                    'Price',
                    'Ambience',
                    'Miscellaneous',
                ];

                // cast each userData.vector to a string
                let newVector = response.data.vector.map(
                    (value: number, index: number) => {
                        return {
                            text: newVectorText[index],
                            score: (value * 100).toFixed(2).toString(),
                        };
                    }
                );

                setVectorScores(newVector);

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
                    <div className="bg-[#1f283b] relative h-44 px-10">
                        <DashboardNavbar />

                        <div className="flex flex-row justify-start items-start w-full">
                            <CardProfile
                                business={business}
                                defaultPic={defaultPic}
                            />
                            <div className="flex flex-col justify-start items-center w-8/12 ">
                                <DashboardHeader business={business} />
                                <h1 className="text-2xl font-bold leading-relaxed  text-gray-900">
                                    Aspect Analysis
                                </h1>
                                <AspectRadar
                                    vectorScores={vectorScores}
                                    isBusiness={true}
                                    isUser={false}
                                />
                            </div>
                        </div>
                        <hr className="mt-9 mb-4 border-1 border-gray-300 w-full" />
                        <ReviewsTable business={business} />
                        <DashboardFooter />
                    </div>
                </>
            )}
        </>
    );
}

export default Dashboard;

{
    /* <Image
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
    View count: {business?.view_count}
</p>
<p className="mb-2">
    Vector:{' '}
    {JSON.stringify(business?.vector, null, 2)}
</p> */
}
