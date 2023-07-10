import '../css/LayoutHome.css'
import { Link } from 'react-router-dom'
import { useTaskContext } from '../hooks/useTaskContext'
import { useEffect } from 'react'
import { useEvents } from '../hooks/useEvents'
import { PaperCard } from './PaperCard'

function LayoutHome () {
  const { getTasks, setTasks, tasks } = useTaskContext()
  const {
    handleLogout,
    handlePaginationBack,
    handlePaginationNext,
    numPage,
    numTask,
    totalTask
  } = useEvents()

  useEffect(() => {
    const getTasksFromDB = async () => {
      const response = await getTasks()
      setTasks(response.data)
    }
    getTasksFromDB()
  }, [])

  return (
    <div className="w-full h-screen bg-[#cb8849] flex items-center flex-col justify-center">
      <div className='font-bold absolute top-0 right-6 p-2 z-20 text-2xl hover:text-orange-200 duration-200'>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="relative w-3/4 h-4/5 bg-zinc-100 border text-orange-300 rounded-sm hoja flex">
        <div className='h-full w-[1.5px] bg-zinc-500 z-20 absolute left-1/2 linea-centro'></div>
        <div className='h-full w-1/2 relative flex items-end'>
          <Link className='absolute text-2xl text-black top-1 left-2 flex items-center gap-2 hover:text-orange-500 duration-300' to='/createTask'>
            <i className="fa-solid fa-plus"></i>
            <p>Create Task</p>
          </Link>
          <div className='w-full h-[calc(100%-2.5rem)] flex flex-col pl-2'>
            {
              tasks.map((task) => (
                <PaperCard btRight={'8'} settingRigth={'14'} task={task} key={task.id}/>
              )).splice(numTask, 14)
            }
          </div>
          <div className='absolute right-[6px] top-11 w-6 h-6 bg-gray-500 z-50 rounded-full text-gray-500 circulo-dentro'>
            <div className='absolute text-gray-300 rounded-xl w-10 h-2 bg-gray-300 top-2 left-[12px] anillo-dentro z-[60]'></div>
          </div>
          <div className='absolute w-full h-[1.5px] bg-zinc-400 top-10 text-zinc-400 lineas-libreta'></div>
        </div>
        <div className='h-full w-1/2 relative flex items-end'>
          <div className='w-full h-[calc(100%-2.5rem)] flex flex-col pl-11'>
            {
              tasks.length > 14 &&
              tasks.map((task) => (
                <PaperCard btRight={'2'} settingRigth={'8'} task={task} key={task.id}/>
              )).splice(numTask + 14, 14)
            }
          </div>
          <div className='absolute left-2 top-11 w-6 h-6 bg-gray-500 rounded-full text-gray-500 circulo-dentro'></div>
          <div className='absolute w-full h-[1.5px] bg-zinc-400 top-10 text-zinc-400 lineas-libreta'></div>
        </div>
        {
          numPage > 0 &&
          <button className='absolute bottom-0 left-3 hover:text-orange-500 duration-200' onClick={handlePaginationBack}>
            <i className="fa-solid fa-arrow-left text-2xl"></i>
          </button>
        }
        {
          tasks.length > totalTask &&
          <button className='absolute bottom-0 right-3 hover:text-orange-500 duration-200' onClick={handlePaginationNext}>
            <i className="fa-solid fa-arrow-right text-2xl"></i>
          </button>
        }
      </div>
    </div >
  )
}

export { LayoutHome }
