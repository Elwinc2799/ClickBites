import React, { useEffect } from 'react';

import NavBar from '@/components/NavigationBar/NavBar';
import Footer from '@/components/Layout/Footer';
import { Background } from '@/components/Background/Background';
import Image from 'next/image';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import ReviewCard from '@/components/Review/ReviewCard';

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

function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [reviewCount, setReviewCount] = useState(0);
    const [stars, setStars] = useState(0);
    const [reviews, setReviews] = useState<Review[]>([
        {
            _id: '',
            user_id: '',
            business_id: '',
            business_name: '',
            business_city: '',
            stars: 0,
            text: '',
            date: '',
        },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get<{ userId: string }>(
                process.env.API_URL + '/api/getUserId',
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    withCredentials: true,
                }
            );
            return res.data.userId;
        };

        const fetchUserData = async (userId: string) => {
            const res = await axios.get(
                process.env.API_URL + '/api/profile/' + userId,
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    withCredentials: true,
                }
            );
            return res.data;
        };

        const fetchDataAndUserData = async () => {
            const userId = await fetchData();
            const userData = await fetchUserData(userId);

            setName(userData.name);
            setEmail(userData.email);
            setPhone(userData.phone);
            setAddress(userData.address);
            setState(userData.state);
            setReviewCount(userData.review_count);
            setStars(userData.average_stars);

            const newReviews = userData.reviews.map((userReview: Review) => ({
                _id: userReview._id,
                user_id: userReview.user_id,
                business_id: userReview.business_id,
                business_name: userReview.business_name,
                business_city: userReview.business_city,
                stars: userReview.stars,
                text: userReview.text,
                date: userReview.date,
            }));

            setReviews(newReviews);
        };
        fetchDataAndUserData();
    }, []);

    return (
        <>
            <NavBar isLanding={true} />
            <Background color="bg-gray-100">
                <main className="profile-page">
                    <section className="relative block h-[500px]">
                        <div className="relative">
                            <Image
                                src="/images/profile-bg.jpg"
                                alt="Profile background"
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="object-cover w-full h-96"
                            />
                            <div
                                id="blackOverlay"
                                className="absolute top-0 w-full h-full opacity-50 bg-black"
                            />
                        </div>
                    </section>
                    <section className="relative py-16 bg-blueGray-200">
                        <div className="container mx-auto px-20">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                                <div className="px-6">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                            <div className="absolute top left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <Image
                                                    alt="..."
                                                    src="/images/avatar.png"
                                                    width="0"
                                                    height="0"
                                                    sizes="100vw"
                                                    className="w-44 rounded-full border-none shadow-xl"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-4/12 px-4 order-4 text-right self-center justify-between">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block tracking-wide text-gray-900">
                                                    {state}
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    State
                                                </span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                                    {reviewCount}
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    Reviews
                                                </span>
                                            </div>
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-gray-900">
                                                    {stars}
                                                </span>
                                                <span className="text-sm text-gray-900">
                                                    Average Stars
                                                </span>
                                            </div>
                                            {/* <div className="py-6 px-3 mt-32 sm:mt-0">
                                                <button
                                                    className="bg-blue-600 active:bg-blueGray-600 uppercase text-gray-100 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                    type="button">
                                                    Connect
                                                </button>
                                            </div> */}
                                        </div>
                                        <div className="px-4 order-1">
                                            <div className="flex justify-between py-4 lg:pt-4 pt-8">
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block tracking-wide text-gray-900">
                                                        {email}
                                                    </span>
                                                    <span className="text-sm text-gray-900">
                                                        Email
                                                    </span>
                                                </div>
                                                <div className="mr-4 p-3 text-center">
                                                    <span className="text-xl font-bold block  tracking-wide text-gray-900">
                                                        {phone}
                                                    </span>
                                                    <span className="text-sm text-gray-900">
                                                        Phone
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-900">
                                            {name}
                                        </h3>
                                        <div className="text-lg leading-normal mt-0 mb-2 text-gray-900 font-bold uppercase">
                                            <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-900"></i>{' '}
                                            {address}
                                        </div>
                                        {/* <div className="mb-2 text-blueGray-600">
                                            <i className="fas fa-university mr-2 text-lg text-gray-900"></i>
                                            Universiti Sains Malaysia
                                        </div> */}
                                    </div>
                                    {/* <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-lg leading-relaxed text-gray-900">
                                                    An artist of considerable
                                                    range, Jenna the name taken
                                                    by Melbourne-raised,
                                                    Brooklyn-based Nick Murphy
                                                    writes, performs and records
                                                    all of his own music, giving
                                                    it a warm, intimate feel
                                                    with a solid groove
                                                    structure. An artist of
                                                    considerable range.
                                                </p>
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="mt-10 py-10 border-t border-gray-300 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-full lg:w-9/12 px-4">
                                                <p className="mb-4 text-2xl font-bold leading-relaxed uppercase text-gray-900">
                                                    Reviews
                                                </p>
                                            </div>
                                            <div className="w-full px-4">
                                                {reviews.map(
                                                    (review, index) => (
                                                        <ReviewCard
                                                            key={index.toString()}
                                                            review={review}
                                                            isUser={true}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </Background>

            <Footer />
        </>
    );
}

export default Profile;
