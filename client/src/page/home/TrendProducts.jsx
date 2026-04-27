import React, { useState } from 'react'
import ProductCards from '../shop/ProductCards'
//! json data import  
import products from '../../data/products.json'


function TrendProducts() {

    const [visibleProducts, setVisibleProducts] = useState(8)
  

    const handelMoreProduct = ()=>{
        setVisibleProducts((pre)=> pre + 4)
    }

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>Trending Products</h2>
            <p className='section__subheader'>
                Discover the Hottest Picks: Elevate Your Style with Our Curated
                Collection of Trending Women's Fashion Products.
            </p>

            {/* Products Card */}
            <div>
                <ProductCards filterProducts={products.slice(0,visibleProducts)} />
            </div>

            {/* show all products btn */}
             <div className='text-center'>
                {
                    visibleProducts < products.length && 
                    <button onClick={handelMoreProduct}className='bg-[#ed3849] text-white w-25 h-10 rounded-xl hover:bg-red-500'>Load More</button>
                }
             </div>
        </section>
    )
}

export default TrendProducts
