import { FormTask } from '../components/FormTask'
import chincheta from '../public/chincheta.svg'
import { Link } from 'react-router-dom'

function CreateTask () {
  return (
        <div className='bg-[#cb8849] w-full h-screen flex flex-col justify-center items-center relative'>
            <div className='absolute top-5 left-5 z-10'>
                <Link to='/' className='text-5xl text-zinc-900 p-2 hover:text-orange-200 duration-200'>
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
            </div>
            <div className='relative bg-orange-200 w-1/2 h-1/2 rounded-lg p-2'>
                <div>
                    <img src={chincheta} alt="" className='absolute w-20 right-0 top-0' />
                </div>
                <FormTask />
            </div>
        </div>
  )
}

export { CreateTask }
