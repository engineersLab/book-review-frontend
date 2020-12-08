import React from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom';


export default function NavBar(){
    return(
      <>
        <Navbar collapseOnSelect expand="md" bg="light" variant="light" className='sticky-top'>
          <Navbar.Brand href="#home">
            <h2>Book Review</h2>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"/>
              <Nav className='bg-light'>
                <Nav.Link style={{marginLeft:25, marginRight:25}} href="/">Home</Nav.Link>
                <Nav.Link style={{marginLeft:25, marginRight:25}} href="/signin">Login</Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
      </>
    )
}