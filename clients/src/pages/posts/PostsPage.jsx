import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { usePostsStore } from '../../store/posts'

export default function PostsPage() {
  const { posts, setPosts, fetchPosts } = usePostsStore()

  useEffect(() => {
    let page = 1
    let limit = 10
    let postArray = []
    const fetch = async () => {
      try {
        const result = await fetchPosts({ page, limit })
        page++
        console.log(`page : ${result.length}`)
        postArray = postArray.concat(result)
        if (result.length === limit) {
          fetch()
        } else {
          setPosts(postArray);
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetch()
  }, [])

  return (
    <div>
      <h1>文章列表</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`}>{post.title}</Link> - {post.author}
          </li>
        ))}
      </ul>
    </div>
  )
}
