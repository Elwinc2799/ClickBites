import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Business {
    _id: string;
    name: string;
    city: string;
    state: string;
    categories: string;
    view_count: number;
    review_count: number;
    stars: number;
    business_pic: string;
    vector: number[];
}

interface ResultCardProps {
    business: Business;
    index: number;
}

const blankBusinessPics = [
    'business_1.jpg',
    'business_2.jpg',
    'business_3.jpg',
    'business_4.jpg',
    'business_5.jpg',
];

function ResultCard({ business, index }: ResultCardProps) {
    if (business.vector == null) {
        business.vector = [0, 0, 0, 0, 0];
    }

    // cast business vector scores to a list with text and scores and convert scores to string
    const vectorScores = [
        {
            text: 'Food',
            score: (business.vector[0] * 100).toFixed(2).toString(),
        },
        {
            text: 'Serv.',
            score: (business.vector[1] * 100).toFixed(2).toString(),
        },
        {
            text: 'Price',
            score: (business.vector[2] * 100).toFixed(2).toString(),
        },
        {
            text: 'Ambi.',
            score: (business.vector[3] * 100).toFixed(2).toString(),
        },
        {
            text: 'Misc.',
            score: (business.vector[4] * 100).toFixed(2).toString(),
        },
    ];

    const [defaultPic, setDefaultPic] = useState('');

    useEffect(() => {
        const randomPic =
            blankBusinessPics[
                Math.floor(Math.random() * blankBusinessPics.length)
            ];
        setDefaultPic(randomPic);
    }, []);

    return (
        <>
            <Link href={`/business/${business._id}`}>
                <button
                    key={business._id}
                    type="submit"
                    className="px-10 py-5 w-[700px] overflow-wrap height-auto transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <div className="card card-side bg-base-100 shadow-sm w-full">
                        <figure className="w-96">
                            <Image
                                src={
                                    business.business_pic
                                        ? `data:image/jpeg;base64,${business.business_pic}`
                                        : `/images/${defaultPic}`
                                }
                                alt="Business Image"
                                width={0}
                                height={0}
                                sizes="(max-width: 768px) 100vw, 48vw"
                                className="object-cover h-full w-full"
                            />
                        </figure>
                        <div className="card-body flex-col items-start justify-between">
                            <h2 className="card-title text-left">
                                {index + 1}. {business.name}
                            </h2>
                            <h3>
                                {business.city}, {business.state}
                            </h3>
                            <div className="flex flex-row my-2">
                                {business.categories
                                    .split(', ')
                                    .slice(0, 3)
                                    .map((category, index) => (
                                        <span
                                            key={index}
                                            className="badge bg-blue-500 text-[#f7fafc] mr-3 text-center h-full">
                                            {category}
                                        </span>
                                    ))}
                            </div>
                            <div className="w-full flex flex-row justify-evenly items-start mb-4">
                                <div className="stats shadow mx-2">
                                    <div className="stat">
                                        <div className="stat-title text-center">
                                            Views
                                        </div>
                                        <div className="stat-value text-center">
                                            {business.view_count}
                                        </div>
                                    </div>
                                </div>
                                <div className="stats shadow mx-2">
                                    <div className="stat">
                                        <div className="stat-title text-center">
                                            Reviews
                                        </div>
                                        <div className="stat-value text-center">
                                            {business.review_count}
                                        </div>
                                    </div>
                                </div>
                                <div className="stats shadow mx-2">
                                    <div className="stat">
                                        <div className="stat-title text-center">
                                            Rating
                                        </div>
                                        <div className="stat-value text-center">
                                            {Number(business.stars.toFixed(1))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex flex-row justify-between">
                                {vectorScores.map((value, index) => (
                                    <div
                                        key={index}
                                        className={`border-4 border-gray-200 mx-2 text-xs radial-progress  ${
                                            // if score is less than 0, make text red, else make text green
                                            parseFloat(value.score) < 0
                                                ? 'text-red-500'
                                                : 'text-green-500'
                                        }`}
                                        style={
                                            {
                                                '--value':
                                                    parseFloat(value.score) < 0
                                                        ? (-parseFloat(
                                                              value.score
                                                          )).toString()
                                                        : value.score,
                                                '--size': '3rem',
                                                '--thickness': '0.3rem',
                                            } as React.CSSProperties
                                        }>
                                        {value.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </button>
            </Link>
        </>
    );
}

export default ResultCard;
