import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Background } from '@/components/Background/Background';
import NavBar from '@/components/NavigationBar/NavBar';
import Footer from '@/components/Layout/Footer';

function Results() {
    const router = useRouter();
    const search_query = router.query.search_query;

    return (
        <>
            <NavBar isLanding={false} />
            <Background color="bg-gray-100">
                <div className="px-44 py-20 flex flex-row justify-around items-start">
                    <div className=" w-2/3 flex flex-col justify-start items-start px-20">
                        <div className="w-9/12 px-4">
                            <p className="mb-4 text-2xl font-bold leading-relaxed text-gray-900">
                                Search Results: {search_query}
                            </p>
                        </div>
                        <hr className="my-4 border-1 border-gray-300 w-full" />
                        <button type="submit" className="px-10 py-5 w-full">
                            <div className="card card-side bg-base-100 shadow-xl w-full">
                                <figure>
                                    <Image
                                        src="/images/western.jpg"
                                        alt="Movie"
                                        width={190}
                                        height={0}
                                        className="object-cover"
                                    />
                                </figure>
                                <div className="card-body flex-col items-start">
                                    <h2 className="card-title">Au Bon Pain</h2>
                                    <p>Philadelphia, USA</p>
                                </div>
                            </div>
                        </button>
                    </div>
                    <div className="bg-slate-200 w-1/3 h-screen"></div>
                </div>
            </Background>

            <Footer />
        </>
    );
}

export default Results;
