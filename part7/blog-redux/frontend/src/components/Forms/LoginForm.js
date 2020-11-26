import React from 'react';
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => (
  <div>
    <h2>Log in to application</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <Button
          size='sm'
          id="login"
          type="submit">login</Button>
      </Form.Group>
    </Form>
  </div>
);

export default LoginForm;