import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ProductCards from '../shop/ProductCards';
//! json products import 
import products from '../../data/products.json'

function CategoryPage() {
   const {categoryName} = useParams()
    const[filterProducts,setFilterProducts] = useState([])


    useEffect(()=>{
        const filter = products.filter((product)=> product.category === categoryName.toLowerCase());
        setFilterProducts(filter)
    },[])



  return (
   <>
    <div className='section__container bg-primary-light'>
      <h2 className='section__header capitalize text-center '>{categoryName}</h2>
     <p className='section__subheader'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, repudiandae.</p>
    </div>

     {/* Products Card */}
     <div className='section__container'>
        <ProductCards filterProducts={filterProducts}/>
     </div>

   </>

  )
}

export default CategoryPage
