import { Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './page/Login'
import { Register } from './page/Register'
import LayoutRegister from './components/LayoutRegister'
import { Cursor } from './components/Cursor'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuthContext'
import { Home } from './page/Home'
import { CreateTask } from './page/CreateTask'
import { ShowTask } from './page/ShowTask'

function App () {
  const { setError, setIsError } = useAuth()
  const location = useLocation()

  useEffect(() => {
    setError({})
    setIsError(false)
  }, [location.pathname])

  return (
    <>
      <Cursor />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/:numPage' element={<Home />} />
          <Route path='/createTask' element={<CreateTask />} />
          <Route path='/edit/:id' element={<CreateTask />} />
          <Route path='/showTask/:id' element={<ShowTask/>}/>
        </Route>

        <Route element={<LayoutRegister />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Route>
      </Routes >
    </>
  )
}

export default App
