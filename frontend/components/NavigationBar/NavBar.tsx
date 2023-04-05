import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { UseLoginStatus } from '@/components/utils/UseLoginStatus';

interface Props {
    isLanding: boolean;
}

function NavBar(props: Props) {
    const [color, setColor] = useState('transparent');
    const [textColor, setTextColor] = useState('white');
    const [borderColor, setBorderColor] = useState('transparent');
    const router = useRouter();

    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (props.isLanding) {
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
            setBorderColor('#e2e8f0')      
        }
    }, [props.isLanding]);

    useEffect(() => {
        if (UseLoginStatus()) {
            setStatus(true);
        } else {
            setStatus(false);
        }
    }, [status]);

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

                {status ? (
                    <ul
                        style={{ color: `${textColor}` }}
                        className="flex flex-row">
                        <li className="p-4">
                            <Link href="/profile">Profile</Link>
                        </li>
                        <li className="p-4">
                            <button
                                onClick={() => {
                                    deleteCookie('token');

                                    toast('Log Out succesfully', {
                                        hideProgressBar: true,
                                        autoClose: 2000,
                                        type: 'success',
                                        position: 'bottom-right',
                                    });

                                    setTimeout(() => {
                                        setStatus(!status);
                                        router.push('/');
                                    }, 2100);
                                }}>
                                Log Out
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul
                        style={{ color: `${textColor}` }}
                        className="flex flex-row">
                        <li className="p-4">
                            <Link href="/login">Log In</Link>
                        </li>
                        <li className="p-4">
                            <Link href="/signup">Sign Up</Link>
                        </li>
                    </ul>
                )}
            </div>
            <hr className="border-1 w-full"  style={{ borderBlockColor: `${borderColor}` }}/>
        </div>
    );
}

export default NavBar;
