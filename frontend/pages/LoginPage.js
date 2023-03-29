import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <Layout title="Login">
            <form className="mx-auto max-w-screen-md" action="">
                <h1 className="mb-4 text-xl">Login</h1>

                <div className="mb-4">
                    <label
                        className="block mb-2 text-sm font-bold text-gray-700"
                        htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        autoFocus
                        required
                    />
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
                        type="password"
                        placeholder="Password"
                        autoFocus
                        required
                    />
                </div>

                <div className="mb-4">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="submit">
                        Login
                    </button>
                </div>

                <div className="mb-4 text-sm">
                    <Link
                        className="text-blue-500 hover:text-blue-700"
                        href="/forgot-password">
                        Forgot Password?
                    </Link>
                </div>

                <div className="mb-4 text-sm">
                    Don't have an account?{' '}
                    <Link
                        className="text-blue-500 hover:text-blue-700"
                        href="/register">
                        Register
                    </Link>
                </div>
            </form>
        </Layout>
    );
}
