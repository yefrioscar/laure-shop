import { Formik } from 'formik'
import { useState } from 'react'
import Header from '../../components/header'
import { InputForm } from '../../components/Input'
import { MainLayout } from '../../components/Layout'
import { useBagState } from '../../context/CartContext'

export default function Checkout () {
  const { list } = useBagState()

  const initialValues = {
    dni: '',
    name: '',
    direction: '',
    phone_number: ''
  }

  const onSubmit = (values, actions) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
    }, 1000)
  }

  return (
    <MainLayout title="Checkout">
      <div className='grid grid-cols-2 gap-4'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold text-gray-700'>Datos requeridos</h2>

          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ handleSubmit }) => (
              <form className='grid gap-4' onSubmit={handleSubmit}>
                <InputForm type='text' placeholder='Nombre' name='name' />
                <InputForm type='text' placeholder='Dni' name='dni' />
                <InputForm type='text' placeholder='Direccion' name='direction' />
                <InputForm type='text' placeholder='Telefono celular' name='phone_number' />
                <button
                  className='bg-laure hover:bg-laure-300 text-white font-bold py-2 px-4 rounded'
                  type='submit'
                >
                  Confirmar orden
                </button>
              </form>
            )}
          </Formik>
        </div>

        <div className='flex flex-col space-y-4'>
          <div className='flex justify-between'>
            <h3>Products</h3>

            <div className='space-x-2'>
              <span className='inline-block rounded-full px-3 py-1 bg-laure text-white text-xs font-medium cursor-pointer'>
                DOLARES
              </span>
              <span className='inline-block rounded-full px-3 py-1 bg-gray-300 text-gray-600 text-xs font-medium cursor-pointer'>
                DOLARES
              </span>
            </div>
          </div>

          {list.map((item, index) => (
            <div key={index} className='rounded bg-teal-200 p-4 flex space-x-4'>
              <img
                className='rounded-lg shadow-xl w-16 h-auto'
                src='/images/test-product.png'
                alt=''
              />

              <div className='flex items-center w-1/2'>
                <p className='text-black text-sm'>{item.name}</p>
              </div>

              <div className='flex space-x-1 items-center flex-grow justify-center'>
                <svg
                  className='h-4 w-4 text-teal-600'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10'></circle>
                  <line x1='8' y1='12' x2='16' y2='12'></line>
                </svg>
                <span>{item.quantity}</span>

                <svg
                  className='h-4 w-4 text-teal-600'
                  xmlns='http://www.w3.org/2000/svg'
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
              </div>

              <div className='flex justify-center items-center'>
                <p className='font-bold text-teal-800 text-2xl'>
                  <span className='text-xs mr-1'>S/</span>
                  611.52
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  )
}
