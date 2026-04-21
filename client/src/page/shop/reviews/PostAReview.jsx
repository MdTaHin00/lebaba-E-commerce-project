import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router";
import { useSelector } from 'react-redux'
import { useFetchProductByIdQuery } from '../../../redux/features/products/productApi';
import { useAddReviewsMutation } from '../../../redux/features/reviews/reviewsApi';

function PostAReview({ isModalOpen, handleClose }) {
    const { id } = useParams()
    //* user -> token thaka user asva
    const { user } = useSelector((start) => start.auth)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    //* refetch -> aka neay code ka refetch kola update korva
    const { refetch } = useFetchProductByIdQuery(id, {
        skip: !id
    })

    const handelRating = (value) => {
        setRating(value)
    }

    //? reviews folder  ata mutation tai const[]
    const [addReviews] = useAddReviewsMutation()
    const navigate= useNavigate()

    const handelSubmit = async (e) => {
        e.preventDefault();
        //? backend ja ja patanno hova ta 
        const newReview = {
            comment: comment,
            rating: rating,
            userId: user?._id,
            productId: id
        }

        if(!user){
            alert("You must be logged in to post a review")
            navigate("/login")
            return ;
        }

        try {
             await addReviews(newReview).unwrap()
            alert("Reviews posted successfully")
            setRating(0)
            setComment('')
            refetch()
        } catch (error) {
            alert("Error posting reviews")
            console.log(error);
            
        }

        handleClose()

    }

    return (
        <div className={`fixed inset-0 ${isModalOpen ? "block" : 'hidden'} bg-black/90 flex items-center justify-center z-40 px-2`}>
            <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
                <h2 className="text-lg font-bold mb-4">Post a Review</h2>
                <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            onClick={() => handelRating(star)}
                            key={star}
                            className="cursor-pointer text-yellow-500 text-xl">
                            {rating >= star ? (
                                <i className="ri-star-fill"></i>
                            ) : (
                                <i className="ri-star-line"></i>
                            )}
                        </span>
                    ))}
                </div>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                    className="w-full border border-gray-300 p-2 rounded-md mb-4"
                    placeholder="Write your comment here..."
                />
                <div className="flex justify-end gap-2">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-300 rounded-md flex items-center gap-2"
                    >
                        <i className="ri-close-line"></i> Cancel
                    </button>
                    <button
                        onClick={handelSubmit}
                        className="px-4 py-2 bg-red-500 text-white rounded-md flex items-center gap-2">
                        <i className="ri-check-line"></i> Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PostAReview
