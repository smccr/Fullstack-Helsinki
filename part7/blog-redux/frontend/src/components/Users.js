import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import userService from '../services/users';
import User from './User';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService
      .getAll()
      .then(user => setUsers(user));
  }, []);

  const match = useRouteMatch('/users/:id');

  const blogByUserId = (id) => {
    return users.find((b => b.id === id));
  };

  return (
    <div>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td><strong>Blogs created</strong></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} >{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Switch>
        <Route path='/users/:id'>
          {match ? <User blogs={blogByUserId(match.params.id)} /> : null}
        </Route>
      </Switch>
    </div>
  );
};
export default Users;