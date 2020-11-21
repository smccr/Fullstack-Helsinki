import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const newBlog = {
  title: 'testTitle',
  author: 'testAuthor',
  url: 'www.testurl.com',
  likes: 1,
  user: {
    username: 'testUsername',
    name: 'testName'
  }
};

const user = {
  username: 'testUsername',
  name: 'testName'
};

describe('Check that <Blog /> renders the title and author, but not its url or likes by default', () => {

  let component;

  beforeEach(() => {
    component = render(
      <Blog blog={newBlog} loggedUser={user} />
    );
  });

  test('title', () => {
    expect(component.container).toHaveTextContent('testTitle');
  });

  test('author', () => {
    expect(component.container).toHaveTextContent('testAuthor');
  });

  test('url', () => {
    expect(component.container).not.toHaveTextContent('www.testurl.com');
  });

  test('likes', () => {
    expect(component.container).not.toHaveTextContent('1');
  });
});

describe('Checks the blog\'s url and likes are shown when the button is clicked', () => {

  let component;

  beforeEach(() => {
    component = render(
      <Blog blog={newBlog} loggedUser={user} />
    );
  });

  test('title', () => {
    expect(component.container).toHaveTextContent('testTitle');
  });

  test('author', () => {
    expect(component.container).toHaveTextContent('testAuthor');
  });

  test('url', () => {
    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent('www.testurl.com');
  });

  test('likes', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    expect(component.container).toHaveTextContent('1');
  });
});

describe('If like button is clicked twice, the event handler is called twice', () => {

  test('like button', () => {
    const mockHandler = jest.fn();
    const component = render(
      <Blog blog={newBlog} loggedUser={user} handleLike={mockHandler}/>
    );
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});