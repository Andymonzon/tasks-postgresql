import axios from './axios.js'

export const createTaskRequest = (data) => axios.post('/task', data)

export const getTasksRequest = () => axios.get('/task')

export const toggleTaskDoneRequest = (id, description, completed) =>
    axios.put(`/task/${id}`, { description, completed })

export const deleteTaskRequest = (id) => axios.delete(`/task/${id}`)

export const getTaskRequest = (id) => axios.get(`/task/${id}`)

export const updateTaskRequest = (id, description, completed) =>
    axios.put(`/task/${id}`, { description, completed })
