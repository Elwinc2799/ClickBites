import React from 'react';
import CardStats from '@/components/Dashboard/CardStats';

interface Business {
    stars: number;
    review_count: number;
    view_count: number;
}

interface DashboardHeaderProps {
    business: Business | null;
}

function DashboardHeader({ business }: DashboardHeaderProps) {
    return (
        <>
            <div className="relative pl-8 pb-16 mt-20 w-full flex flex-row justify-between">
                <div className="w-4/12 px-8">
                    <CardStats
                        statSubtitle="Total Views"
                        statTitle={business?.view_count.toString()}
                        statIconColor="bg-red-500"
                    />
                </div>
                <div className="w-4/12 px-8">
                    <CardStats
                        statSubtitle="Total Reviews"
                        statTitle={business?.review_count.toString()}
                        statIconColor="bg-orange-500"
                    />
                </div>
                <div className="w-4/12 px-8">
                    <CardStats
                        statSubtitle="Rating"
                        statTitle={business?.stars.toString()}
                        statIconColor="bg-pink-500"
                    />
                </div>
            </div>
        </>
    );
}

export default DashboardHeader;
