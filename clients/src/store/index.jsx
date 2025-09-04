import { PostsProvider } from './posts'
import { AuthProvider } from './auth'

export default function StoreProvider({ children }) {
  return (
    <AuthProvider>
      <PostsProvider>
        {children}
      </PostsProvider>
    </AuthProvider>
  )
}
