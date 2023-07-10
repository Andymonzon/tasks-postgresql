import { createContext } from 'react'
import { useAuthRequest } from '../hooks/useAuthRequest'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const {
    register,
    login,
    error,
    isError,
    isAuthenticated,
    user,
    setError,
    setIsError,
    logout
  } = useAuthRequest()

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        user,
        isAuthenticated,
        error,
        isError,
        setError,
        setIsError,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  )
}
