import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(create(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(update(updatedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(remove(id));
  };
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    set(state, action) {
      return action.payload;
    },
    update(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    create(state, action) {
      const newBlog = action.payload;
      return [...state, newBlog];
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { set, update, create, remove } = blogSlice.actions;
export default blogSlice.reducer;
