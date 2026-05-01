// import React, { useState } from 'react'
import OrderCount from './OrderCount'

function ViewsOrders({ handelViewsOrdersClose, order }) {

    let Id = '';

   for (let i = 0; i < order.products.length; i++) {
      Id = order.products[i].productId;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 ">
            <div className="bg-sky-50 p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className='text-sky-500 font-medium text-2xl text-center my-5'>Order Views</h2>
                <div className="">
                    <h3 className="text-xl ">Order Id: {order.orderId || ""}</h3>
                    <p className="text-xl my-2 ">
                        Email: {order.email}
                    </p>
                    <p className="text-gray-700 my-2 text-xl ">status: <span className='text-red-600/60'>{order.status}</span></p>

                    <p className='capitalize'><strong>Orders Amount: $</strong><span className='text-sky-500/50 font-bold'> {order.amount}</span></p>
                    <p className='capitalize'><strong>Create Date:</strong> <span>{new Date(order?.updatedAt).toLocaleDateString()}</span></p>
                    <p className='capitalize'><strong>Orders Quantity: </strong>
                        <span>
                            <OrderCount p={order.products} />
                        </span>
                    </p>
                    <p className='capitalize'><strong>Order Product Id: </strong>
                        <span>{Id}</span>
                    </p>
                </div>
                <button onClick={handelViewsOrdersClose} className='bg-red-500 hover:bg-red-600 px-2 py-1 text-white rounded-md mt-5'>Cancel</button>
            </div>
        </div>
    )
}

export default ViewsOrders
