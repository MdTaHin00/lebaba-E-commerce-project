import React from 'react'

function UserStats({totalPaymentResult,totalPurchasedProducts,totalReviews}) {
  return (
    <div className='my-4 grid md:grid-cols-2 gap-5 lg:grid-cols-3'>
        <div className='border border-gray-200 rounded-md hover:scale-105 transition-all cursor-pointer hover:border-red-300 p-3 space-y-1 duration-500'>
            <h2 className='font-medium '>Total Payment</h2>
             <h4 className='font-medium italic'>${totalPaymentResult}</h4>
        </div>
        <div className='border border-gray-200 rounded-md hover:scale-105 transition-all cursor-pointer hover:border-red-300 p-3 space-y-1 duration-500'>
            <h2 className='font-medium '>Total Reviews</h2>
             <h4 className='font-medium italic'>{totalReviews}</h4>
        </div>
        <div className='border border-gray-200 rounded-md hover:scale-105 transition-all cursor-pointer hover:border-red-300 p-3 space-y-1 duration-500'>
            <h2 className='font-medium '>Total Purchased Products</h2>
             <h4 className='font-medium italic'>{totalPurchasedProducts}</h4>
        </div>
    </div>
  )
}

export default UserStats
