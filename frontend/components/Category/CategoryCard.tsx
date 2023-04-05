import Image from 'next/image';
import React from 'react';
import { UseLoginStatus } from '../utils/UseLoginStatus';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

interface Props {
    categoryImg: any;
    categoryName: string;
}

const CategoryCard = ({ categoryImg, categoryName }: Props) => {
    const router = useRouter();

    const handleClick = () => {
        if (!UseLoginStatus()) {
            toast('Please log in first', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'error',
                position: 'bottom-right',
            });
            setTimeout(() => {
                router.push('/login');
            }, 2100);
        } else {
            const search_query = categoryName;
            router.push({
                pathname: '/results',
                query: { search_query },
            });
        }
    };

    return (
        <button className="relative m-2" onClick={handleClick}>
            <Image
                src={categoryImg}
                alt="/"
                width="0"
                height="0"
                sizes="100vw"
                className="object-cover w-full h-96 rounded-lg"
            />
            <div className="flex justify-center w-full rounded-lg h-full items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-black/50 group">
                <p className="text-gray-300 text-3xl hidden group-hover:block">
                    {categoryName}
                </p>
            </div>
        </button>
    );
};

export default CategoryCard;
