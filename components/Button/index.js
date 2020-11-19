import React from 'react'

const Button = ({ children }) => {
  return (
    <button className='inline-flex justify-center items-center px-2 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-laure-600 hover:bg-laure-500 focus:outline-none focus:laure-indigo-700 focus:shadow-outline-indigo active:bg-laure-700 transition ease-in-out duration-150'>
      {children}
    </button>
  )
}
export default Button
