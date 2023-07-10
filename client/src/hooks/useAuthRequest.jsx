import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

export const useAuthRequest = () => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkToken = async () => {
      const cookies = Cookies.get()

      if (cookies.token) {
        try {
          const response = await verifyTokenRequest(cookies.token)
          if (!response) return setIsAuthenticated(false)

          setIsAuthenticated(true)
          setUser(response.data)
        } catch (err) {
          setIsAuthenticated(false)
          setUser(null)
        }
      }
    }
    checkToken()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setError({}), 5000)

    return () => clearTimeout(timer)
  }, [error])

  const register = async usuario => {
    try {
      await registerRequest(usuario)
      setIsAuthenticated(true)
    } catch (err) {
      setError(err.response.data)
      setIsError(true)
      console.log(err)
    }
  }

  const login = async usuario => {
    try {
      await loginRequest(usuario)
      setIsAuthenticated(true)
    } catch (err) {
      setError(err.response.data)
      setIsError(true)
      console.log(err)
    }
  }

  const logout = async () => {
    try {
      await logoutRequest()
      setIsAuthenticated(false)
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    register,
    login,
    user,
    isAuthenticated,
    error,
    isError,
    setError,
    setIsError,
    logout
  }
}
