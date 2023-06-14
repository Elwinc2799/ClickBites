import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AddReviewForm from '@/components/BusinessDetails/AddReviewForm';
import { UseLoginStatus } from '@/components/utils/UseLoginStatus';

interface ReviewFormButtonProps {
    businessId: string;
}

export default function ReviewFormButton({
    businessId,
}: ReviewFormButtonProps) {
    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(true);
    };

    return (
        <>
            <button
                className="btn bg-blue-500 hover:bg-blue-700 text-white mx-4 btn-circle"
                onClick={handleClick}
                disabled={!UseLoginStatus()}>
                <FontAwesomeIcon icon={faPlus} />
            </button>

            {showForm && (
                <AddReviewForm
                    businessId={businessId}
                    setShowForm={setShowForm}
                />
            )}
        </>
    );
}
