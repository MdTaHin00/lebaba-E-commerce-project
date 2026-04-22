import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { get_Base_url } from '../../../utils/getBase_url'
import Loading from '../../../components/Loading'
import TimeLineStep from './TimeLineStep'

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

function PaymentSuccess() {

  const isCompleted = (status)=>{
    const statues = ["pending", "processing", "shipped", "completed"];
    return statues.indexOf(status) > statues.indexOf(order.status)
  }

  const isCurrent = (status) => order.status === status


  const [order, setOrder] = useState(null)
  const[loading,setLoading] = useState(true)
  useEffect(() => {
    //* session id aca ki na check
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id")

    if (sessionId) {
      const confirmPayment = async () => {
        const response = await axios.post(`${get_Base_url()}/api/orders/confirm-payment`, {
          session_id: sessionId
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        if(response?.data){
           setLoading(false)
          setOrder(response?.data.data)
        }
      }
      confirmPayment()
    }
  }, [])

   if(loading) return <Loading/>

  return (
    <div className='section__container rounded p-6'>
     <h2 className='text-2xl font-semibold mb-4'>Payment {order?.status}</h2>
     <p className='mb-2'>Order Id: {order?.orderId}</p>
     <p className='mb-2'>Status: {order?.status}</p>
      <ol>
        {
          steps.map((step,index) => (
            <TimeLineStep
             key={index}
             step={step}
             order={order}
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

export default PaymentSuccess
