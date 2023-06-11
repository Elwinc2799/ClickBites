import React from 'react';
import Link from 'next/link';

function DashboardNavBar() {
    return (
        <>
            {/* Navbar */}
            <nav className="absolute top-0 left-0 w-full z-10 bg-transparent flex items-center p-4">
                <div className="w-full mx-autp items-center flex justify-between flex-wrap md:px-10 px-4">
                    <h1 className="font-bold text-2xl text-[#f7fafc]">
                        ClickBites Dashboard
                    </h1>
                    <Link href="/">
                        <h1 className="text-[#f7fafc] text-2xl hidden lg:inline-block underline">
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
