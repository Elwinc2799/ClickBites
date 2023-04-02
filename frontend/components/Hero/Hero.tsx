import React from 'react';
import { Background } from '../Background/Background';
import SearchBox from '../SearchBox/SearchBox';

interface Props {
    heading: string;
    message: string;
}

function Hero({ heading, message }: Props) {
    return (
        <Background color="bg-gray-100">
            <div className="flex flex-column items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img ">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[2]" />
                <div className="p-5 text-white z-[2] mt-[-10rem]">
                    <h2 className="text-5xl font-bold my-20">{heading}</h2>
                    {/* <p className="py-5 text-xl">{message}</p> */}
                    <SearchBox />
                </div>
            </div>
        </Background>
    );
}

export default Hero;
