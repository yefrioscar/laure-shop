import React from 'react'

const Header = () => {
  return (
    <ul className='flex justify-between items-center'>
      <li className='mr-3'>
        <svg
          className='h-8 w-8 fill-current text-laure'
          viewBox='0 0 70.157 90.706'
        >
          <path
            data-name='Path 722'
            d='M0 .306s5.141 23.743 5.875 46.342A248.776 248.776 0 012.94 90.706h64.941s7.017-13.79-3.59-17.624-30.431 9.384-38.834 2.285 2.448-41.282-3.917-60.047S0 .306 0 .306z'
          />
        </svg>
      </li>
      <li className='mr-3'>
        <svg
          className='h-6 w-6 fill-current text-gray-600'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={2}
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <circle cx={9} cy={21} r={1} />
          <circle cx={20} cy={21} r={1} />
          <path d='M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6' />
        </svg>
      </li>
    </ul>
  )
}

export default Header
