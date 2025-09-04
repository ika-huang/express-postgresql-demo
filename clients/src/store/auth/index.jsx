import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const login = async ({ email, password }) => {
    const res = await axios.post('http://localhost:3000/auth/login', { email, password })
    setToken(res.data.accessToken)
    localStorage.setItem('accessToken', res.data.accessToken)
    setUser(res.data)
  }

  const register = async (email, password, name) => {
    const res = await axios.post('http://localhost:3000/auth/register', { email, password, name })
    return res.data
  }

  const logout = () => {
    setUser(null)
    setToken('')
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthStore = () => useContext(AuthContext)
