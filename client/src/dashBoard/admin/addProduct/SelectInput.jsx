import React from 'react'

function SelectInput({ label, name, value, onChange, options }) {
    return (
        <div>
            <label className='block text-sm font-medium text-gray-600'>{label}</label>

            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className='add-product-InputCSS'
            >
                {
                    options.map((option, index) => (
                        <option key={index} value={option.value}>{option.label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectInput
