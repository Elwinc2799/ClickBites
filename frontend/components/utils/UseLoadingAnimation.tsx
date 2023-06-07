import React from 'react';
import { Transition } from '@headlessui/react';

interface Props {
    isLoading: boolean;
}

function UseLoadingAnimation({ isLoading }: Props) {
    return (
        <Transition
            show={isLoading}
            enter="transition-opacity duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="flex justify-center items-center mt-20">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        </Transition>
    );
}

export default UseLoadingAnimation;
