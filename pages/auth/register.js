import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks'
import withApollo from '../../lib/apollo'
import { Formik } from 'formik'
import { InputForm } from '../../components/Input'
import Link from 'next/link'
import * as Yup from 'yup';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Cookie from "js-cookie";
import gql from 'graphql-tag';

const fetcher = async (...args) => {
  const res = await fetch(...args)

  return res.json()
}

const ADD_USER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
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

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Campo requerido'),
  email: Yup.string()
    .email('Email no valido.')
    .required('Campo requerido'),
  password: Yup.string().required('Campo requerido')
})

const Register = () => {
  const router = useRouter()

  const [
    addUser,
    { loading: loadingAddUser, error: errorAddUser, data: dataAddUser }
  ] = useMutation(ADD_USER_MUTATION)

  useEffect(() => {

    if(errorAddUser) {
      console.log(errorAddUser)
    } 

    if(dataAddUser) {
      console.log(dataAddUser)
      Cookie.set('token', dataAddUser.register.jwt)
      router.push('/')
    }

  }, [errorAddUser, dataAddUser])

  return (
    <div className='flex items-center justify-center bg-gray-50 sm:px-6 pt-20'>
      <div className='max-w-md w-80 space-y-4'>
        <div className='flex items-center flex-col'>
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
          <h2 className='mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900'>
            Registrate gratis
          </h2>
        </div>
        <Formik
          initialValues={{ email: '', password: '', username: '' }}
          validationSchema={SignupSchema}
          onSubmit={({ username, password, email }, { setSubmitting }) => {
              addUser({ variables: { username, password, email } })
          }}
        >
          {({
            handleSubmit
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className='grid gap-3'>
                <InputForm type='text' placeholder='Username' name='username' />
                <InputForm
                  type='email'
                  placeholder='Email address'
                  name='email'
                />
                <InputForm
                  type='password'
                  placeholder='Password'
                  name='password'
                />
              </div>

              <div>
                <button
                  className={`inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150   ${
                    loadingAddUser ? 'cursor-not-allowed' : ''
                  }`}
                  type='submit'
                  disabled={loadingAddUser}
                >
                  {loadingAddUser && (
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
                  Registrarse
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default withApollo(Register)
