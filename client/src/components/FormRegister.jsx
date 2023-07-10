import { Form, Formik } from 'formik'
import { useAuth } from '../hooks/useAuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const initialValues = {
  userName: '',
  email: '',
  password: ''
}

function FormRegister () {
  const { register, isAuthenticated, error, isError } = useAuth()

  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        register(values)
      }}
    >
      {({ handleChange, handleSubmit }) => (
        <Form className='flex flex-col gap-5 w-3/4' onSubmit={handleSubmit}>
          <div className='w-full'>
            <input required className='text-2xl bg-transparent text-orange-600 border-b border-orange-500 placeholder:text-orange-500 outline-none px-2 py-1 w-full' type="text" name="userName" placeholder='User Name' autoComplete='off' onChange={handleChange} />
            {
              isError && error.error && <p className='text-xl text-red-600 mt-1'>{error.error.userName}</p>
            }
          </div>

          <div className='w-full'>
            <input required className='text-2xl bg-transparent text-orange-600 border-b border-orange-500 placeholder:text-orange-500 outline-none px-2 py-1 w-full' type="email" name="email" placeholder='Email' autoComplete='off' onChange={handleChange} />
            {isError && error.error && <p className='text-xl text-red-600 mt-1'>{error.error.email}</p>}
          </div>

          <div className='w-full'>
            <input required className='text-2xl bg-transparent text-orange-600 border-b border-orange-500 placeholder:text-orange-500 outline-none px-2 py-1 w-full' type="password" name="password" placeholder='Password' autoComplete='off' onChange={handleChange} />
            {isError && error.error && <p className='text-xl text-red-600 mt-1'>{error.error.password}</p>}
          </div>

          <button type='submit' className='bg-orange-500 text-white px-2 py-1 rounded-md outline-none hover:bg-orange-600 duration-200 text-2xl'>Send</button>

          {isError && error.msg && <p className='text-xl text-red-600 mt-1'>{error.msg}</p>}
          <div className='flex justify-center gap-2'>
              <p className='text-orange-500 font-medium text-2xl'>Already have an account?</p>
              <Link to={'/login'} className='text-orange-600 hover:text-orange-700 duration-200 font-semibold text-2xl'>Login</Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export { FormRegister }
