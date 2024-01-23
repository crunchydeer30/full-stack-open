import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  let likeBlog = jest.fn();
  let removeBlog = jest.fn();

  beforeEach(() => {
    const blog = {
      title: 'test blog',
      author: 'tester author',
      url: 'test url',
      likes: 10,
      user: {
        username: 'tester user',
      },
    };

    const user = {};

    container = render(
      <Blog
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        user={user}
      />
    ).container;
  });

  test('title and author are displayed by default, url and likes are hidden', () => {
    const title = screen.getByText('test blog');
    const author = screen.getByText('tester author');
    expect(title).toBeDefined();
    expect(author).toBeDefined();

    const url = screen.queryByText('test url');
    expect(url).toBe(null);
    const likes = container.querySelector('.likes');
    expect(likes).toBe(null);
  });

  test('likes and url are shown when the button is clicked', async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText('View');

    await user.click(showButton);

    const url = screen.queryByText('test url');
    expect(url).toBeDefined();
    const likes = container.querySelector('.likes');
    expect(likes).toBeDefined();
  });

  test('clicking on likes button twices causes event handler to be called twice', async () => {
    const user = userEvent.setup();
    const showButton = screen.getByText('View');
    await user.click(showButton);

    const likeButton = container.querySelector('.btn__like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeBlog.mock.calls).toHaveLength(2);
  });
});
