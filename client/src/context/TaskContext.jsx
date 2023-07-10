import { createContext } from 'react'
import { useTaskRequest } from '../hooks/useTaskRequest'

export const TaskContext = createContext()

export const TaskContextProvider = ({ children }) => {
  const { createTask, getTasks, toggleTaskDone, deleteTask, updateTask, setTasks, tasks, getTask } = useTaskRequest()
  return (
    <TaskContext.Provider value={{
      createTask,
      getTasks,
      toggleTaskDone,
      deleteTask,
      updateTask,
      setTasks,
      tasks,
      getTask
    }}>
      {children}
    </TaskContext.Provider>
  )
}
