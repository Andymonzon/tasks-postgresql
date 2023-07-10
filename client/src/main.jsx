import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { TaskContextProvider } from './context/TaskContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <TaskContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TaskContextProvider>
    </AuthProvider>
  </React.StrictMode>
)
