import { Formik } from 'formik'
import { useState } from 'react'
import Header from '../../components/header'
import { InputForm } from '../../components/Input'
import { MainLayout } from '../../components/Layout'
import { useAuth } from '../../context/AuthProvider'
import { useBagDispatch, useBagState } from '../../context/CartContext'
import { currencyFormat } from '../../lib/util'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import clsx from 'clsx'
import Button from '../../components/Button'

const TabItem = ({ children, isSelected, onClick }) => {
  return (
    <div className='relative'>
      {isSelected && (
        <motion.div
          layoutId='highlight'
          style={{ borderRadius: typeof tab === 'string' ? 18 : 12 }}
          className='bg-laure-300 absolute inset-0'
        ></motion.div>
      )}
      <div
        className={clsx(
          'inline-block rounded-full px-3 py-1 text-gray-500  text-xs font-bold cursor-pointer z-10 relative',
          isSelected ? 'text-laure-600' : '',
          !isSelected ? 'text-gray-500 hover:text-gray-700' : ''
        )}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  )
}

export default function Cart () {
  const { list } = useBagState()
  const dispatch = useBagDispatch()
  const [currency, setCurrency] = useState('S/')

  const { authState } = useAuth()

  // const onSubmit = (values, actions) => {
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2))
  //     actions.setSubmitting(false)
  //   }, 1000)
  // }

  const currencies = [
    { label: 'DOLARES', key: '$' },
    { label: 'SOLES', key: 'S/' }
  ]

  const cssIcon = 'h-5 w-auto text-gray-500 hover:text-gray-600 cursor-pointer'

  return (
    <MainLayout title='Cart' titleHeader='Cart'>
      <div className='grid gap-4 md:px-40'>
        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between'>
            <h3>Products</h3>

            <AnimateSharedLayout>
              <div className='space-x-2 flex'>
                {currencies.map((item, i) => (
                  <TabItem
                    key={i}
                    isSelected={item.key === currency}
                    onClick={() => setCurrency(item.key)}
                  >
                    {item.label}
                  </TabItem>
                ))}
              </div>
            </AnimateSharedLayout>
          </div>
          <AnimatePresence initial={false}>
            {list.map((item, index) => (
              <motion.div
                key={index}
                positionTransition
                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
              >
                <div
                  key={index}
                  className='rounded bg-gray-200 p-4 flex space-x-4'
                >
                  <div className='flex items-center'>
                    <svg
                      className='w-5 h-auto text-gray-500 hover:text-gray-700 cursor-pointer'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      onClick={() =>
                        dispatch({ type: 'REMOVE_ITEM', payload: item.id })
                      }
                    >
                      <line x1='18' y1='6' x2='6' y2='18'></line>
                      <line x1='6' y1='6' x2='18' y2='18'></line>
                    </svg>
                  </div>
                  
                  <img
                    className='rounded-lg shadow-xl w-16 h-auto'
                    src='/images/test-product.png'
                    alt=''
                  />

                  <div className='flex flex-col justify-center w-1/3 flex-grow-0'>
                    <p className='text-black text-xl font-bold'>{item.name}</p>
                    <div className='space-x-1 font-medium'>
                      {item.categories.map((category, i) => (
                        <div key={i}>
                          <span
                            key={i}
                            className='inline-block text-xs text-gray-500'
                          >
                            {category.name}
                          </span>
                          { (i < (item.categories.length - 1) ? <span>&#xb7;</span> : '')}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex space-x-1 items-center flex-grow justify-center w-1/3'>
                    <svg
                      className={clsx(cssIcon, item.quantity === 1 ? 'opacity-25 cursor-not-allowed pointer-events-none' : '')}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      onClick={() => dispatch({ type: 'DECREMENT_ITEM', payload: item.id })}
                    >
                      <circle cx='12' cy='12' r='10'></circle>
                      <line x1='8' y1='12' x2='16' y2='12'></line>
                    </svg>
                    <span className='text-lg'>{item.quantity}</span>

                    <svg
                      className={clsx(cssIcon)}
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      onClick={() => dispatch({ type: 'INCREMENT_ITEM', payload: item.id })}

                    >
                      <circle cx='12' cy='12' r='10'></circle>
                      <line x1='12' y1='8' x2='12' y2='16'></line>
                      <line x1='8' y1='12' x2='16' y2='12'></line>
                    </svg>
                  </div>

                  <div className='flex justify-end items-center w-1/3'>
                    <p className='font-bold text-laure-600 text-2xl'>
                      {currency === '$'
                        ? currencyFormat(+item.price_usd, '$')
                        : currencyFormat(+item.price_pen, 'S/')}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className='flex justify-end'>
            <Button size='lg'>Checkout</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
