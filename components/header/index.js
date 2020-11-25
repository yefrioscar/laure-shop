import Link from 'next/link'
import React from 'react'
import { useAuth } from '../../context/AuthProvider'
import { useBagState } from '../../context/CartContext'
import Button from '../Button'

const Header = ({ title, user }) => {
  const { list } = useBagState()
  const { authState, signOut } = useAuth()

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

      <h1 className="font-bold text-xl">{title}</h1>

      <div className='flex space-x-4'>
        <div className='relative flex justify-center items-center'>
          <Link href='/cart'>
            <div>
              <svg
                className='h-6 w-6 fill-current text-gray-600 hover:text-gray-500 cursor-pointer transition duration-300 ease-in-out'
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
              <span className='inline-block bg-laure-300 rounded-full px-1 font-semibold text-sm text-laure-500 absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2'>
                {list.length}
              </span>
            </div>
          </Link>
        </div>

        {/* <Button as={Link} href='auth/register'>
          Iniciar sesión
        </Button> */}
        <Link href='/auth/login'>
          {authState.isAuthenticated ? (
            <div className='w-8 h-8 rounded-full bg-laure-600 text-white flex justify-center items-center hover:bg-laure-700 cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out'>
              <span>{authState.user.username.split('')[0].toUpperCase()}</span>
            </div>
          ) : (
            <div className='w-8 h-8 rounded-full bg-laure-600 text-white flex justify-center items-center hover:bg-laure-700 cursor-pointer hover:scale-105 transform transition duration-300 ease-in-out'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-auto'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                <circle cx='12' cy='7' r='4'></circle>
              </svg>
            </div>
          )}
        </Link>
      </div>
    </ul>
  )
}

export default Header
