import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { motion } from 'framer-motion'

const QUERY_BANNERS = gql`
  {
    banners(where: { state: "true" }) {
      name
      brand
      price_pen
      price_usd
      categories {
        name
      }
    }
  }
`

function currencyFormat (num, prefix) {
  return `${prefix}  ${num
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
}
function trim (string, limit) {
  return `${string.substring(0, limit)}...`
}

const Banner = () => {
  const {
    loading: loadingBanners,
    error: errorCategories,
    data: dataCategories
  } = useQuery(QUERY_BANNERS)
  const [index, setIndex] = useState(0)
  const [item, setItem] = useState(null)

  if (loadingBanners) {
    return <div>Loading...</div>
  }

  return (
    <motion.div layout>
      <div className='rounded-xl bg-gray-200 w-full h-64 p-6 flex space-x-4'>
        <Image
          src='/images/geforce-banner.jpg'
          width={640}
          height={200}
          alt='Profile Picture'
          className='rounded-xl'
          quality={100}
        />

        <div className='flex flex-col justify-between flex-grow'>
          <div className=''>
            <h1 className='font-bold text-3xl text-gray-700'>
              {dataCategories.banners[index].name}
            </h1>
            <div className='flex space-x-4'>
              {dataCategories.banners[index].categories.map((item, i) => {
                return (
                  <span
                    key={i}
                    className='inline-block bg-gray-300 rounded p-1 text-xs font-medium'
                  >
                    {item.name}
                  </span>
                )
              })}
            </div>
          </div>

          <div className='space-y-2'>
            <div className='space-x-2 flex items-end'>
              <div className='text-3xl font-bold leading-8'>
                {currencyFormat(+dataCategories.banners[index].price_pen, 'S/')}
              </div>
              <div className='text-base font-bold'>
                {currencyFormat(+dataCategories.banners[index].price_usd, '$')}
              </div>
            </div>
            <div>
              <button
                className='inline-flex justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-laure-600 hover:bg-laure-500 focus:outline-none focus:border-laure-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150'
                type='submit'
              >
                <svg
                  className='-ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10'></circle>
                  <line x1='12' y1='8' x2='12' y2='16'></line>
                  <line x1='8' y1='12' x2='16' y2='12'></line>
                </svg>
                Agregar al carro
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          {' '}
          {dataCategories.banners.length > 1 && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-auto text-gray-400 hover:text-gray-600 cursor-pointer'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              onClick={() => {
                let i = index + 1
                console.log(i)
                console.log(dataCategories.banners.length)

                if (i < dataCategories.banners.length) {
                  setIndex(i)
                  setItem(dataCategories.banners[i])
                } else {
                  setIndex(0)
                }
              }}
            >
              <line x1='5' y1='12' x2='19' y2='12'></line>
              <polyline points='12 5 19 12 12 19'></polyline>
            </svg>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Banner
