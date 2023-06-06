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

const AddReviewForm = ({ businessId, setShowForm }: Props) => {
    const router = useRouter();

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
            setReview((prevState) => ({
                ...prevState,
                user_id: userId,
                date: new Date().toISOString().slice(0, 19).replace('T', ' '),
            }));
        };

        addUserIdDate();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // post review to database
        const response = await axios.post(
            process.env.API_URL + '/api/business/' + businessId,
            review,
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

                    <input
                        type="number"
                        name="stars"
                        id="stars"
                        min="1"
                        max="5"
                        value={review.stars}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full mb-5"
                    />
                    <label htmlFor="text" className="block font-medium mb-1">
                        Review
                    </label>
                    <input
                        name="text"
                        id="text"
                        placeholder='Write your review here...'
                        value={review.text}
                        onChange={handleChange}
                        required
                        className="input w-full input-bordered mb-5 "
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
