import blogService from '../../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'CREATE_BLOG':
      return [...state, action.data];
    case 'ADD_LIKE':
      return state.map(blog => blog.id !== action.data.id ? blog : action.data);
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content);
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    });
  };
};

export const deleteBlog = (blogID) => {
  return async dispatch => {
    await blogService.remove(blogID);
    dispatch({
      type: 'DELETE_BLOG',
      data: blogID
    });
  };
};

export const addLike = (blog) => {
  return async dispatch => {
    const blogPlusLike = await blogService.modify(blog.id, blog);
    dispatch({
      type: 'ADD_LIKE',
      data: blogPlusLike
    });
  };
};

export default reducer;