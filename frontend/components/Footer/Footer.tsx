import React from 'react';
import Link from 'next/link';
import { CenteredFooter } from './footer/CenteredFooter';
import { Logo } from '../Logo/Logo';

function Footer() {
    return (
        <div color="bg-gray-100">
            <div className="max-w-screen-lg mx-auto px-3 py-16">
                <CenteredFooter logo={<Logo />}>
                    <li className="mx-4">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className="mx-4">
                        <Link href="/">
                            <a>About</a>
                        </Link>
                    </li>
                    <li className="mx-4">
                        <Link href="/">
                            <a>Docs</a>
                        </Link>
                    </li>
                    <li className="mx-4">
                        <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
                            <a>GitHub</a>
                        </Link>
                    </li>
                </CenteredFooter>
            </div>
        </div>
    );
}

export default Footer;
