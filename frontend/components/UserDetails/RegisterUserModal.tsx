import React, { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';

interface User {
    name: string;
    email: string;
    phone: string;
    address: string;
    state: string;
    profilePic: string;
}

function RegisterUserModal(user: User) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [profilePic, setProfilePic] = useState(user.profilePic || '');

    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: Handle the update operation here.
        closeModal();
    };

    const handleProfilePictureChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setProfilePic(reader.result as string);
            };

            reader.readAsDataURL(event.target.files[0]);
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
                                Edit Profile
                            </h3>

                            <div className="relative mb-5">
                                <div className="flex justify-center">
                                    <Image
                                        alt="Profile picture"
                                        src={
                                            profilePic
                                                ? `data:image/jpeg;base64,${profilePic}`
                                                : '/images/blank-profilepic.png'
                                        }
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-44 h-44 object-cover rounded-full border-none shadow-xl"
                                    />
                                </div>
                                <label className="absolute bottom-0 right-40 border border-gray-500 bg-gray-100 text-gray-500 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                                    <input
                                        className="hidden"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePictureChange}
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
                                placeholder="Name"
                                value={user.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                className="input input-bordered w-full mb-5"
                                type="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="input input-bordered w-full mb-5"
                                type="text"
                                placeholder="Phone"
                                value={user.phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <input
                                className="input input-bordered w-full mb-5"
                                type="text"
                                placeholder="Address"
                                value={user.address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <input
                                className="input input-bordered w-full mb-5"
                                type="text"
                                placeholder="State"
                                value={user.state}
                                onChange={(e) => setState(e.target.value)}
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

export default RegisterUserModal;
