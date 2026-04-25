import React from 'react'
import { useSelector } from 'react-redux'
import { useGetOrdersByEmailQuery } from '../../../redux/features/orders/orderApi';
import Loading from '../../../components/Loading';
// import { useNavigate } from 'react-router';

function UserPayments() {

    //* authApi thaka import 
    const { user } = useSelector((state) => state.auth)



    //* useGetUserStatsQuery ata akta email received kordoo tai user ar moda email
    //* useGetUserStatsQuery ata query method tai  {}
    const { data, isLoading } = useGetOrdersByEmailQuery(user?.email)

    // if (!data) {
    //     alert("Please order from the shop");
    //     navigate("/shop")
    // }

    if (isLoading) {
        return <Loading />
    }



    const orders = data.data || {};

    //* reduce -> array data jok kola
    const totalPayment = orders.reduce((acc, order) => acc + order.amount, 0).toFixed(2)


    return (
        <div className="py-6 px-4">
            <h3 className="text-xl font-semibold text-blueGray-700 mb-4">Total Payments</h3>
            <div className="bg-white p-8 shadow-lg rounded">
                <p className="text-lg font-medium text-gray-800 mb-5">Total Spent: ${totalPayment ? totalPayment : 0}</p>
                <ul className='space-y-5'>

                    {
                        orders && orders.map((item, index) => (
                            <li key={index} className='space-y-2'>
                                <h5 className="font-medium text-gray-800 mb-2">Order: {index + 1}</h5>
                                <div key={index} className="space-y-2">
                                    <p className="text-gray-600">Order Id: {item._id}</p>
                                    <p className="text-gray-600">Price: ${item?.amount}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600 ">Date: {new Date(item.createdAt).toLocaleString()}</span>
                                    <p className="text-gray-600 mt-2">Status:
                                        <span className={`ml-2 py-[2px] px-2 text-sm rounded ${item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                            item.status === 'pending' ? 'bg-red-200 text-red-700' :
                                                item.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-blue-200 text-blue-700'}`}>
                                            {item.status}
                                        </span>
                                    </p>
                                </div>
                                <hr className="my-2" />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default UserPayments
