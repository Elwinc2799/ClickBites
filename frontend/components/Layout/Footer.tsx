import React from 'react';
import Link from 'next/link';
import { CenteredFooter } from './FooterComponents/CenteredFooter';
import { Logo } from '@/components/Logo/Logo';
import { Background } from '@/components/Background/Background';
import { Section } from './Section';

function Footer() {
    return (
        <Background color="bg-gray-100">
            <Section>
                <CenteredFooter logo={<Logo />}>
                    <li>
                        <Link href="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link href="/">
                            Docs
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template">
                            GitHub
                        </Link>
                    </li>
                </CenteredFooter>
            </Section>
        </Background>
    );
}

export default Footer;
