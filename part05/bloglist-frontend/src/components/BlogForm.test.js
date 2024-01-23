import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('from calls event handler with right details when a new blog is created', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();

    const form = render(<BlogForm addBlog={createBlog} />).container;

    const titleInput = form.querySelector('#title');
    const authorInput = form.querySelector('#author');
    const urlInput = form.querySelector('#url');

    await user.type(titleInput, 'test title');
    await user.type(authorInput, 'test author');
    await user.type(urlInput, 'test url');

    screen.debug();

    const submitButton = screen.getByText('Create');
    await user.click(submitButton);

    expect(createBlog.mock.calls).toHaveLength(1);

    expect(createBlog.mock.calls[0][0].title).toBe('test title');
    expect(createBlog.mock.calls[0][0].author).toBe('test author');
    expect(createBlog.mock.calls[0][0].url).toBe('test url');
  });
});
