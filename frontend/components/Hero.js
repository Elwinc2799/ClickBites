import React from 'react';
import Image from 'next/image';

export default function Hero() {
    return (
        <>
            <div className="px-10 py-20 flex flex-row w-full justify-evenly">
                <div className=" flex flex-col justify-center items-start">
                    <h1 className="text-8xl text-[#3D5A80] leading-normal">
                        Delicious <strong>Food</strong>
                        <br />
                        For Your Life
                    </h1>
                    <p className="text-[#98C1D9] mt-4 mb-6 text-3xl">
                        Find the restaurants that suits your taste and
                        preferences.
                    </p>
                    {/* Search input box */}
                    <div className="w-96">
                        <input
                            type="text"
                            className="w-full h-12 px-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-[#EE6C4D]"
                            placeholder="western, coffee, sushi, etc"
                        />
                    </div>
                </div>
                <Image
                    src="/images/Hero.svg"
                    alt="Hero"
                    width={600}
                    height={600}
                />
            </div>
        </>
    );
}
