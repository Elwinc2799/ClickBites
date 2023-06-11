import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Background } from '@/components/Background/Background';
import NavBar from '@/components/NavigationBar/NavBar';
import Footer from '@/components/Layout/Footer';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import ResultCard from '@/components/ResultCard/ResultCard';
import UseLoadingAnimation from '@/components/utils/UseLoadingAnimation';

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
    vector: number[];
    business_pic: string;
    similarity: number;
}

function Results() {
    const router = useRouter();
    const search_query = router.query.search_query;

    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [filteredSortedBusinesses, setFilteredSortedBusinesses] = useState<
        Business[]
    >([]);
    const [starsFilter, setStarsFilter] = useState<number>(0);
    const [isOpenNowFilter, setIsOpenNowFilter] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState(true);

    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
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
                categories: business.categories,
                hours: business.hours,
                description: business.description,
                view_count: business.view_count,
                vector: business.vector,
                business_pic: business.business_pic,
                similarity: business.similarity,
            }));

            // set all cities
            const allCities = newBusinessData.map(
                (business: Business) => business.city
            );

            setBusinesses(newBusinessData);
            setIsLoading(false);
        };

        fetchData();
    }, [search_query]);

    // Filter and sort businesses
    useEffect(() => {
        const filterAndSortBusinesses = () => {
            let filteredBusinesses = businesses.filter((business: Business) => {
                let meetsStarsCondition = business.stars >= starsFilter;
                let meetsOpenNowCondition = !isOpenNowFilter;

                if (isOpenNowFilter) {
                    // assumes business.hours has the current day's hours in HH:MM - HH:MM format
                    let today = new Date();
                    let todayName = [
                        'Sunday',
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                    ][today.getDay()] as
                        | 'Sunday'
                        | 'Monday'
                        | 'Tuesday'
                        | 'Wednesday'
                        | 'Thursday'
                        | 'Friday'
                        | 'Saturday';

                    if (!business.hours) {
                        return false;
                    }
                    let hoursToday = business.hours[todayName];

                    if (hoursToday) {
                        let [start, end] = hoursToday.split('-');
                        let startHour = parseInt(start.split(':')[0]);
                        let startMinute = parseInt(start.split(':')[1]);
                        let endHour = parseInt(end.split(':')[0]);
                        let endMinute = parseInt(end.split(':')[1]);

                        let startTime = new Date();
                        startTime.setHours(startHour, startMinute);

                        let endTime = new Date();
                        if (endHour < startHour) {
                            // end time is on the next day
                            endTime.setDate(endTime.getDate() + 1);
                        }
                        endTime.setHours(endHour, endMinute);

                        meetsOpenNowCondition =
                            today >= startTime && today <= endTime;
                    }
                }

                return meetsStarsCondition && meetsOpenNowCondition;
            });

            if (isToggled) {
                filteredBusinesses.sort(
                    (a: Business, b: Business) => b.similarity - a.similarity
                ); // sort by similarity
            } else {
                filteredBusinesses.sort(
                    (a: Business, b: Business) => b.stars - a.stars
                ); // sort by stars
            }

            setFilteredSortedBusinesses(filteredBusinesses);
        };

        filterAndSortBusinesses();
    }, [isToggled, businesses, starsFilter, isOpenNowFilter]);

    return (
        <>
            {isLoading ? (
                <UseLoadingAnimation isLoading={isLoading} />
            ) : (
                <>
                    <NavBar isLanding={false} />
                    <Background color="bg-gray-100">
                        <div className="w-full h-full pl-10  pt-24 pb-4 flex flex-row justify-around items-start">
                            <div className="w-2/12 px-4 py-4 shrink-0 h-screen flex flex-col border-r-2 border-gray-200">
                                {/* Filters for categories*/}
                                <div className="w-full flex flex-row items-center justify-between mt-2 mb-4">
                                    <p className="text-2xl font-bold leading-relaxed text-gray-900">
                                        Filters
                                    </p>
                                </div>
                                <div className="flex flex-col justify-center items-start mb-8">
                                    <label className="mb-2">Min Stars</label>
                                    <input
                                        type="range"
                                        min={0}
                                        max="5"
                                        value={starsFilter}
                                        className={`range range-xs ${
                                            starsFilter > 0 && 'range-info'
                                        }`}
                                        step="1"
                                        onChange={(e) =>
                                            setStarsFilter(
                                                parseFloat(e.target.value)
                                            )
                                        }
                                    />
                                    <div className="w-full flex justify-between text-xs px-2">
                                        <span>|</span>
                                        <span>|</span>
                                        <span>|</span>
                                        <span>|</span>
                                        <span>|</span>
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between items-start mb-6">
                                    <label className="mb-2 mr-2">
                                        Open Now
                                    </label>
                                    <input
                                        type="checkbox"
                                        className={`checkbox ${
                                            isOpenNowFilter && 'checkbox-info'
                                        }`}
                                        checked={isOpenNowFilter}
                                        onChange={(e) =>
                                            setIsOpenNowFilter(e.target.checked)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="w-6/12 px-4 pt-4 shrink-0 flex flex-col justify-start items-start h-screen">
                                <div className="w-full flex flex-row items-center justify-between">
                                    <p className="text-2xl font-bold leading-relaxed text-gray-900 py-2">
                                        Search Results: {search_query}
                                    </p>
                                    <p className="text-xl font-semibold leading-relaxed text-gray-700 py-2">
                                        Total: {filteredSortedBusinesses.length}
                                    </p>
                                </div>
                                <hr className="my-4 border-1 border-gray-300 w-full" />
                                <div className="form-control ml-5 mb-4 w-full pr-10 items-end">
                                    <label className="label cursor-pointer">
                                        <span className="label-text">
                                            {isToggled
                                                ? 'Recommended'
                                                : 'Default'}
                                        </span>
                                        <input
                                            type="checkbox"
                                            className={`ml-5 toggle-info toggle ${
                                                isToggled
                                                    ? 'toggle-checked'
                                                    : ''
                                            }`}
                                            checked={isToggled}
                                            onChange={(e) =>
                                                setIsToggled(e.target.checked)
                                            }
                                        />
                                    </label>
                                </div>
                                <div className="h-full w-full flex flex-col overflow-x-hidden overflow-y-scroll no-scrollbar">
                                    {filteredSortedBusinesses.map(
                                        (business, index) => (
                                            <ResultCard
                                                key={index}
                                                business={business}
                                                index={index}
                                                isToggled={isToggled}
                                            />
                                        )
                                    )}
                                    <div className="divider mt-10">END</div>
                                </div>
                            </div>
                            <div className="h-screen w-4/12 shrink-0 flex px-4 py-4 border-l-2 border-gray-200">
                                <Image
                                    src="/images/map.jpg"
                                    alt="Map"
                                    width={0}
                                    height={0}
                                    sizes="100vw, 48vw"
                                    className="object-cover h-full w-full"
                                />
                            </div>
                        </div>
                    </Background>

                    <Footer />
                </>
            )}
        </>
    );
}

export default Results;
