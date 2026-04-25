import React from 'react'

//! import react-chart-2
import { Pie, Line } from 'react-chartjs-2'

//! import chart.js
import 'chart.js/auto'

function AdminStatsChart({ totalOrders, totalProduct, totalReviews, totalUsers, monthlyEarnings }) {


    const pieData = {
        labels: ['Total Reviews', 'Total Products', 'Total Orders', 'Total Users'],
        datasets: [
            {
                label: 'Admin Stats',
                data: [totalReviews, totalProduct, totalOrders, totalUsers]
            }
        ],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
        ],
        borderColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
        ]

    }

    //! line chart moth data
    const data = new Array(12).fill(0)
    monthlyEarnings.forEach((entry) => {
        data[entry.month] = entry.earnings
    })

    const lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July",
            "August", "September", "October", "November", "December"],

      datasets:[
        {
            label:'Monthly Earnings',
            data:data,
            fill:false,
            backgroundColor:'#36A2EB',
            borderColor:'#36A2EB',
            tension:0.1

        }
      ]

    }


    const options = {
        responsive: true,
        maintainAspectRatio: false
    }

    return (
        <div className='mt-10 space-y-7'>
            <h2 className='text-xl font-medium mb-5'>Admin Stats OverViews</h2>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                {/* pie chart */}
                <div className='max-h-96 md:h-96 w-full'>
                    <Pie data={pieData} options={options} />
                </div>

                {/* line chart */}
                <div  className='max-h-96 md:h-96 w-full'>
                    <Line data={lineData} options={options}/>
                </div>
            </div>
        </div>
    )
}

export default AdminStatsChart
