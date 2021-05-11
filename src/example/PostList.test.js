import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'

import { PostList } from './PostList'
import { apiService } from '../service'

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

  describe('Post Form', () => {
    test('renders the form for submitting new post', async () => {
      const { queryByTestId } = render(<PostList />)

      expect(queryByTestId('post-form')).toBeInTheDocument()

      await act(() => Promise.resolve())
    })

    test('If Post form is filled and add new post is clicked calls apiService.getPosts and displays list of returned posts', async () => {
      const { queryByText, queryAllByText } = render(<PostList />)

      await waitFor(() => expect(apiService.getPosts).toHaveBeenCalledTimes(1))

      expect(queryAllByText(/Mock/)).toHaveLength(2)

      apiService.getPosts.mockResolvedValue([
        { title: 'Mock Post 1', author: 'Hon', id: '1' },
        { title: 'Another Mock Post', author: 'Hon', id: '2' },
        { title: 'Mock Post 3', author: 'Hon', id: '3' },
      ])

      fireEvent.change(screen.getByTestId('post-form-input'), {
        target: { value: 'A New Post'}
      })

      fireEvent.click(screen.getByTestId('post-form-button'))

      await waitFor(() => expect(apiService.addPost).toHaveBeenCalledTimes(1))

      expect(queryAllByText(/Mock/)).toHaveLength(3)
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
