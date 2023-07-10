import { Formik, Form } from 'formik'
import { useTaskContext } from '../hooks/useTaskContext'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

const initialValues = {
  description: ''
}

function FormTask () {
  const [description, setDescription] = useState(initialValues)
  const [completed, setCompleted] = useState(null)

  const { createTask, updateTask, getTask } = useTaskContext()

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const data = async () => {
      if (params.id) {
        const response = await getTask(params.id)
        setDescription({
          description: response.description
        })
        setCompleted(response.completed)
      }
    }
    data()
  }, [])

  return (
    <Formik
      initialValues={description}
      enableReinitialize={true}
      onSubmit={async (values, actions) => {
        try {
          if (params.id) {
            await updateTask(params.id, values, completed)
            navigate('/')
          } else {
            await createTask(values)
          }
          actions.resetForm()
        } catch (error) {
          console.log(error)
        }
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit} className='flex flex-col gap-2 h-full justify-center'>
          <textarea
            className='w-full h-full py-2 px-10 bg-transparent placeholder:text-black rounded-md outline-none text-black text-3xl resize-none'
            name="description" placeholder='Write a task...' onChange={handleChange} value={values.description} required></textarea>
          <button type='submit' className='bg-orange-400 p-1 my-2 text-2xl rounded-md text-white hover:bg-orange-500 duration-200'>
            {
              params.id ? 'Edit' : 'Create'
            }
          </button>
        </Form>
      )}
    </Formik>
  )
}

export { FormTask }
