import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePostsStore } from '../../store/posts'

export default function EditPostPage() {
  const { id } = useParams()
  const { currentPost, updatePost } = usePostsStore()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    setTitle(currentPost.title)
    setContent(currentPost.content)
  }, [currentPost])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = {}
      if (title !== currentPost.title) {
        body.title = title
      }
      if (content !== currentPost.content) {
        body.content = content
      }
      await updatePost({ id, body })
      alert('文章更新成功！')
      navigate(`/posts/${id}`)
    } catch (err) {
      console.error(err)
      alert('更新失敗')
    }
  }

  if (!currentPost) return <p>載入中...</p>

  return (
    <div>
      <h1>編輯文章</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>標題：</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>內容：</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">更新</button>
      </form>
    </div>
  )
}
