import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../redux/features/orders/orderApi'

function EditOrders({order,handelCloseModel,refetch}) {

    const [status,setStatus] = useState(order?.status)
    
    //?  useUpdateOrderStatusMutation -> orderApi.js thakay import
    //* updateOrderStatus -> useUpdateOrderStatusMutation ai function name
    //* mutation tai []
    const[updateOrderStatus] = useUpdateOrderStatusMutation()

     
    //! handel update orders
    const handelUpdateOrder = async()=>{
       try {
          await updateOrderStatus({id:order?._id, status:status}).unwrap()
          alert(`Order Update SuccessFully`)
          handelCloseModel()
          refetch()
       } catch (error) {
        console.log("Failed to update orders status",error);
       }
    } 
 

    return (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 ">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 p-2 rounded w-full"
                    >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={handelCloseModel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handelUpdateOrder}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                </div>
            </div>
        </div>
  )
}

export default EditOrders
