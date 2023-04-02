import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

interface Props {
    isLanding: boolean;
}

function NavBar(props: Props) {
    const [color, setColor] = useState('transparent');
    const [textColor, setTextColor] = useState('white');
    const [landing, setLanding] = useState(props.isLanding);

    useEffect(() => {
        if (landing) {
            const changeColor = () => {
                if (window.scrollY >= 90) {
                    setColor('#f7fafc');
                    setTextColor('#1a202c');
                } else {
                    setColor('transparent');
                    setTextColor('#f7fafc');
                }
            };
            window.addEventListener('scroll', changeColor);
        } else {
            setColor('#f7fafc');
            setTextColor('#1a202c');
        }
    }, [landing]);

    return (
        <div
            style={{ backgroundColor: `${color}` }}
            className="fixed left-0 top-0 w-full z-10 ease-in duration-300">
            <div className="max-w-[1240px] m-auto flex justify-between items-center p-4 text-white">
                <Link href="/">
                    <h1
                        style={{ color: `${textColor}` }}
                        className="font-bold text-4xl">
                        ClickBites
                    </h1>
                </Link>
                <ul style={{ color: `${textColor}` }} className="flex flex-row">
                    <li className="p-4">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="p-4">
                        <Link href="/Login">Log In</Link>
                    </li>
                    <li className="p-4">
                        <Link href="/SignUp">Sign Up</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default NavBar;
