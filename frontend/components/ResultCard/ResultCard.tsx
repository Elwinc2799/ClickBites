import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Business {
    _id: string;
    name: string;
    city: string;
    state: string;
    categories: string;
    view_count: number;
    review_count: number;
    stars: number;
}

interface ResultCardProps {
    business: Business;
    index: number;
    imageUrl: string;
}

function ResultCard({ business, index, imageUrl }: ResultCardProps) {

    return (
        <>
            <Link href={`/business/${business._id}`}>
                <button
                    key={business._id}
                    type="submit"
                    className="px-10 py-5 w-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                    <div className="card card-side bg-base-100 shadow-sm w-full">
                        <figure>
                            <Image
                                src={imageUrl}
                                alt="Business Image"
                                width={0}
                                height={0}
                                sizes="(max-width: 768px) 100vw, 48vw"
                                className="object-cover h-full w-48"
                            />
                        </figure>
                        <div className="card-body flex-col items-start justify-between">
                            <h2 className="card-title">
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
                                            className="badge badge-primary mr-3">
                                            {category}
                                        </span>
                                    ))}
                            </div>
                            <div className="w-full flex flex-row justify-evenly items-start">
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
                                            {business.stars}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
            </Link>
        </>
    );
}

export default ResultCard;
