import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePostsStore } from '../../store/posts'
import { useAuthStore } from '../../store/auth'

export default function CreatePostPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const { createPost } = usePostsStore()
  const { token, user } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!token) {
      alert('請先登入！')
      return
    }

    try {
      const newPost = await createPost({ title, content }, token)
      alert('文章建立成功！')
      navigate(`/posts/${newPost.id}`) // 成功後跳轉到該文章
    } catch (err) {
      console.error(err)
      alert('建立文章失敗')
    }
  }
  console.log(`user: ${user}`)
  return (
    <div>
      <h1>新增文章</h1>
      {user ? <p>登入中：{user.name}</p> : <p>尚未登入</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>標題：</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>內容：</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <button type="submit">送出</button>
      </form>
    </div>
  )
}
