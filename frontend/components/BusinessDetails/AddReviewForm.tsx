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
        }
        , 2100);
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        setReview((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div className="fixed bottom-0 right-0 z-50 p-4 bg-white border border-gray-300 rounded-tl-md shadow-lg">
            <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-medium mb-2">Add a Review</h3>
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
                    className="border border-gray-300 px-2 py-1 mb-4 w-full"
                />
                <label htmlFor="text" className="block font-medium mb-1">
                    Review
                </label>
                <textarea
                    name="text"
                    id="text"
                    value={review.text}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 px-2 py-1 mb-4 w-full"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200 ease-in-out">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddReviewForm;
