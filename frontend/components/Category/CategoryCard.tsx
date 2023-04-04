import Image from 'next/image';
import React from 'react';

interface Props {
    categoryImg: any;
    categoryName: string;
}
const InstagramImg = ({ categoryImg, categoryName }: Props) => {
    return (
        <div className="relative m-2">
            <Image
                src={categoryImg}
                alt="/"
                width="0"
                height="0"
                sizes="100vw"
                className="object-cover w-full h-96 rounded-lg"
            />
            <div className="flex justify-center w-full rounded-lg h-full items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-black/50 group">
                <p className="text-gray-300 text-3xl hidden group-hover:block">
                    {categoryName}
                </p>
            </div>
        </div>
    );
};

export default InstagramImg;
