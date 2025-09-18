'use client'

import { useState } from 'react'
import CheckBox from './_components/CheckBox'
import { nestedCheckbox } from './_contants/data'

const NestedCheckBox = () => {
  const [checkData,setCheckedData]=useState([])
  return (
    <div>
      <CheckBox nestedCheckbox={nestedCheckbox} setCheckedData={setCheckedData} checkData={checkData}/>
    </div>
  )
}

export default NestedCheckBox