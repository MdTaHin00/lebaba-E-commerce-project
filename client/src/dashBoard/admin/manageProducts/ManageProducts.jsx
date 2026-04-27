import React, { useState } from 'react'

function ManageProducts() {

  const[currentPage,setCurrentPage] = useState()
  const[productSparPage] =  useState(12)


    //* redux query methed tai ({})
  //? backend data patanno hoyca frontend thayka
  const { data = {}, isLoading } = useFetchAllProductQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productSparPage
  })


  return (
    <div>
       
    </div>
  )
}

export default ManageProducts