import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { get_Base_url } from '../../../utils/getBase_url'

function ImageUpload({ name, setImage }) {

  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result)
      };

      fileReader.onerror = (error) => {
        reject(error)
      }

    })
  };

  const uploadSingleImage = async (base64) => {
    setLoading(true)

    try {
      await axios.post(`${get_Base_url()}/image-upload/uploadImage`, { image: base64 })
        .then((res) => {
          const imageUrl = res.data;
          setUrl(imageUrl);
          console.log("Image URL:", res.data);
          alert("Uploaded image successfully!")
          setImage(imageUrl);
        }).then(() => setLoading(false))

    } catch (error) {
      console.error("Failed to upload image", error);
      setLoading(false);
      alert("Failed to upload image, please try again!")
    }

  }


  const uploadImage = async (event) => {
    const files = event.target.files;
    console.log("Files:", files)
    if (files.length === 1) {
      const base64 = await convertBase64(files[0]); // result
      uploadSingleImage(base64);
      return;
    }

    const base64s = [];
    for (let i = 0; i < files.length; i++) {
      const base = await convertBase64(files[i]);
      base64s.push(base);
    }
  };


  return (
    <div>
      <label htmlFor={name} className='block text-sm font-medium text-gray-600'>Image Upload</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={uploadImage}
        className='add-product-InputCSS' />

      {
        loading && <div className='mt-2 text-sm text-blue-600'>
          <p>Uploading...</p>
        </div>
      }

      {
        url && (
          <div>
            <p>Image Upload successfully</p>
            <img src={url} alt="uploaded image" />
          </div>
        )
      }
    </div>
  )
}

export default ImageUpload
