import React from 'react'
import { useSelector } from 'react-redux'
import AdminStats from './AdminStats'
import { useGetAdminStatsQuery } from '../../../redux/features/stats/statsApi'
import Loading from '../../../components/Loading'
import AdminStatsChart from './AdminStatsChart'

function AdminDashMain() {

    //* auth -> ja name authSlice store same kola hoyca
    //* user -> authSlice moda object name
    const { user } = useSelector((state) => state.auth)

    //* useGetAdminStatsQuery -> statsApi.js thakay import 
    //* query tai {}
    const { data, isLoading } = useGetAdminStatsQuery()

    if (isLoading) {
        return <Loading />
    }

    if (!data) {
        return <div>No Admin stats available</div>
    }


    const { totalEarnings, totalOrders, totalProduct, totalReviews, totalUsers , monthlyEarnings} = data.data || {}


    return (
        <div className='p-6'>
            <div>
                <h1 className='text-2xl font-medium md-4'>Admin DashBoard</h1>
                <p className='text-gray-500'>Hi, {user?.username} Welcome to your user dashboard</p>
            </div>

            {/* AdminStats */}
            <AdminStats
                totalEarnings={totalEarnings}
                totalOrders={totalOrders}
                totalProduct={totalProduct}
                totalReviews={totalReviews}
                totalUsers={totalUsers}
            />

            {/* Admin Stats Chart */}
            <AdminStatsChart
                totalEarnings={totalEarnings}
                totalOrders={totalOrders}
                totalProduct={totalProduct}
                totalReviews={totalReviews}
                totalUsers={totalUsers}
                monthlyEarnings={monthlyEarnings}
            />
        </div>

    )
}

export default AdminDashMain
