import React from 'react';
import CategoryCard from './CategoryCard';
import { Background } from '../Background/Background';

interface ResCategory {
    id: number;
    name: string;
    image: string;
}

// call from api
const categories: ResCategory[] = [
    {
        id: 0,
        name: 'Chinese',
        image: '/images/chinese.jpg',
    },
    {
        id: 1,
        name: 'Western',
        image: '/images/western.jpg',
    },
    {
        id: 2,
        name: 'Japanese',
        image: '/images/japanese.jpg',
    },
    {
        id: 3,
        name: 'Korean',
        image: '/images/korean.jpg',
    },
    {
        id: 4,
        name: 'Indian',
        image: '/images/indian.jpg',
    },
    {
        id: 5,
        name: 'Malay',
        image: '/images/malay.jpg',
    },
    {
        id: 6,
        name: 'Fast Food',
        image: '/images/fastfood.jpg',
    },
    {
        id: 7,
        name: 'Cafe',
        image: '/images/cafe.jpg',
    },
];

function Category() {
    return (
        <Background color="bg-gray-100">
            <div className="max-w-[1240px] mx-auto text-center py-12">
                <p className="text-4xl font-bold text-gray-800">Categories</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-4">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            categoryImg={category.image}
                            categoryName={category.name}
                        />
                    ))}
                </div>
            </div>
        </Background>
    );
}

export default Category;
