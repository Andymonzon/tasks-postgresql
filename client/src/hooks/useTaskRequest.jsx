import { createTaskRequest, getTasksRequest, toggleTaskDoneRequest, deleteTaskRequest, updateTaskRequest, getTaskRequest } from '../api/task'
import { useState } from 'react'

export const useTaskRequest = () => {
  const [tasks, setTasks] = useState([])

  const createTask = async (task) => {
    try {
      await createTaskRequest(task)
    } catch (error) {
      console.log(error)
    }
  }

  const getTasks = async () => {
    try {
      return await getTasksRequest()
    } catch (error) {
      console.log(error)
    }
  }

  const toggleTaskDone = async (id) => {
    try {
      const taskFound = tasks.find(task => task.id === id)
      await toggleTaskDoneRequest(id, taskFound.description, taskFound.completed === false)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async (id) => {
    try {
      await deleteTaskRequest(id)
    } catch (error) {
      console.log(error)
    }
  }

  const updateTask = async (id, description, completed) => {
    try {
      await updateTaskRequest(id, description.description, completed)
    } catch (error) {
      console.log(error)
    }
  }

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id)
      return res.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    createTask,
    getTasks,
    toggleTaskDone,
    deleteTask,
    updateTask,
    setTasks,
    tasks,
    getTask
  }
}
