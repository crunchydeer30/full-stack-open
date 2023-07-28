import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    });
    dispatch(updateBlog(newBlog));
  };
};

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload;
      return state.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    },
    addBlog(state, action) {
      const newBlog = action.payload;
      return [...state, newBlog];
    },
  },
});

export const { setBlogs, updateBlog, addBlog } = blogSlice.actions;
export default blogSlice.reducer;
