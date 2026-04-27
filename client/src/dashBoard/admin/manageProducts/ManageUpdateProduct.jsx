import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../redux/features/products/productApi'
import Loading from '../../../components/Loading'
import TextInput from '../addProduct/TextInput'
import SelectInput from '../addProduct/SelectInput'
import ImageUpload from '../addProduct/ImageUpload'



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
function ManageUpdateProduct() {

  const navigate = useNavigate();
  const { id } = useParams()

  //! authSlice.js thakay import 
  const {user} = useSelector((stats) => stats.auth)

  //! productApi.js thaka import 
  //* query tai {}
  const { data, isLoading , refetch} = useFetchProductByIdQuery(id)

  //* mutation
  const [updateProduct] = useUpdateProductMutation()



  const [product, setProduct] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    color: '',
    image: ''
  })

  const [newImage, setNewImage] = useState(null)



  const productData = data?.data?.product || {}

  const { name, category, color, description, image: imageUrl, price } = productData ;


  useEffect(()=>{
     if (data?.data?.product ) {
            setProduct({
                name: name ||'',
                category: category ||'',
                description: description ||'',
                price: price ||'',
                color: color ||'',
                image: imageUrl || ''
            })
        }
  },[])
  

  if (isLoading) {
    return <Loading />
  }

  const handelChange =(e)=>{
    const{name,value} = e.target ;
    setProduct({
      ...product,
      [name]:value
    })
  }

  const handleImageChange =()=>{
    
  }


  const handleSubmit= async(e)=>{
     e.preventDefault();
    const updateProductData={
      ...product,
      image: newImage ? newImage : product.image,
      author: user?._id 
    }

    try {
      await updateProduct({id:id ,...updateProductData}).unwrap();
      alert('Product updated successfully')
      await refetch()
      navigate("/dashboard/manage-products")
    } catch (error) {
       console.log("Failed to update product",error);
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* product name */}
        <TextInput
          label="Product Name"
          name="name"
          placeholder="Ex: Diamond Earrings"
          value={product.name}
          onChange={handelChange}
        />

        {/* category */}
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handelChange}
          options={categories}
        />

        {/* color */}
        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handelChange}
          options={colors}
        />

        {/* price */}
        <TextInput
          label="Price"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handelChange}
        />

        {/* image upload */}
        <ImageUpload
          name="image"
          id="image"
          value={newImage || product.image}
          setImage={handleImageChange}
          placeholder='Upload a product image'
        />

        {/* description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={6}
            name="description"
            id="description"
            value={product.description}
            placeholder='Write a product description'
            onChange={handelChange}
            className="add-product-InputCSS"
          />
        </div>

        <div>
          <button
            type="submit"
            className="add-product-btn"

          >
            Update
          </button>
        </div>
      </form>

    </div>
  )

}

export default ManageUpdateProduct
