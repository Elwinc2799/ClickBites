import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function SignUpPage() {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    // send POST request to /api/user/signup using fetch
    const submitHandler = async (data) => {
        console.log(data);
        const api_url = process.env.NEXT_PUBLIC_API_URL + '/api/user/signup';

        fetch(api_url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((res) => {
                console.log(res);
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });

        


        // const res = await fetch(api_url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // });

        // const json = await res.json();

        // if (!res.ok) throw Error(json.message);

        // console.log('Success:', json);
    };

    return (
        <Layout title="Sign Up">
            <form
                className="mx-auto max-w-screen-md"
                onSubmit={handleSubmit(submitHandler)}>
                <h1 className="mb-4 text-xl">Sign Up</h1>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="name"
                        autoFocus
                        {...register('name', {
                            required: 'Please enter name',
                        })}
                    />
                    {errors.name && (
                        <div className="text-red-500">
                            {errors.name.message}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        {...register('email', {
                            required: 'Please enter email',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter valid email',
                            },
                        })}
                    />
                    {errors.email && (
                        <div className="text-red-500">
                            {errors.email.message}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoFocus
                        {...register('password', {
                            required: 'Please enter password',
                            minLength: {
                                value: 6,
                                message: 'password is more than 5 chars',
                            },
                        })}
                    />
                    {errors.password && (
                        <div className="text-red-500 ">
                            {errors.password.message}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        autoFocus
                        {...register('confirmPassword', {
                            required: 'Please enter confirm password',
                            validate: (value) =>
                                value === getValues('password'),
                            minLength: {
                                value: 6,
                                message:
                                    'confirm password is more than 5 chars',
                            },
                        })}
                    />
                    {errors.confirmPassword && (
                        <div className="text-red-500 ">
                            {errors.confirmPassword.message}
                        </div>
                    )}
                    {errors.confirmPassword &&
                        errors.confirmPassword.type === 'validate' && (
                            <div className="text-red-500 ">
                                Password do not match
                            </div>
                        )}
                </div>

                <div className="mb-4">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </Layout>
    );
}
