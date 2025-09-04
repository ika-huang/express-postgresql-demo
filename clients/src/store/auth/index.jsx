import { create } from 'zustand'
import { persist } from "zustand/middleware";
import axios from 'axios'

const API_URL = 'http://localhost:3000/auth'

export const useAuthStore = create(persist((set) => ({
  user: localStorage.getItem('user') || null,
  token: localStorage.getItem('token') || '',
  roles: ['user', 'admin'],

  login: async ({ email, password }) => {
    const res = await axios.post(`${API_URL}/login`, { email, password })
    set({ user: res.data, token: res.data.accessToken })
    localStorage.setItem('accessToken', res.data.accessToken)
    localStorage.setItem('user', res.data)
  },

  register: async ({ email, password, name, age }) => {
    const res = await axios.post(`${API_URL}/register`, { email, password, name, age })
    return res.data
  },

  logout: () => {
    set({ user: null, token: null })
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
})))
