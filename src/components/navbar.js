import React,{useEffect, useState} from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

const NavBar = () =>{

  const [user, setUser] = useState(null)
  const [userType,setUserType] = useState(null)
  const history = useHistory()

  useEffect(()=>{
    const getUserName = () =>{
      setUser(localStorage.getItem('username'))
      setUserType(localStorage.getItem('user_type'))
    }
    getUserName()
  },[user])
  
  const removeUser = () =>{
    localStorage.removeItem('username')
    localStorage.removeItem('user_type')
    setUser(null)
    window.location.reload()
  }
  const goToBooks = () =>{ 
    localStorage.setItem('currentType',"Books")
    setTimeout(() => {
        history.push('/book-list-type')
        window.location.reload()
    }, 1000);
  }

  const goToGenres = () =>{
      localStorage.setItem('currentType',"Genres")
      setTimeout(() => {
          history.push('/book-list-type')
          window.location.reload()
      }, 1000);
  }

  const goToAuthors = () =>{
      localStorage.setItem('currentType',"Authors")
      setTimeout(() => {
          history.push('/book-list-type')
          window.location.reload()
      }, 1000);
  }


    return(
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="light" className='sticky-top'>
          <Navbar.Brand href="/">
            <h3 style={{color:'white'}} >BookyMan</h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"/>
              <Nav className='bg-dark'>
                <Nav.Link className='cus-nav-item' style={{color:'white'}} href="/" >Home</Nav.Link>
                <Navbar.Text className='cus-nav-item cus-pointer' style={{color:'white'}} onClick={goToBooks} >Books</Navbar.Text>
                <Navbar.Text className='cus-nav-item cus-pointer' style={{color:'white'}} onClick={goToGenres} >Genres</Navbar.Text>
                <Navbar.Text className='cus-nav-item cus-pointer' style={{color:'white'}} onClick={goToAuthors} >Authors</Navbar.Text>
                {
                  userType != null && userType == 'admin'
                  ?
                  <Nav.Link className='cus-nav-item' style={{color:'white'}} href="/admin">Admin</Nav.Link>
                  :
                  null
                }
                {
                  user!=null
                  ?
                  <>
                    <Navbar.Text className='cus-nav-item' style={{color:'lightblue'}}>{user} </Navbar.Text>
                    <Button size='sm' className='cus-nav-button' onClick={removeUser} >Signout</Button>
                  </>
                  :
                  <Nav.Link className='cus-nav-item' style={{color:'white'}} href="/signin">Login</Nav.Link>
                }
              </Nav>
          </Navbar.Collapse>
      </Navbar>
      </>
    )
}

export default NavBar