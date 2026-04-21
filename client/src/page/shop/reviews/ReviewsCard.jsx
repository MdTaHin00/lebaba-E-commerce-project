import React, { useState } from 'react'
import commentorImg from '../../../assets/avatar.png'
import RatingStars from '../../../components/RatingStars';
import PostAReview from './PostAReview';

function ReviewsCard({ review }) {

    const reviews = review || []

    const [isModalOpen,setIsModalOpen] = useState(false)

    const handelOpenReviewsModel=()=>{
        setIsModalOpen(true)
    }

    const handleCloseReviewModal=()=>{
        setIsModalOpen(false)
        
    }  

    return (
        <div className="my-6 bg-white p-8">
            <div>
                {
                    reviews.length > 0 ? (<div>
                        <h3 className="text-lg font-medium">All Comments...</h3>
                        <div>
                            {
                                reviews.map((review, index) => (
                                    <div key={index} className="mt-4">
                                        <div className="flex gap-4 items-center">
                                            <div ><img src={commentorImg} alt="" className="size-12" /></div>
                                            <div className="space-y-1">
                                                <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                                                    {review?.userId?.username}
                                                </p>
                                                <p className="text-[12px] italic">
                                                    {
                                                        new Date(review?.createdAt).toLocaleDateString()
                                                    }
                                                </p>
                                                <RatingStars rating={review?.rating} />
                                            </div>
                                        </div>

                                        {/* Comment details */}
                                        <div className="text-gray-600 mt-5 border p-8">
                                            <p className="md:w-4/5">{review?.comment}</p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                    </div>) : <p>No reviews yet.</p>
                }



            </div>

            {/* Add comment section */}
            <div className='mt-12'>
                <button
                       onClick={handelOpenReviewsModel}
                    className="px-6 py-3 bg-red-500 text-white rounded-md flex items-center gap-2"
                >
                    <i className="ri-pencil-line mr-2"></i> Add A Comment
                </button>
            </div>

            {/* post A reviews Modal*/}
             <PostAReview isModalOpen={isModalOpen} handleClose={handleCloseReviewModal}/>

        </div>
    )
}

export default ReviewsCard
