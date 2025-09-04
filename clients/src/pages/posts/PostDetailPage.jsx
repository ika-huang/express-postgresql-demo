import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePostsStore } from '../../store/posts'
import { useAuthStore } from '../../store/auth'
import CommentForm from '../../components/CommentForm'

export default function PostDetailPage() {
  const { id } = useParams()
  const { fetchPostById, deletePost } = usePostsStore()
  const { user } = useAuthStore()
  const [post, setPost] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPostById(id)
        setPost(data)
      } catch (err) {
        console.error(err)
      }
    }
    getPost()
  }, [])

  const removePost = async () => {
    try {
      await deletePost(id)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleCommentAdded = (comment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, comment],
    }));
  };

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
      { user.role === 'admin' || post.userId === user.id ? <button onClick={removePost}>刪除</button>: <></>}
      { post.userId === user.id ? <button onClick={ () => navigate(`/posts/${id}/edit`)}>更新</button> : <></>}
      <CommentForm postId={id} onCommentAdded={handleCommentAdded} />
    </div>
  )
}
