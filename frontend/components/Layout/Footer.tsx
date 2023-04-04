import React from 'react';
import Link from 'next/link';
import { CenteredFooter } from './FooterComponents/CenteredFooter';
import { Logo } from '@/components/Logo/Logo';
import { Background } from '@/components/Background/Background';
import { Section } from './Section';

function Footer() {
    return (
            <Section>
                <CenteredFooter logo={<Logo />}>
                </CenteredFooter>
            </Section>
    );
}

export default Footer;
