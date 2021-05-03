import React, { useEffect, useState } from 'react'

import { apiService } from './service'
import { Post } from './Post'
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
  
  const postItems = posts.map(post => <Post key={post.id} post={post}/>)

  return (
    <>
      <PostForm onAddPost={fetchPosts} />
      {postItems}
    </>
  )
}

export { PostList }