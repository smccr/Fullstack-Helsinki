import React from 'react'

const LoginForm = ({ username, password, handleLogin, setUsername, setPassword }) => (
  <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button
        id="login"
        type="submit">login</button>
    </form>
  </div>
)

export default LoginForm