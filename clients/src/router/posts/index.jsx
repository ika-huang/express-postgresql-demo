import PostsPage from '../../pages/posts/PostsPage'
import PostDetailPage from '../../pages/posts/PostDetailPage'
import CreatePostPage from '../../pages/posts/CreatePostPage'
import UpdatePostPage from '../../pages/posts/EditPostPage'

const postRoutes = [
  { index: true, element: <PostsPage /> },
  { path: 'posts/create', element: <CreatePostPage /> },
  { path: 'posts/:id', element: <PostDetailPage /> },
  { path: 'posts/:id/edit', element: <UpdatePostPage /> },
]

export default postRoutes
