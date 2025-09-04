import { useState } from 'react'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form)
      alert('登入成功！')
      navigate('/')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || '登入失敗')
    }
  }

  return (
    <div>
      <h1>登入</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email：</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>密碼：</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">登入</button>
      </form>
    </div>
  )
}
