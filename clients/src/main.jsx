import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom'
import StoreProvider from './store'
// import App from './App'
// import PostsPage from './pages/posts/PostsPage'
// import PostDetailPage from './pages/posts/PostDetailPage'
// import LoginPage from './pages/auth/LoginPage'
// import RegisterPage from './pages/auth/RegisterPage'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<PostsPage />} />
          <Route path="/:id" element={<PostDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter> */}
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </React.StrictMode>
)
