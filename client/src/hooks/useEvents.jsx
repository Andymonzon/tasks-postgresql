import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTaskContext } from './useTaskContext'
import { useAuth } from './useAuthContext'

export const useEvents = () => {
  const [numPage, setNumPage] = useState(0)
  const [numTask, setNumTask] = useState(0)
  const [totalTask, setTotalTask] = useState(28)
  const [openTaskId, setOpenTaskId] = useState(null)
  const [showMenu, setShowMenu] = useState(false)

  const navigation = useNavigate()
  const { toggleTaskDone, deleteTask, tasks, setTasks } = useTaskContext()
  const { logout } = useAuth()

  const handlePaginationNext = () => {
    const limit = 28
    const nextPage = numPage + 1
    setNumPage(nextPage)
    navigation(`/${nextPage}`)
    setTotalTask(prevValue => prevValue + limit)
    setNumTask(prevNumTask => prevNumTask + limit)
  }

  const handlePaginationBack = () => {
    const limit = 28
    const nextPage = numPage - 1
    setNumPage(nextPage)
    navigation(`/${nextPage}`)
    setTotalTask(prevValue => prevValue - limit)
    setNumTask(prevNumTask => prevNumTask - limit)
  }

  const handleDone = async (id) => {
    try {
      await toggleTaskDone(id, tasks)
      const updatedTasks = tasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }
        }
        return task
      })
      setTasks(updatedTasks)
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowMenu = (id) => {
    setOpenTaskId(id)
    setShowMenu(!showMenu)
  }

  const handleDelete = id => {
    deleteTask(id)
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
    setShowMenu(false)
  }

  const handleLogout = () => {
    logout()
  }

  return {
    handleLogout,
    handleDelete,
    handleShowMenu,
    handleDone,
    handlePaginationBack,
    handlePaginationNext,
    numPage,
    numTask,
    showMenu,
    totalTask,
    openTaskId,
    setNumPage,
    setNumTask,
    setShowMenu,
    setTotalTask,
    setOpenTaskId
  }
}
