import { useEffect, useState } from 'react'
import { useTaskContext } from '../hooks/useTaskContext'
import { useParams, Link } from 'react-router-dom'

function ShowTask () {
  const [info, setInfo] = useState(null)
  const { getTask } = useTaskContext()

  const params = useParams()

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getTask(params.id)
        setInfo(response.description)
      } catch (error) {
        console.log(error)
      }
    }
    data()
  }, [])

  return (
        <div className="w-full h-screen bg-[#cb8849] flex items-center justify-center">
            <div className='absolute top-5 left-5 z-10'>
                <Link to='/' className='text-5xl text-zinc-900 p-2 hover:text-orange-200 duration-200'>
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
            </div>
            <div className="max-w-[50%] max-h-[50%] min-w-[50%] min-h-[50%] bg-orange-200 p-5 rounded-md overflow-auto">
                <p className='text-2xl text-black'>{info}</p>
            </div>
        </div>
  )
}

export { ShowTask }
