import clsx from 'clsx'
import React from 'react'

const Button = ({ children, size }) => {
  return (
    <button
      className={clsx(
        'inline-flex justify-center items-center border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-laure-600 hover:bg-laure-500 focus:outline-none focus:laure-indigo-700 focus:shadow-outline-indigo active:bg-laure-700 transition ease-in-out duration-150',
        {
          'text-xs': size === 'xs',
          'text-base px-2 py-1': size === '',
          'text-lg px-4 py-2': size === 'lg'
        }
      )}
    >
      {children}
    </button>
  )
}
export default Button
