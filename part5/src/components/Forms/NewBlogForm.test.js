import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'

test('Checks that the form calls the event handler with the right details', () => {
  const mockHandler = jest.fn()
  const mockMessage = jest.fn()

  const component = render(
    <NewBlogForm createBlog={mockHandler} showMessage={mockMessage}/>
  )

  const blog = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(blog, {
    target: { value: 'blogTitle' }
  })
  fireEvent.change(author, {
    target: { value: 'blogAuthor' },
  })
  fireEvent.change(url, {
    target: { value: 'www.blogurl.com' },
  })

  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('blogTitle')
  expect(mockHandler.mock.calls[0][0].author).toBe('blogAuthor')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.blogurl.com')
})