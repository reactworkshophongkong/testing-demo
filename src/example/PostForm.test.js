import { render, screen, waitFor, fireEvent, act } from '@testing-library/react'

import { PostForm } from './PostForm'
import { apiService } from '../service'

describe('PostForm component', () => {
  jest.spyOn(apiService, 'addPost')

  const onAddPostMock = jest.fn()

  beforeEach(() => {
    apiService.addPost.mockResolvedValue()
    jest.clearAllMocks()
  })

  test('renders input with placeholder, and onChange sets value on the input', () => {
    const utils = render(<PostForm onAddPost={onAddPostMock} />)
    const input = utils.getByPlaceholderText("Enter new post")

    fireEvent.change(input, { target: { value: 'This is a new Post' } })
    expect(input.value).toBe('This is a new Post')
  })

  test('add post button is disabled if input is not filled', async () => {
    const utils = render(<PostForm onAddPost={onAddPostMock} />)
    const input = utils.getByPlaceholderText("Enter new post")

    expect(screen.getByRole('button')).toHaveAttribute('disabled')

    fireEvent.change(input, {
      target: { value: 'A New Post'}
    })

    expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
  })

  test('when button is clicked calls addPost, and invokes prop onAddPost', async () => {
    const utils = render(<PostForm onAddPost={onAddPostMock} />)
    const input = utils.getByPlaceholderText("Enter new post")

    fireEvent.change(input, { target: { value: 'More Posts!' } })

    const button = utils.getByRole('button')

    fireEvent.click(button)
    await waitFor(() => expect(apiService.addPost).toHaveBeenCalledTimes(1))
    expect(onAddPostMock).toHaveBeenCalledTimes(1)
  })
})