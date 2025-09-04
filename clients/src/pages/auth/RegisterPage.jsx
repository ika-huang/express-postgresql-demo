import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/auth'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', age: 0, email: '', password: '', role: 'user' })
  const [error, setError] = useState(null)
  const { roles, register } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(form)
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
          <label>年齡：</label>
          <input type="number" name="age" value={form.age} onChange={handleChange} required />
        </div>
        <div>
          <label>Email：</label>
          <input type="email" name="email" min="0" max="120" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>密碼：</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <label>角色：</label>
          <select name="role" onChange={handleChange} value={form.role} required>
            {roles.map((role) =>{
              return <option value={role}>{role}</option>
             })}
          </select>
        </div>
        <button type="submit">註冊</button>
      </form>
    </div>
  )
}
