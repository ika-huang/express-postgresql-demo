// src/router/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import postRoutes from './posts'
import authRoutes from './auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      ...postRoutes,
      ...authRoutes
    ]
  }
])

export default router
