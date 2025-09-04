import { useState } from 'react'
import { userCommentStore } from '../store/comments'
import { useAuthStore } from '../store/auth'

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState('')
  const { createComment } = userCommentStore()
  const { user } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      alert('請先登入才能留言')
      return
    }

    try {
      const newComment = await createComment({ id: postId, content })
      alert('留言成功！')
      onCommentAdded({...newComment, author: user.name })
      setContent('')
    } catch (err) {
      console.error(err)
      alert('留言失敗')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="輸入留言..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">送出</button>
    </form>
  )
}
