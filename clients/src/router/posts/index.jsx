import PostsPage from '../../pages/posts/PostsPage'
import PostDetailPage from '../../pages/posts/PostDetailPage'
import CreatePostPage from '../../pages/posts/CreatePostPage'

const postRoutes = [
  { index: true, element: <PostsPage /> },
  { path: 'posts/:id', element: <PostDetailPage /> },
  { path: 'posts/create', element: <CreatePostPage /> },
]

export default postRoutes
