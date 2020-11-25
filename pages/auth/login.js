import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import withApollo from '../../lib/apollo'
import { Formik } from 'formik'
import { InputForm } from '../../components/Input'
import Link from 'next/link'
import * as Yup from 'yup'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import gql from 'graphql-tag'
import { useAuth } from '../../context/AuthProvider'
import Header from '../../components/header'
import { MainLayout } from '../../components/Layout'

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        id
        email
        confirmed
        blocked
      }
    }
  }
`

const SignupSchema = Yup.object().shape({
  usernameOrEmail: Yup.string().required('Campo requerido'),
  password: Yup.string().required('Campo requerido')
})

const Login = () => {
  const router = useRouter()
  const { signIn } = useAuth()
  const [login, { loading: loadingLoginUser }] = useMutation(LOGIN_MUTATION)

  const submit = async (identifier, password) => {
    try {
      const { data } = await login({ variables: { identifier, password } })
      signIn(data.login.user, data.login.jwt)
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MainLayout title='Login' publicPage='public'>
      <div className='flex items-center justify-center bg-gray-50 pt-20'>
        <div className='max-w-md w-80 space-y-4'>
          <div className='flex items-center flex-col'>
            <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
              Iniciar sesion
            </h2>
          </div>
          <Formik
            initialValues={{ usernameOrEmail: '', password: '' }}
            validationSchema={SignupSchema}
            onSubmit={({ usernameOrEmail, password }, { setSubmitting }) => {
              submit(usernameOrEmail, password)
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className='space-y-4'>
                <div className='grid gap-3'>
                  <InputForm
                    type='text'
                    placeholder='Username o Email'
                    name='usernameOrEmail'
                  />
                  <InputForm
                    type='password'
                    placeholder='Password'
                    name='password'
                  />
                </div>

                <div className='flex items-center justify-end'>
                  <div className='text-sm leading-5'>
                    <Link href='/auth/forgot-password'>
                      <a className='font-medium text-laure-600 hover:text-laure-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
                        Forgot your password?
                      </a>
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    className={`inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-laure-600 hover:bg-laure-500 focus:outline-none focus:border-laure-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150   ${
                      loadingLoginUser ? 'cursor-not-allowed' : ''
                    }`}
                    type='submit'
                    disabled={loadingLoginUser}
                  >
                    {loadingLoginUser && (
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
                    Iniciar sesion
                  </button>
                </div>
                <div className='flex items-center justify-center'>
                      <div className='text-sm leading-5'>
                        <Link href='/auth/register'>
                          <a className='font-medium text-laure-600 hover:text-laure-500 focus:outline-none focus:underline transition ease-in-out duration-150'>
                            Registrarse
                          </a>
                        </Link>
                      </div>
                    </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </MainLayout>
  )
}

export default withApollo(Login)
