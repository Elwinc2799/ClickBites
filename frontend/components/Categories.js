import React from 'react';
import Image from 'next/image';

const categories = [
    {
        id: 0,
        name: 'Chinese',
        image: '/images/chinese.jpg',
    },
    {
        id: 1,
        name: 'Western',
        image: '/images/western.jpg',
    },
    {
        id: 2,
        name: 'Japanese',
        image: '/images/japanese.jpg',
    },
    {
        id: 3,
        name: 'Korean',
        image: '/images/korean.jpg',
    },
    {
        id: 4,
        name: 'Indian',
        image: '/images/indian.jpg',
    },
    {
        id: 5,
        name: 'Malay',
        image: '/images/malay.jpg',
    },
    {
        id: 6,
        name: 'Fast Food',
        image: '/images/fastfood.jpg',
    },
    {
        id: 7,
        name: 'Cafe',
        image: '/images/cafe.jpg',
    },
];

export default function Categories() {
    return (
        <>
            <div className='flex flex-col w-full h-full justify-between'>
                <h1 className="text-center font-medium text-5xl pb-10 text-[#3D5A80]">Categories</h1>
                <div className="flex flex-row justify-evenly items-start pb-10">
                    {/* Create category round buttons, with the images as the background and the name is at the bottom of the button, seperated into 2 rows with each row having only 4 buttons */}
                    {categories
                        .filter((category) => category.id < 4)
                        .map((category) => (
                            <div
                                key={category.id}
                                className="flex flex-col items-center justify-center px-10">
                                <div
                                    className="w-72 h-72 rounded-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                    }}
                                />
                                <p className="text-[#3D5A80] mt-2 text-3xl">
                                    {category.name}
                                </p>
                            </div>
                        ))}
                </div>
                <div className="flex flex-row justify-evenly items-start pb-20">
                    {categories
                        .filter((category) => category.id >= 4)
                        .map((category) => (
                            <div
                                key={category.id}
                                className="flex flex-col items-center justify-center px-10">
                                <div
                                    className="w-72 h-72 rounded-full bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url(${category.image})`,
                                    }}
                                />
                                <p className="text-[#3D5A80] mt-2 text-3xl">
                                    {category.name}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
