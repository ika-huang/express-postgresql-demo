import { createContext, useContext, useState } from 'react'
import axios from 'axios'

const PostsContext = createContext()

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([])

  const accessToken = localStorage.getItem('accessToken')
  // actions
  const fetchPosts = async ({ page = 1, limit = 10 }) => {
    const res = await axios.get(`http://localhost:3000/posts?page=${page}&limit=${limit}`)
    // setPosts(res.data.data)
    return res.data.data
  }

  const fetchPostById = async (id) => {
    const res = await axios.get(`http://localhost:3000/posts/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  }

  const createPost = async ({ title, content }) => {
    const res = await axios.post('http://localhost:3000/posts', { title, content }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  }

  const deletePost = async (id) => {
    const res = await axios.delete(`http://localhost:3000/posts/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
    return res.data
  }

  return (
    <PostsContext.Provider value={{ posts, setPosts, fetchPosts, fetchPostById, createPost, deletePost }}>
      {children}
    </PostsContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePostsStore = () => useContext(PostsContext)
