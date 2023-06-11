import React from 'react';

function DashboardFooter() {
    return (
        <>
            <footer className="block py-4">
                <div className="container mx-auto px-4">
                    <hr className="mb-4 border-b-1 border-blueGray-200" />
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-4/12 px-4">
                            <div className="text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left">
                                Copyright © {new Date().getFullYear()}{' '}
                                <a
                                    href="https://www.creative-tim.com?ref=nnjs-footer-admin"
                                    className="text-blueGray-500 hover:text-blueGray-700 text-sm font-semibold py-1">
                                    ClickBites
                                </a>
                            </div>
                        </div>
                        <div className="w-full md:w-8/12 px-4">
                            <ul className="flex flex-wrap list-none md:justify-end  justify-center">
                                <li>
                                    <a href="https://www.linkedin.com/in/elwin-chiong-3602b5222/" className='text-sm text-blueGray-500 font-semibold py-1 text-center md:text-left'>
                                        Developed by Elwin Chiong, Malaysia
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default DashboardFooter;
