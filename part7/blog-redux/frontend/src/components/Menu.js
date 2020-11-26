import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Nav, Navbar } from 'react-bootstrap';

const Menu = ({ handleLogout }) => {
  const user = useSelector(state => state.user);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>Blog app</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as='span'><Link to='/'>Blogs</Link></Nav.Link>
          <Nav.Link as='span'><Link to='/users'>Users</Link></Nav.Link>
        </Nav>
        {user && <><h5>{user.name} logged in</h5>
        <Button size='sm' onClick={handleLogout}>logout</Button></>}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu;