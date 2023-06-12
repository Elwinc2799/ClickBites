import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';

interface Business {
    _id?: string;
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    latitude?: number;
    longitude?: number;
    categories?: string;
    description?: string;
    business_pic?: string;
}

function UpdateUserModal(business: Business) {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [categories, setCategories] = useState('');
    const [description, setDescription] = useState('');
    const [businessPic, setBusinessPic] = useState<File | null>(null);
    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData();

            formData.append(
                'business',
                JSON.stringify({
                    name: name || business.name,
                    address: address || business.address,
                    city: city || business.city,
                    state: state || business.state,
                    categories: categories || business.categories,
                    description: description || business.description,
                })
            );

            if (businessPic) {
                formData.append(
                    'business_pic',
                    businessPic || business.business_pic
                );
            }

            console.log(formData);

            const response = await axios.put(
                process.env.API_URL + '/api/business/' + business._id,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    withCredentials: true,
                }
            );

            // Display success message
            if (response.status === 200) {
                toast('Business information updated succesfully', {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'success',
                    position: 'bottom-right',
                });
            }

            // Clear input boxes
            setName('');
            setAddress('');
            setCity('');
            setState('');
            setCategories('');
            setDescription('');
            setBusinessPic(null);

            setTimeout(() => {
                router.reload();
            }, 2100);
        } catch (error: any) {
            if (error.response) {
                const responseData = error.response.data;
                toast(responseData.message, {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'error',
                    position: 'bottom-right',
                });
            } else {
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
            <button className="" onClick={openModal}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mr-2 -ml-1 dark:text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
            </button>
            {modalVisible && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal modal-open">
                        <form className="modal-box p-5" onSubmit={handleSubmit}>
                            <h3 className="font-bold text-lg mb-7">
                                Edit Business
                            </h3>

                            <div className="relative mb-5">
                                <div className="flex justify-center">
                                    <Image
                                        alt="Business picture"
                                        src={
                                            business.business_pic
                                                ? `${business.business_pic}`
                                                : '/images/blank-businesspic.jpg'
                                        }
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-96 h-56 object-cover rounded-md border-none shadow-xl"
                                    />
                                </div>
                                <label className="absolute right-14 bottom-2 border border-gray-500 bg-gray-100 text-gray-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                                    <input
                                        className="hidden"
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            if (
                                                event.target.files &&
                                                event.target.files[0]
                                            ) {
                                                setBusinessPic(
                                                    event.target.files[0]
                                                );
                                            }
                                        }}
                                    />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 13a4 4 0 01-4-4V7a4 4 0 014-4v6zm-4 0a4 4 0 004 4v6a4 4 0 01-4-4v-6zm8 0a4 4 0 01-4 4v6a4 4 0 004-4v-6z"></path>
                                    </svg>
                                </label>
                            </div>
                            <input
                                className="input input-bordered w-full mb-5"
                                type="text"
                                placeholder={business.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className="input input-bordered w-full mb-5"
                                type="text"
                                placeholder={business.address}
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <div className="flex flex-row justify-between items-center">
                                <input
                                    className="input input-bordered w-full mb-5 mr-5"
                                    type="text"
                                    placeholder={business.city}
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                                <input
                                    className="input input-bordered w-full mb-5"
                                    type="text"
                                    placeholder={business.state}
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>

                            <input
                                className="input input-bordered w-full mb-5"
                                type="text"
                                placeholder={business.categories}
                                value={categories}
                                onChange={(e) => setCategories(e.target.value)}
                            />

                            <textarea
                                name="text"
                                id="text"
                                placeholder="Write your description here..."
                                onChange={(e) => setDescription(e.target.value)}
                                className="textarea textarea-bordered w-full mb-5 h-44"
                            />

                            <div className="modal-action justify-between">
                                <button
                                    type="button"
                                    className="btn bg-blue-200 hover:bg-blue-300 text-white rounded-md border-none"
                                    onClick={closeModal}>
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-blue-500 hover:bg-blue-700 text-white rounded-md border-none">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default UpdateUserModal;


