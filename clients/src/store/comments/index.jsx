import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:3000/comments'

export const userCommentStore = create((set, get) => ({
  comments: [],
  accessToken: localStorage.getItem('accessToken'),

  fetchComments: async (id) => {
    const res = await axios.get(`${API_URL}/posts/${id}`)
    const { data: comments } = res.data
    return comments
  },

  createComment: async ({ id, content }) => {
    const res = await axios.post(`${API_URL}/posts/${id}`, { content }, {
      headers: { Authorization: `Bearer ${get().accessToken}` }
    })
    return res.data
  }
}))
