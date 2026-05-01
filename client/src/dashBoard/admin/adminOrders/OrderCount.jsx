import React from 'react'

const OrderCount = ({p}) => {
    let sum = 0;

    for (let i = 0; i < p.length ; i++) {
        sum = sum + p[i].quantity;
    }
  return (
    <>
      {sum}
    </>
  )
}

export default OrderCount
