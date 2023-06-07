import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Background } from '@/components/Background/Background';
import NavBar from '@/components/NavigationBar/NavBar';
import Footer from '@/components/Layout/Footer';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import ResultCard from '@/components/ResultCard/ResultCard';

interface Business {
    _id: string;
    name: string;
    address: string;
    city: string;
    state: string;
    latitude: number;
    longitude: number;
    stars: number;
    review_count: number;
    is_open: number;
    categories: string;
    hours: {
        Monday: string;
        Tuesday: string;
        Wednesday: string;
        Thursday: string;
        Friday: string;
        Saturday: string;
        Sunday: string;
    };
    description: string;
    view_count: number;
    business_pic: string;
}

function Results() {
    const router = useRouter();
    const search_query = router.query.search_query;

    const [businesses, setBusinesses] = useState<Business[]>([
        {
            _id: '',
            name: '',
            address: '',
            city: '',
            state: '',
            latitude: 0,
            longitude: 0,
            stars: 0,
            review_count: 0,
            is_open: 0,
            categories: '',
            hours: {
                Monday: '',
                Tuesday: '',
                Wednesday: '',
                Thursday: '',
                Friday: '',
                Saturday: '',
                Sunday: '',
            },
            description: '',
            view_count: 0,
            business_pic: '',
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(
                process.env.API_URL +
                    `/api/results?search_query=${search_query}`,
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    withCredentials: true,
                }
            );

            const newBusinessData = res.data.map((business: Business) => ({
                _id: business._id,
                name: business.name,
                address: business.address,
                city: business.city,
                state: business.state,
                latitude: business.latitude,
                longitude: business.longitude,
                stars: business.stars,
                review_count: business.review_count,
                is_open: business.is_open,
                categories: business.categories,
                hours: business.hours,
                description: business.description,
                view_count: business.view_count,
                business_pic: business.business_pic,
            }));

            setBusinesses(newBusinessData);
        };

        fetchData();
    }, [search_query]);

    return (
        <>
            <NavBar isLanding={false} />
            <Background color="bg-gray-100">
                <div className="px-44 py-24 flex flex-row justify-around items-start">
                    <div className=" w-2/3 flex flex-col justify-start items-start px-20">
                        <div className="w-9/12 px-4 py-4">
                            <p className="text-2xl font-bold leading-relaxed text-gray-900">
                                Search Results: {search_query}
                            </p>
                        </div>
                        <hr className="my-4 border-1 border-gray-300 w-full" />
                        {businesses.map((business, index) => (
                            <ResultCard
                                key={index}
                                business={business}
                                index={index}
                            />
                        ))}
                    </div>
                    <div className="bg-slate-200 w-1/3 relative h-full overflow-hidden shadow-inner">
                        <Image
                            src="/images/map.jpg"
                            alt="Map"
                            width={0}
                            height={0}
                            sizes="(max-width: 768px) 100vw, 48vw"
                            className="object-cover h-screen w-full"
                        />
                    </div>
                </div>
            </Background>

            <Footer />
        </>
    );
}

export default Results;
