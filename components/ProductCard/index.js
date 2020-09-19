import React from 'react'


function currencyFormat (num, prefix) {
  return  `${prefix}  ${num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`
}
function trim (string, limit) {
  console.log(string)
  return `${string.substring(0, limit)}...`
}

const ProductCard = (product) => {
  return (
    <div>
      <div className='bg-gray-200 rounded-lg p-6 mb-2 flex center justify-center items-center'>
        <img
          className='rounded-lg shadow-xl w-full'
          src='/images/test-product.png'
          alt=''
        />
      </div>
      <div className='flex flex-col justify-between space-y-2'>
        <p className='font-bold text-gray-800'>{trim(product.name, 45)}</p>
        <div className='flex justify-between'>
          <div>
            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
              {currencyFormat(+product.price_usd, '$')}
            </span>

            <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold  text-gray-700 mr-2 mb-2'>
              {currencyFormat(+product.price_pen, 'S/')}
            </span>
          </div>

          <svg
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-6 w-6 stroke-current text-laure'
          >
            <circle cx={12} cy={12} r={10} />
            <path d='M12 8v8M8 12h8' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
