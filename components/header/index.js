import Link from 'next/link'
import React from 'react'
import { useBagState } from '../../context/CartContext'

const Header = ({ title }) => {
  const { list } = useBagState()

  return (
    <ul className='flex justify-between items-center'>
      <li>
        <Link href='/'>
          <svg
            className='h-8 w-8 fill-current text-laure cursor-pointer'
            viewBox='0 0 70.157 90.706'
          >
            <path
              data-name='Path 722'
              d='M0 .306s5.141 23.743 5.875 46.342A248.776 248.776 0 012.94 90.706h64.941s7.017-13.79-3.59-17.624-30.431 9.384-38.834 2.285 2.448-41.282-3.917-60.047S0 .306 0 .306z'
            />
          </svg>
        </Link>
      </li>

      <h1>{title}</h1>

      <li className='relative'>
        <Link href='/checkout'>
          <svg
            className='h-6 w-6 fill-current text-gray-600 cursor-pointer'
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
        </Link>

        <span className='inline-block bg-laure-100 rounded-full px-2 py-1 font-semibold text-xs text-laure-300 absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2'>
          {list.length}
        </span>
      </li>
    </ul>
  )
}

export default Header
