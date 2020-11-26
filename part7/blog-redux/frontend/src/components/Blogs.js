import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Blog from './Blog';
import CommentForm from './Forms/CommentForm';
import Comments from '../components/Comments';
import { initializeComments } from '../redux/reducers/commentReducer';


import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Table } from 'react-bootstrap';


const Blogs = ({ handleLike, handleRemove, loggedUser }) => {
  const blogs = useSelector(state => state.blog);
  const dispatch = useDispatch();

  const sortBlogs = (a, b) => {
    return b.likes - a.likes;
  };

  const match = useRouteMatch('/blogs/:id');

  return (
    <Switch>
      <Route path='/blogs/:id'>
        {match ? <ul className='blogs'>{blogs.filter(b => b.id === match.params.id).map(blog => {
          dispatch(initializeComments(blog.comments));
          return (<div key={blog.id}>
            <Blog
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
              loggedUser={loggedUser}
            />
            <h4>Comments</h4>
            <CommentForm id={blog.id} />
            <Comments id={blog.id} />
          </div>);
        }
        )}
        </ul> : null}
      </Route>
      <Route path='/'>
        <Table striped className='blogs'>
          <thead>
            <tr>
              <th>Blog name</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {blogs.sort(sortBlogs).map(blog =>
              <tr key={blog.id}>
                <td>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </td>
                <td>
                  {blog.author}
                </td>
              </tr>)}
          </tbody>
        </Table>
      </Route>
    </Switch>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func,
  loggedUser: PropTypes.object
};

export default Blogs;