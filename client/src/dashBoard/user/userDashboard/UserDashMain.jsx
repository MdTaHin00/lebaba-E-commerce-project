import React from 'react'
import { useSelector } from 'react-redux'
import { useGetUserStatsQuery } from '../../../redux/features/stats/statsApi'
import Loading from '../../../components/Loading'
import UserStats from './UserStats'

//! react-chart-2 import 
import{Bar} from 'react-chartjs-2'

//! chart.js import 
//* ai vat chart.js thaka pai
 import {Chart,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from 'chart.js' 

 //? chart.js use korlar janno Chart.register
 Chart.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)

function UserDashMain() {

    //* authApi thaka import 
    const { user } = useSelector((state) => state.auth)

    //* useGetUserStatsQuery ata akta email received kordoo tai user ar moda email
    //* useGetUserStatsQuery ata query method tai  {}
    const {data,isLoading} = useGetUserStatsQuery(user?.email)

     if(isLoading) return <Loading/>

      //* data dexeral 
     const{totalPaymentResult,totalPurchasedProducts,totalReviews} = data?.data || {} ;


     //! create chart.js data
     const chartData ={
        labels:['Total Payments','Total Purchased Products','Total Reviews'],
        datasets:[
            {
                label:"User Stats",
                data:[totalPaymentResult,totalPurchasedProducts*20,totalReviews+50 ],
                backgroundColor:[
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor:[
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderWidth:1
            }
        ]
     }


    //! create chart options  
     const chartOption ={
        responsive:true,
        plugins:{
            legend:{
                position:'top'
            },
            tooltip:{
                callbacks:{
                    label: function(tooltipItem){
                        if(tooltipItem.labels === 'totalPaymentResult'){
                            return `totalPaymentResult: $${Number(tooltipItem.raw || 0).toFixed(2)}` ;
                        }
                        return`${tooltipItem.labels}:${tooltipItem.raw}`
                    }
                }
            }
        }
     }



    return (
        <div className='p-6'>
            <div>
                <h1 className='text-2xl s'>User Dashboard</h1>
                <p className='text-gray-500'>Hi, {user.username} ! Welcome to your user dashboard</p>
            </div>

            {/* User stats */}
            <UserStats totalPaymentResult={totalPaymentResult} totalPurchasedProducts={totalPurchasedProducts} totalReviews={totalReviews}/>

            {/* Bar -> react-char-2 thaka import kola hoyca */}
            <div>
                <Bar data={chartData} option={chartOption}/>
            </div>
        </div>
    )
}

export default UserDashMain
