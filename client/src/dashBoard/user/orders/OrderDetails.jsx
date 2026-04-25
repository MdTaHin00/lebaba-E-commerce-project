import React from 'react'
import { useParams } from 'react-router'
import { useGetOrdersByIdQuery } from '../../../redux/features/orders/orderApi';
import Loading from '../../../components/Loading';
import TimeLineStep from '../../../page/shop/payment/TimeLineStep';

const steps = [
  {
    status: 'pending',
    label: 'Pending',
    description: 'Your order has been created and is awaiting processing.',
    icon: { iconName: 'edit-2-line', bgColor: 'red-500', textColor: 'gray-800' },
  },
  {
    status: 'processing',
    label: 'Processing',
    description: 'Your order is currently being processed.',
    icon: { iconName: 'loader-line', bgColor: 'yellow-500', textColor: 'yellow-800' },
  },
  {
    status: 'shipped',
    label: 'Shipped',
    description: 'Your order has been shipped.',
    icon: { iconName: 'truck-line', bgColor: 'blue-800', textColor: 'blue-100' },
  },
  {
    status: 'completed',
    label: 'Completed',
    description: 'Your order has been successfully completed.',
    icon: { iconName: 'check-line', bgColor: 'green-800', textColor: 'white' },
  },
];



function OrderDetails() {

  const { orderId } = useParams()

  const { data, isLoading } = useGetOrdersByIdQuery(orderId)

  if (isLoading) {
    return <Loading />
  }

  const orders = data?.data || {}

  const isCompleted = (status) => {
    const statues = ["pending", "processing", "shipped", "completed"];
    return statues.indexOf(status) > statues.indexOf(orders.status)
  }

  const isCurrent = (status) => orders.status === status


  return (
    <div className='section__container rounded p-6'>
      <h2 className='text-3xl  mb-4 text-sky-300'>Payment {orders?.status}</h2>
      <p className='mb-2 xl font-medium'>Order Id: {orders?.orderId}</p>
      <p className='mb-2 xl font-medium'>Status: <span className=''>{orders?.status}</span></p>
      <ol>
        {
          steps.map((step, index) => (
            <TimeLineStep
              key={index}
              step={step}
              order={orders}
              isCompleted={isCompleted(step.status)}
              isCurrent={isCurrent(step.status)}
              isLastStep={index === step.length - 1}
              icon={step.icon}
              description={step.description}
            />
          ))
        }
      </ol>
    </div>
  )
}

export default OrderDetails
