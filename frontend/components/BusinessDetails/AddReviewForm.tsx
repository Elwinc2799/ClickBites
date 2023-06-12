import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface Review {
    user_id: string;
    business_id: string;
    stars: number;
    text: string;
    date: string;
}

interface Props {
    businessId: string;
    setShowForm: (showForm: boolean) => void;
}

function formatDateTime(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed in JS
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const AddReviewForm = ({ businessId, setShowForm }: Props) => {
    const router = useRouter();
    const [selectedStar, setSelectedStar] = useState<number>(1);

    const closeModal = () => {
        setShowForm(false);
    };

    const [review, setReview] = useState<Review>({
        user_id: '',
        business_id: businessId,
        stars: 0,
        text: '',
        date: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get<{ userId: string }>(
                process.env.API_URL + '/api/getUserId',
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`,
                    },
                    withCredentials: true,
                }
            );
            return res.data.userId;
        };

        const addUserIdDate = async () => {
            const userId = await fetchData();
            const dateInMalaysia = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Kuala_Lumpur',
            });
            const formattedDate = formatDateTime(new Date(dateInMalaysia));
            setReview((prevState) => ({
                ...prevState,
                user_id: userId,
                date: formattedDate,
            }));
        };

        addUserIdDate();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Add selectedStar to review
        const reviewWithStar = { ...review, stars: selectedStar };

        // post review to database
        const response = await axios.post(
            process.env.API_URL + '/api/business/' + businessId,
            reviewWithStar,
            {
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                },
                withCredentials: true,
            }
        );

        // close form
        setReview({
            user_id: '',
            business_id: businessId,
            stars: 0,
            text: '',
            date: '',
        });
        setShowForm(false);

        toast('Review added succesfully', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
            position: 'bottom-right',
        });

        setTimeout(() => {
            router.reload();
        }, 2100);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setReview((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal modal-open">
                <form className="modal-box p-5" onSubmit={handleSubmit}>
                    <h3 className="font-bold text-lg mb-7">Add a Review</h3>
                    <label htmlFor="stars" className="block font-medium mb-1">
                        Rating
                    </label>
                    <div className="rating rating-md w-full mb-5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <input
                                key={star}
                                type="radio"
                                name="rating-2"
                                className="mask mask-star-2 bg-orange-400 mr-1"
                                checked={selectedStar === star}
                                onChange={() => setSelectedStar(star)}
                            />
                        ))}
                    </div>

                    {/* <input
                        type="number"
                        name="stars"
                        id="stars"
                        min="1"
                        max="5"
                        value={review.stars}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full mb-5"
                    /> */}
                    <label htmlFor="text" className="block font-medium mb-1">
                        Review
                    </label>
                    <textarea
                        name="text"
                        id="text"
                        placeholder="Write your review here..."
                        value={review.text}
                        onChange={handleChange}
                        required
                        className="textarea textarea-bordered w-full mb-5 "
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
    );
};

export default AddReviewForm;
