import React, { useState } from 'react'

import { apiService } from './service'

const PostForm = ({ onAddPost }) => {
  const [value, setValue] = useState('')
  const disabled = value === ''

  const handleAddPost = async () => {
    try {
      await apiService.addPost({ title: value })
      await onAddPost()
      setValue('')
    } catch(error) {
      console.log(error)
    }
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <section className="post-form">
      <input
        type="text" 
        className="text-input" 
        value={value} 
        placeholder="Enter new post..."
        onChange={handleChange}
      />
      <button disabled={disabled} className="button" onClick={handleAddPost}>Add New Post</button>
    </section>
  )

}

export { PostForm }