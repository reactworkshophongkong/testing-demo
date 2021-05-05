import React, { useEffect, useState } from 'react'

import { apiService } from './service'
import { PostForm } from './PostForm'

const PostList = () => {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    try {
      const data = await apiService.getPosts()
      setPosts(data)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  
  const postItems = posts.map(post => (
    <section className="post" data-testid="post" key={post.id}>
      <h3 data-testid="post-title">{post.title}</h3>
      <span data-testid="post-author">{post.author}</span>
    </section>
  ))

  return (
    <div className="post-list">
      <PostForm onAddPost={fetchPosts} />
      {postItems}
    </div>
  )
}

export { PostList }