import blogService from '../../services/blogs';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data;
    case 'CREATE_BLOG':
      return [...state, action.data];
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

export default reducer;