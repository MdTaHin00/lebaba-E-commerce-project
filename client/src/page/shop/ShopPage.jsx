import React, { useState } from 'react'
import { useFetchAllProductQuery } from '../../redux/features/products/productApi'
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import Loading from '../../components/Loading';

function ShopPage() {

  const filter = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
    priceRanges: [
      { label: "Under $50", min: 0, max: 50 },
      { label: "$50 - $100", min: 50, max: 100 },
      { label: "$100 - $200", min: 100, max: 200 },
      { label: "$200  and above ", min: 200, max: Infinity },
    ]
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [productPerPage] = useState(8)


  //* select opstay ki thakva filter ar
  const [filterState, setFilterState] = useState({
    category: 'all',
    color: 'all',
    priceRange: ''
  })

    //* operl value diaxeral 
  const { category, color, priceRange} = filterState;
  //* - base kola map lora and value number make kola
  const [minPrice, maxPrice] = priceRange.split('-').map(Number)


  //* redux query methed tai ({})
  //? backend data patanno hoyca frontend thayka
  const { data = {}, isLoading } = useFetchAllProductQuery({
    category: category !== 'all' ? category : '',
    color: color !== 'all' ? color : '',
    minPrice: isNaN(minPrice) ? '' : minPrice,
    maxPrice: isNaN(maxPrice) ? '' : maxPrice,
    page: currentPage,
    limit: productPerPage
  })

  console.log(data);
  
  //! page change function 
  const handelPageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      setCurrentPage(pageNumber)
    }
  }

  if (isLoading) return <div><Loading/></div>

  //*  product,totalProduct,totalPage -> ai name backend thaka ja name dece sai name hova
  const {product, totalProduct, totalPage } = data.data || {};
  
  

  const startProduct = (currentPage - 1) * productPerPage + 1
  const endProduct = startProduct + product.length - 1;

  //! clean filter 
  const cleanFilter = () => {
    setFilterState({
      category: 'all',
      color: 'all',
      priceRange: ''
    })
  }

  return (
    <div>
      <div className='section__container bg-primary '>
        <h2 className='section__header'>Shop Page</h2>
        <p className='section__subheader'>Discover the Hottest Picks: Elevate Your Style with Our Curated Collection of Trending Women's Fashion Products.</p>
      </div>

      <div className='section__container'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          {/* categories */}
          <ShopFiltering
            filter={filter}
            filterState={filterState}
            setFilterState={setFilterState}
            cleanFilter={cleanFilter}
          />
          <div>
            <h2>Showing {startProduct} to {endProduct} of {totalProduct} products</h2>
            <ProductCards filterProducts={product} />

            {/* pagination */}
            {product.length >0 &&   <div className='mt-6 flex justify-center space-x-2'>
              <button className='px-4 py-2 bg-gray-200 rounded-full'
                onClick={() => handelPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >Pervious</button>
              {
                //! totalPage ka array ta convet korce
                [...Array(totalPage)].map((_, index) => (
                  <button key={index} onClick={() => handelPageChange(index + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-sky-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    {index + 1}
                  </button>
                ))
              }
              <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md'
                onClick={() => handelPageChange(currentPage + 1)}
                disabled={currentPage === totalPage}
              >Next</button>
            </div>}


          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
