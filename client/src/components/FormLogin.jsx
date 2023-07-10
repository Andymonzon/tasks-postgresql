import { Form, Formik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuthContext'
import { useEffect } from 'react'

const initialValues = {
  email: '',
  password: ''
}

function FormLogin () {
  const { login, error, isError, isAuthenticated } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          login(values)
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form className='flex flex-col gap-5 w-3/4' onSubmit={handleSubmit}>
            <input required className='text-2xl bg-transparent text-orange-600 border-b border-orange-500 placeholder:text-orange-500 outline-none px-2 py-1' type="email" name="email" placeholder='Email' autoComplete='off' onChange={handleChange} />
            {isError && error.error && <p className='text-xl text-red-600 mt-1'>{error.error.email}</p>}

            <input required className='text-2xl bg-transparent text-orange-600 border-b border-orange-500 placeholder:text-orange-500 outline-none px-2 py-1' type="password" name="password" placeholder='Password' autoComplete='off' onChange={handleChange} />
            {isError && error.error && <p className='text-xl text-red-600 mt-1'>{error.error.password}</p>}

            <button type='submit' className='bg-orange-500 text-white px-2 py-1 rounded-md outline-none hover:bg-orange-600 duration-200 text-xl'>Send</button>

            {isError && error.msg && <p className='text-xl text-red-600 mt-1'>{error.msg}</p>}

            <div className='flex justify-center gap-2'>
              <p className='text-orange-500 font-medium text-2xl'>Dont have an account?</p>
              <Link to={'/register'} className='text-orange-600 hover:text-orange-700 duration-200 font-semibold text-2xl'>Register</Link>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export { FormLogin }
