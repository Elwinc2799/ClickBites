import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
    return (
        <>
            <Head>
                <title>{title ? title + ' - ClickBites' : 'ClickBites'}</title>
                <meta
                    name="description"
                    content="ClickBites is a restaurant recommendation system that recommends based on your preference."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <div className="flex h-full flex-col justify-between">
                <header>
                    <nav className="flex h-12 justify-between px-4 shadow-md items-center">
                        <Link href="/" className="text-2xl font-bold text-[#3D5A80]">
                            ClickBites
                        </Link>
                        <div className="flex flex-row w-52 justify-between">
                            <Link href="/login" className="p-2 text-xl text-[#3D5A80]">
                                Login
                            </Link>
                            <Link href="/signup" className="p-2 text-xl text-[#3D5A80]">
                                Sign Up
                            </Link>
                        </div>
                    </nav>
                </header>

                <main className="w-full mt-4 px-4 space-y-10">{children}</main>

                <footer className="flex justify-center items-center h-10 shadow-inner text-[#98C1D9]">
                    <p>© 2023 ClickBites. Made in Malaysia</p>
                </footer>
            </div>
        </>
    );
}
