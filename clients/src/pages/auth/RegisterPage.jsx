import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3000/auth/register', form)
      alert('註冊成功，請登入')
      navigate('/login')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || '註冊失敗')
    }
  }

  return (
    <div>
      <h1>註冊</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>姓名：</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email：</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>密碼：</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">註冊</button>
      </form>
    </div>
  )
}
