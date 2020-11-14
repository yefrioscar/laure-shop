import React from 'react'
import LinkItem from '../Link'
import ProductCard from '../ProductCard'

const ProductList = ({ categories, products }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-main-app gap-4'>
      <div className=''>
        <h2 className='mb-2 font-bold text-gray-800'>Categories</h2>
        <ul className='flex lg:flex-col flex-wrap'>
            <LinkItem
              href='/'
              as={`/`}
              className='mr-1 mb-1 font-medium text-gray-500 hover:text-gray-700 text-sm'
            >
              <li>
                <a className='' href='#'>
                  Todos
                </a>
              </li>
            </LinkItem>
          {categories.data.map((el, index) => (
            <LinkItem
              href='/categories/[categoryId]'
              as={`/categories/${el.key}`}
              className='mr-1 mb-1 font-medium text-gray-500 hover:text-gray-700 text-sm'
              key={index}
            >
              <li>
                <a className='' href='#'>
                  {el.description}
                </a>
              </li>
            </LinkItem>
          ))}
        </ul>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 h-20 gap-4'>
        {products.map((el, index) => (
          <ProductCard {...el} key={index} />
        ))}

        {products.length === 0 && <span>No hay items</span>}
      </div>
    </div>
  )
}

export default ProductList
