import React from 'react'

function TextInput({label,name,placeholder,value,onChange,type}) {
  return (
    <div>
       <label htmlFor={name}>{label}</label>
       <input 
       type={type} 
       name={name}
       placeholder={placeholder}
       value={value}
       onChange={onChange}
       className='add-product-InputCSS'
       />
    </div>
  )
}

export default TextInput
