import React from 'react'

function ShopFiltering({ filter, filterState, setFilterState, cleanFilter }) {
    return (
        <div className='space-y-5 flex-shrink-0'>
            <h2 className='text-xl font-bold italic'>Filters</h2>
            {/* category */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg border-b border-gray-400'>Category</h4>
                {
                    filter.categories.map((category) => (
                        <label key={category} className='capitalize cursor-pointer'>
                            <input type="radio" name="category"
                                value={category}
                                checked={filterState.category === category}
                                onChange={(e) => setFilterState({ ...filterState, category: e.target.value })}
                            />
                            <span className='ml-3'>{category}</span>
                        </label>
                    ))
                }
            </div>

            {/* color */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg border-b border-gray-400'>Color</h4>
                {
                    filter.colors.map((color) => (
                        <label key={color} className='capitalize cursor-pointer'>
                            <input type="radio" name="color"
                                value={color}
                                checked={filterState.color === color}
                                onChange={(e) => setFilterState({ ...filterState, color: e.target.value })}
                            />
                            <span className='ml-3'>{color}</span>
                        </label>
                    ))
                }
            </div>

            {/* price ranges */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg border-b border-gray-400'>Price Range</h4>
                {
                    filter.priceRanges.map((range,index) => (
                        <label key={index} className='capitalize cursor-pointer'>
                            {/* //? filterState a priceRange a set kola tai name="priceRange" */}
                            <input type="radio" name="priceRange"
                                value={`${range.min}-${range.max}`}
                                checked={filterState.priceRange === `${range.min}-${range.max}`}
                                onChange={(e) => setFilterState({ ...filterState, priceRange: e.target.value })}
                            />
                            <span className='ml-3'>{range.label}</span>
                        </label>
                    ))
                }
            </div>

            {/*  clears all filtering */}
            <button onClick={cleanFilter} className='bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-white  '>Clear All Filters</button>

        </div>
    )
}

export default ShopFiltering
