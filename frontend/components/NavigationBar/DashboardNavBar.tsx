import React from 'react';
import Link from 'next/link';

function DashboardNavBar() {
    return (
        <>
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent flex items-center p-4">
                <div className="w-full mx-auto items-center flex justify-between flex-wrap px-6">
                    <h1 className="font-bold text-2xl text-[#f7fafc]">
                        Business Dashboard
                    </h1>
                    <Link href="/">
                        <h1 className="text-[#f7fafc] text-2xl font-bold">
                            Home
                        </h1>
                    </Link>
                </div>
            </nav>
            {/* End Navbar */}
        </>
    );
}

export default DashboardNavBar;
