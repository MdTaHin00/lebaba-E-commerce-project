import React, { useState } from 'react'
import TextInput from './TextInput';
import SelectInput from './SelectInput';


const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
]

function AddProduct() {

  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    color: ''
  })

  const handelChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handelSubmit = (e) => {
    e.preventDefault()
    console.log(product.name);
    console.log(product.category);

  }

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-medium'>Add Product</h2>
      <form onSubmit={handelSubmit} className='space-y-5 mt-5'>
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Dimond Earrings"
          value={product.name}
          onChange={handelChange}
          type="text"
        />

        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handelChange}
          options={categories}
        />

        <TextInput
          label="Price"
          name="price"
          placeholder="50"
          value={product.price}
          onChange={handelChange}
          type="number"
        />

        {/* image */}
        <div></div>

        {/* description */}

        <div>
          <label htmlFor=""  className='block text-sm font-medium text-gray-600'>Description</label>
          <textarea
            rows='5'
            name="Description"
            id="description"
            value={product.description}
            onChange={handelChange}
            className='add-product-InputCSS'
          />
        </div>


        {/* submit button */}
        <button type='submit' className=' mt-5 text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md'>Add Product</button>

      </form>
    </div>
  )
}

export default AddProduct
