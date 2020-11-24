import React, { useEffect, useState } from 'react';
import userService from '../services/users';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService
      .getAll()
      .then(user => setUsers(user));
  }, []);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td><strong>Name</strong></td>
            <td><strong>Blogs created</strong></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                {user.name}
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default Users;