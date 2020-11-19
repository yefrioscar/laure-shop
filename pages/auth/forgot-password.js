import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import withApollo from '../../lib/apollo'
import { Formik } from 'formik'
import { InputForm } from '../../components/Input'
import Link from 'next/link'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import gql from 'graphql-tag'
import { useAuth } from '../../context/AuthProvider'
import Header from '../../components/header'

const FORGOT_PASSWORD_MUTATION = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      ok
    }
  }
`

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email no valido.')
    .required('Campo requerido')
})

const ForgotPassword = () => {
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([])

  const [forgotPassword, { loading: loadingForgotPassword }] = useMutation(
    FORGOT_PASSWORD_MUTATION,
    { errorPolicy: 'all' }
  )

  const submit = async email => {
    setErrors([])
    
    try {
      const result = await forgotPassword({ variables: { email } })
      console.log('success', result)
      setSuccess(true)
    } catch (error) {
      const { graphQLErrors, networkError } = error
      const errors = []
      console.log(graphQLErrors, networkError)

      // console.log('error', error.graphQLErrors)
      setErrors(graphQLErrors.map(({ message }, i) => message))
    }
  }

  return (
    <div className='grid gap-4'>
      <Header />
      <div className='flex items-center flex-col justify-center bg-gray-50'>
        <div className='max-w-md w-80 space-y-4'>
          {errors.length > 0 && (
            <div className='bg-red-600 text-white rounded p-4'>
              {errors.map((item, index) => (
                <span key={index}>{item}</span>
              ))}
            </div>
          )}
          {success && (
            <div className='flex justify-center flex-col mt-12 space-y-4'>
              <p className='text-center'>
                !Hemos envia instrucciones a tu correo electronico!
              </p>
              <div className='flex items-center justify-center'>
                <div className='text-sm leading-5'>
                  <a
                    onClick={() => {
                      setSuccess(false)
                    }}
                    className='font-medium text-laure-600 hover:text-laure-500 focus:outline-none focus:underline transition ease-in-out duration-150 cursor-pointer'
                  >
                    Volver a intentarlo
                  </a>
                </div>
              </div>
            </div>
          )}
          {!success && (
            <>
              <div className='flex items-center flex-col'>
                <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
                  Recuperar contraseña
                </h2>
              </div>
              <Formik
                initialValues={{ email: '' }}
                validationSchema={ForgotPasswordSchema}
                onSubmit={({ email }, { setSubmitting }) => submit(email)}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid gap-3'>
                      <InputForm type='text' placeholder='Email' name='email' />
                    </div>

                    <div>
                      <button
                        className={`inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-laure-600 hover:bg-laure-500 focus:outline-none focus:border-laure-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150   ${
                          loadingForgotPassword ? 'cursor-not-allowed' : ''
                        }`}
                        type='submit'
                        disabled={loadingForgotPassword}
                      >
                        {loadingForgotPassword && (
                          <svg
                            className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='4'
                            ></circle>
                            <path
                              className='opacity-75'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                            ></path>
                          </svg>
                        )}
                        Enviar instrucciones
                      </button>
                    </div>

                    <div className='flex items-center justify-center'>
                      <div className='text-sm leading-5'>
                        <Link href='/auth/login'>
                          <a className='font-medium text-laure-600 hover:text-laure-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
                            Iniciar sesion
                          </a>
                        </Link>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default withApollo(ForgotPassword)
