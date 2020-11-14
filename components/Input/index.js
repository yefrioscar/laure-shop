import React from 'react'
import { Field, useField } from 'formik'

const InputForm = ({ label, name, type = 'text', ...props }) => {
  const [field, meta, helpers] = useField(name)

  return (

        <div className='flex flex-cols space-y-2'>
          <input
            className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-laure'
            {...field}
            {...props}
            type={type}
          />
          {meta.touched && meta.error ? <div className='p-4'>{meta.error}</div> : ''}
        </div>
  )
}

export { InputForm }
