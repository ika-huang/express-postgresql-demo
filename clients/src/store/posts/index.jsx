import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000/posts'

export const usePostsStore = create((set, get) => ({
  posts: [],
  currentPost: null,
  accessToken: localStorage.getItem('accessToken'),

  setPosts: (posts) => {
    set({ posts })
  },

  fetchPosts: async ({ page = 1, limit = 10 }) => {
    const res = await axios.get(`${API_URL}?page=${page}&limit=${limit}`)
    const { data: posts } = res.data
    return posts
  },
  
  fetchPostById: async (id) => {
    const res = await axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${get().accessToken}` }
    })
    set({ currentPost: res.data })
    return res.data
  },

  createPost: async ({ title, content }) => {
    const res = await axios.post(`${API_URL}`, { title, content }, {
      headers: { Authorization: `Bearer ${get().accessToken}` }
    })
    return res.data
  },

  updatePost: async ({ id, body }) => {
    const res = await axios.put(`${API_URL}/${id}`, body, {
      headers: { Authorization: `Bearer ${get().accessToken}` }
    })
    return res.data
  },
  
  deletePost: async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${get().accessToken}` }
    })
    return res.data
  }
}))
