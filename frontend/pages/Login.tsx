import React from 'react';
import { Background } from '@/components/Background/Background';
import NavBar from '@/components/NavigationBar/NavBar';
import Footer from '@/components/Layout/Footer';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { setCookie } from 'cookies-next';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + 60 * 60 * 1000); // 1 hour from now

        try {
            const response = await axios.post(
                process.env.API_URL + '/api/login',
                {
                    email: email,
                    password: password,
                }
            );
            setMessage(response.data.message);
            setCookie('token', response.data?.access_token, {
                expires: expiryDate,
                path: '/', // recommended to set the path to '/' to make the cookie accessible to all pages
                secure: true, // recommended for HTTPS connections
                sameSite: 'strict', // recommended to prevent cross-site request forgery (CSRF) attacks
            });

            // Clear input boxes
            setEmail('');
            setPassword('');
            toast('Log in succesfully', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
                position: 'bottom-right',
            });
            setTimeout(() => {
                router.push('/');
            }, 2100);
        } catch (error: any) {
            if (error.response) {
                const responseData = error.response.data;
                setMessage(responseData.message);
                toast(responseData.message, {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'error',
                    position: 'bottom-right',
                });
            } else {
                setMessage('An unknown error occurred');
                toast('An unknown error occured', {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'error',
                    position: 'bottom-right',
                });
            }
        }
    };

    return (
        <>
            <NavBar isLanding={false} />
            <Background color="bg-gray-100">
                <div className="flex justify-center items-center h-[754px]">
                    <div className="w-1/3">
                        <div className="flex justify-center items-center">
                            <h1 className="text-3xl font-bold text-gray-800">
                                Login
                            </h1>
                        </div>
                        <div className="flex justify-center items-center">
                            <form className="w-full" onSubmit={handleSubmit}>
                                <div className="flex flex-col my-4">
                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(event.target.value)
                                        }
                                        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                                    />
                                </div>
                                <div className="flex flex-col my-4">
                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(event.target.value)
                                        }
                                        className="border-2 border-gray-300 p-2 rounded-md focus:outline-none"
                                    />
                                </div>
                                {/* <div className="mt-4">{message}</div> */}
                                <div className="flex flex-row justify-end items-center">
                                    <button
                                        type="submit"
                                        className="btn rounded-md">
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Background>
            <Footer />
        </>
    );
}

export default Login;
