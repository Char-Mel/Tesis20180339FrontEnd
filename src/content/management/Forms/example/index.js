import React from 'react'
import { useState } from 'react'
import { MuiTelInput } from 'mui-tel-input'

const MyComponent = () => {
  const [value, setValue] = useState('')

  const handleChange = (newValue,info) => {
    console.log(info.countryCode)
    setValue(newValue) // boolean
  }

  return <MuiTelInput
    value={value}
    onChange={handleChange}
    continents={['SA','NA']}
  />
}

export default MyComponent;