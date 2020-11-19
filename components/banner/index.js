import React from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

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
  return  `${prefix}  ${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
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

  console.log(dataCategories)

  if (loadingBanners) {
    return <div>Loading...</div>
  }

  return (
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
            {dataCategories.banners[0].name}
          </h1>
          <div className='flex space-x-4'>
            {dataCategories.banners[0].categories.map((item, i) => {
              return (
                <span key={i} className='inline-block bg-gray-300 rounded p-1 text-xs font-medium'>
                  {item.name}
                </span>
              )
            })}
          </div>
        </div>

        <div className='space-y-2'>
          <div className='space-x-2 flex items-end'>
            <div className='text-3xl font-bold leading-8'>{currencyFormat(+dataCategories.banners[0].price_pen, 'S/')}</div>
            <div className='text-base font-bold'>{currencyFormat(+dataCategories.banners[0].price_usd, '$')}</div>
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
    </div>
  )
}

export default Banner
