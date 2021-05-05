import axios from 'axios'

const JSON_SERVER_URL = 'http://localhost:4000'

const apiService = {
  getPosts: async () => {
    const result = await axios.get(`${JSON_SERVER_URL}/posts`)
    return result.data
  },
  addPost: async ({ title, author = "Hon" }) => {
    const result = await axios.post(`${JSON_SERVER_URL}/posts`, {
      title,
      author
    })

    console.log(result.data)
    return result.data
  },
  getCommentsForPost: async (id) => {
    // to be done
  }
}

export { apiService }