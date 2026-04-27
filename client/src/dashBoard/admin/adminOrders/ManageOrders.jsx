import React, { useState } from 'react'
import { useDeleteOrderByIdMutation, useGetAllOrdersQuery } from '../../../redux/features/orders/orderApi';
import Loading from '../../../components/Loading';
import { Link } from 'react-router';
import EditOrders from './EditOrders';
import SingleProducts from '../../../page/shop/productDetails/SingleProducts';


const getStatusColor = (status) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-500';
        case 'processing':
            return 'bg-blue-500';
        case 'shipped':
            return 'bg-green-500';
        case 'completed':
            return 'bg-gray-500';
        default:
            return 'bg-gray-300';
    }
}

function ManageOrders() {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [selectedOrders, setSelectedOrders] = useState(null)

    //? useGetOrdersByIdQuery -> orderApi.js thakay import 
    //* useGetOrdersByIdQuery  query method tai {}
    const { data, isLoading, refetch } = useGetAllOrdersQuery()

    //? useDeleteOrderByIdMutation -> orderApi.js thakay import 
    //* deleteOrderById ->  useDeleteOrderByIdMutation ai mutation function name
    //* mutation tai -> []
    const [deleteOrderById] = useDeleteOrderByIdMutation()

    if (isLoading) {
        return <Loading />
    }

    const orders = data.data || {}

    //! delete order by id
    const handelDeleteClick = async (orderId) => {
        await deleteOrderById(orderId).unwrap();
        alert(`Delete order ${orderId}`)
        refetch()
    }


    //! edit orders 
    const handelEditOrder = (order) => {
        setSelectedOrders(order)
        setIsModelOpen(true)
    }

  const handelCloseModel = async () => {
    setIsModelOpen(false)
    setSelectedOrders(null)
  }

    return (
        <section className="section__container p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Orders</h2>

            {/* Orders Table */}
            <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="py-3 px-4 border-b">Order ID</th>
                        <th className="py-3 px-4 border-b">Customer</th>
                        <th className="py-3 px-4 border-b">Status</th>
                        <th className="py-3 px-4 border-b">Date</th>
                        <th className="py-3 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td className="py-3 px-4 border-b">{order.orderId}</td>
                            <td className="py-3 px-4 border-b">{order?.email}</td>
                            <td className="py-3 px-4 border-b">
                                <span className={`inline-block px-3 text-xs py-1 text-white rounded-full ${getStatusColor(order.status)}`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="py-3 px-4 border-b">{new Date(order?.updatedAt).toLocaleDateString()}</td>
                            <td className="py-3 px-4   border-b flex items-center space-x-4">
                                <Link
                                    to={order?._id}
                                    className="text-blue-500 hover:underline"
                                >
                                    View
                                </Link>
                                <button
                                    onClick={() => handelEditOrder(order)}
                                    className="text-green-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handelDeleteClick(order?._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit order */}

            {
                isModelOpen && (
                    <EditOrders
                    handelCloseModel={handelCloseModel}
                    order={selectedOrders}
                    refetch={refetch}
                />

                )
            }



        </section>
    )
}

export default ManageOrders
