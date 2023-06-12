import React from 'react';

interface Review {
    _id: string;
    user_name?: string;
    stars: number;
    text: string;
    date: string;
}

interface Business {
    reviews: Review[];
}

interface ReviewsTableProps {
    business: Business | null;
}

function ReviewsTable({ business }: ReviewsTableProps) {
    return (
        <div className='px-10'>
            <h1 className="text-2xl font-bold leading-relaxed text-gray-900 pl-4">
                Reviews
            </h1>
            <div className="overflow-y-auto h-[600px] w-full px-4 my-5 no-scrollbar">
                <table className="table table-zebra border table-pin-rows table-pin-cols">
                    {/* head */}
                    <thead className="text-xl text-gray-900">
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Text</th>
                            <th>Rating</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {business?.reviews.map((review: Review, index) => (
                            <tr
                                key={review._id}
                                className="text-gray-900 leading-relaxed w-full text-lg">
                                <td>{index + 1}</td>
                                <td className="w-2/12">{review.user_name}</td>
                                <td className="text-justify">{review.text}</td>
                                <td className="w-1/12 text-center">
                                    {review.stars}
                                </td>
                                <td className="w-1/12">
                                    {new Date(review.date).toLocaleString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric',
                                            hour12: true,
                                        }
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ReviewsTable;
