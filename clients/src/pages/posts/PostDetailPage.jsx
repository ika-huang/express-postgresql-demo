import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import axios from 'axios'
import { usePostsStore } from '../../store/posts'

export default function PostDetailPage() {
  const { id } = useParams()
  const { fetchPostById, deletePost } = usePostsStore()
  const [post, setPost] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPostById(id)
        console.log(`data`)
        setPost(data)
      } catch (err) {
        console.error(err)
      }
    }
    getPost()
  }, [fetchPostById, id])

  const deletee = async () => {
    try {
      await deletePost(id)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  if (!post) return <p>Loading...</p>
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>作者: {post.author}</p>
      <hr />
      <h3>留言</h3>
      <ul>
        {post.comments.map(c => (
          <li key={c.id}>
            {c.content} - {c.author}
          </li>
        ))}
      </ul>
      <button onClick={deletee}>刪除</button>
    </div>
  )
}
