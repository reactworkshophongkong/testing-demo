import React from 'react'

const Post = ({ post }) => {
  return (
    <section>
      <h3>{post.title}</h3>
      <span>{post.author}</span>
    </section>
  )
}

export { Post }