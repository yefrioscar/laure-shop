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

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $code: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    resetPassword(
      code: $code
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      jwt
      user {
        username
        email
        id
      }
    }
  }
`

// If code validation is null got to /
export async function getServerSideProps ({ query }) {
  console.log(query)

  if (!query.code) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  } else
    return {
      props: {
        code: query.code
      }
    }
}

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirm is required')
})

const ResetPassword = ({ code }) => {
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState([])
  const [
    resetPassword,
    {
      loading: loadingResetPassword,
      error: errorResetPassword,
      data: dataResetPassword
    }
  ] = useMutation(RESET_PASSWORD_MUTATION)

  const submit = async (password, passwordConfirmation) => {
    setErrors([])

    try {
      const result = await resetPassword({
        variables: { code, password, passwordConfirmation }
      })
      console.log('success', result)
      setSuccess(true)

      setTimeout(() => {
        router.push('/')
      }, 3000);
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
      <div className='flex items-center justify-center bg-gray-50'>
        {}
        <div className='max-w-md w-80 space-y-4'>
          {success && (
            <div className='flex justify-center flex-col mt-12 space-y-4'>
              <p className='text-center'>
                Hemos cambiado tu contraseña exitosamente, se te redirigira al
                inicio.
              </p>
            </div>
          )}
          {!success && (
            <>
              <div className='flex items-center flex-col'>
                <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
                  Cambiar contraseña
                </h2>
              </div>
              <Formik
                initialValues={{ password: '', passwordConfirmation: '' }}
                validationSchema={ResetPasswordSchema}
                onSubmit={(
                  { password, passwordConfirmation },
                  { setSubmitting }
                ) => {
                  submit(password, passwordConfirmation)
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='grid gap-3'>
                      <InputForm
                        type='password'
                        placeholder='Password'
                        name='password'
                      />
                      <InputForm
                        type='password'
                        placeholder='Confirmation password'
                        name='passwordConfirmation'
                      />
                    </div>

                    <div>
                      <button
                        className={`inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-laure-600 hover:bg-laure-500 focus:outline-none focus:border-laure-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150   ${
                          loadingResetPassword ? 'cursor-not-allowed' : ''
                        }`}
                        type='submit'
                        disabled={loadingResetPassword}
                      >
                        {loadingResetPassword && (
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
                        Cambiar contraseña
                      </button>
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

export default withApollo(ResetPassword)
