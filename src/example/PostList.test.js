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
      const utils = render(<PostList />)

      expect(utils.queryByTestId('post-form')).toBeInTheDocument()

      // without below test shows a warning
      // as the component has async action when mounting, we should wait for async to finish
      // before test completes
      await act(() => Promise.resolve())
    })

    test('If Post form is filled and add new post is clicked calls apiService.getPosts and displays list of returned posts', async () => {
      const utils = render(<PostList />)

      await waitFor(() => expect(apiService.getPosts).toHaveBeenCalledTimes(1))

      expect(utils.queryAllByText(/Mock/)).toHaveLength(2)

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

      expect(utils.queryAllByText(/Mock/)).toHaveLength(3)
    })
  })
  

  test('on mount calls apiService.getPosts and displays a list of returned posts', async () => {
    const utils  = render(<PostList />)

    await waitFor(() => expect(apiService.getPosts).toHaveBeenCalledTimes(1))


    // getBy throws an error if the test fails
    // also I think the error log is more informative, i would default to using getby
    
    // expect(utils.queryByText('Does not exist')).toBeInTheDocument()
    // expect(utils.getByText('Does not exist')).toBeInTheDocument()

    expect(utils.queryByText('Mock Post 1')).toBeInTheDocument()
    expect(utils.queryByText('Another Mock Post')).toBeInTheDocument()

    expect(utils.queryAllByText(/Mock/)).toHaveLength(2)
  })
})
