import { useEffect } from 'react'
import { useEvents } from '../hooks/useEvents'
import { Link } from 'react-router-dom'

function PaperCard ({ btRight, settingRigth, task }) {
  const { showMenu, openTaskId, handleDone, handleShowMenu, handleDelete, setShowMenu } = useEvents()

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const target = event.target
      const menuElement = document.getElementById('settingMenu')
      if (menuElement && !menuElement.contains(target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleDocumentClick)

    return () => {
      document.removeEventListener('mousedown', handleDocumentClick)
    }
  }, [])

  return (
        <div className='flex gap-3 items-center relative'>
            <button className='p-2 border-2 border-black relative hover:border-orange-500 text-black hover:text-orange-500 duration-200' onClick={() => handleDone(task.id)}>
                {
                    task.completed ? <i className="fa-solid fa-check absolute top-0 left-[1px]"></i> : null
                }
            </button>
            <div className='relative max-w-[24rem]'>
                <p className={task.completed ? 'text-2xl text-black before:content-[""] before:absolute before:w-full before:border before:border-black before:top-[56%]' : 'text-2xl text-black'} style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>{task.description}</p>
            </div>
            <button className={`absolute right-${btRight} px-2 text-black  hover:text-orange-500 duration-200`} onClick={() => handleShowMenu(task.id)}><i className="fa-solid fa-ellipsis"></i></button>
            {
                showMenu && openTaskId === task.id
                  ? <div id="settingMenu" className={`absolute flex flex-col bg-orange-400 text-white text-xl z-[90] right-${settingRigth} top-3 p-2 items-start w-1/4`}>
                        {
                          task.description.length > 44
                            ? <Link to={`/showTask/${task.id}`} className='hover:text-black w-full duration-200'>Show more</Link>
                            : null
                        }
                        <Link to={`/edit/${task.id}`} className='hover:text-black w-full duration-200'>Edit</Link>
                        <button className='hover:text-black w-full text-start duration-200' onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                  : null
            }
        </div>
  )
}

export { PaperCard }
