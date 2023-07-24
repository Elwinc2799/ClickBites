import React, { ReactComponentElement } from 'react';
import PropTypes from 'prop-types';

interface CardStatsProps {
    statSubtitle: string;
    statTitle: string;
    statIconColor: string;
}

export const TotalViewsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
    </svg>
);

export const TotalReviewsIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
        />
    </svg>
);

export const RatingIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
    </svg>
);

function CardStats({ statSubtitle, statTitle, statIconColor }: CardStatsProps) {
    const Icon = {
        'Total Views': <TotalViewsIcon />,
        'Total Reviews': <TotalReviewsIcon />,
        Rating: <RatingIcon />,
    }[statSubtitle];
    
    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 shadow-lg h-full">
                <div className="w-full h-full flex flex-row items-center justify-between px-7 py-4">
                    <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                        <h5 className="text-gray-900 uppercase  text-md">
                            {statSubtitle}
                        </h5>
                        <span className="font-semibold text-4xl text-blueGray-700">
                            {statTitle}
                        </span>
                    </div>
                    <div className="relative w-auto pl-4 flex-initial">
                        <div
                            className={
                                'text-white p-3 text-center inline-flex items-center justify-center w-16 h-16 shadow-lg rounded-full ' +
                                statIconColor
                            }>
                            {Icon}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

CardStats.defaultProps = {
    statSubtitle: 'Traffic',
    statTitle: '350,897',
    statIconName: 'far fa-chart-bar',
    statIconColor: 'bg-red-500',
};

CardStats.propTypes = {
    statSubtitle: PropTypes.string,
    statTitle: PropTypes.string,
    statIconName: PropTypes.string,
    statIconColor: PropTypes.string,
};

export default CardStats;
