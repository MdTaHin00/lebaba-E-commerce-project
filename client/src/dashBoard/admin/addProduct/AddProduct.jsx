import React, { useState } from 'react'
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import ImageUpload from './ImageUpload';
import { useSelector } from 'react-redux'
import { useAddProductMutation } from '../../../redux/features/products/productApi';

const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
]

const colors = [
  { label: 'Select Color', value: '' },
  { label: 'Black', value: 'black' },
  { label: 'Red', value: 'red' },
  { label: 'Gold', value: 'gold' },
  { label: 'Blue', value: 'blue' },
  { label: 'Silver', value: 'silver' },
  { label: 'Beige', value: 'beige' },
  { label: 'Green', value: 'green' }
];

function AddProduct() {

  const [message, setMessage] = useState("")


  //! authApi.js import
  const { user } = useSelector((state) => state.auth)

  //! useAddProductMutation -> products folder productApi.js file thaka import
  //* addProduct -> useAddProductMutation atar function
  //* mutation tai []
  const [addProduct] = useAddProductMutation()

  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    color: ''
  })

  const [image, setImage] = useState("")

  const handelChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    })
  }

  const handelSubmit = async (e) => {
    e.preventDefault()

    if (!product.name || !product.category || !product.color || !product.price || !product.category) {
      setMessage("Please fill in all fields")
      return
    }

    try {
      await addProduct({ ...product, image, author: user?._id }).unwrap()
      alert('Product added successfully')
      setProduct({
        name: '',
        category: '',
        description: '',
        price: '',
        color: ''
      })
      setImage("")
    } catch (error) {
      console.log(error);

    }

  }

  return (
    <div className='container mx-auto mt-8'>
      <h2 className='text-2xl font-medium'>Add Product</h2>
      <form onSubmit={handelSubmit} className='space-y-4 mt-5'>

        <TextInput
          label="Product Name"
          name="name"
          placeholder="Enter Product Name"
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

        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handelChange}
          options={colors}
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
        <ImageUpload
          name="image"
          id="image"
          value={e => setImage(e.target.value)}
          placeholder="Upload Image"
          setImage={setImage}
        />

        {/* description */}

        <div>
          <label htmlFor="" className='block text-sm font-medium text-gray-600'>Description</label>
          <textarea
            rows='5'
            name="description"
            id="description"
            value={product.description}
            onChange={handelChange}
            className='add-product-InputCSS'
            placeholder='Enter Description'
          />
        </div>


        {/* submit button */}
        {
          message && <p className='text-center text-red-500 bg-red-500/10'>{message}</p>
        }
        <button type='submit' className=' mt-5 text-white bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-md'>Add Product</button>

      </form>
    </div>
  )
}

export default AddProduct
