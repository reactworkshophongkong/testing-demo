import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'

import { PostList } from './PostList'
import { apiService } from '../service'

jest.mock('./PostForm', () => ({
  PostForm: () => <div>Stubbed Post Form</div>
}))

jest.spyOn(apiService, 'getPosts')
jest.spyOn(apiService, 'addPost')

describe('PostList Component', () => {
  beforeEach(() => {
    apiService.getPosts.mockResolvedValue([
      { title: 'Mock Post 1', author: 'Hon', id: '1' },
      { title: 'Another Mock Post', author: 'Hon', id: '2' },
    ])
    apiService.addPost.mockResolvedValue()

    jest.clearAllMocks()
  })

  // stub out the child
  // just assert child is rendered
  // have unit test for PostForm
  describe('Post Form', () => {
    test('renders the form for submitting new post', async () => {
      const utils = render(<PostList />)

      expect(utils.getByText('Stubbed Post Form')).toBeInTheDocument()

      await act(() => Promise.resolve())
    })
  })
  

  test('on mount calls apiService.getPosts and displays a list of returned posts', async () => {
    const { queryByText, queryAllByText } = render(<PostList />)

    await waitFor(() => expect(apiService.getPosts).toHaveBeenCalledTimes(1))

    expect(queryByText('Mock Post 1')).toBeInTheDocument()
    expect(queryByText('Another Mock Post')).toBeInTheDocument()

    expect(queryAllByText(/Mock/)).toHaveLength(2)
  })
})
