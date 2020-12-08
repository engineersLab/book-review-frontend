import React, {useState, useEffect, useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Navbar from '../components/navbar'
// import {Context as DataContext} from '../context/DataContext'


const Home = () =>{

    return(
        <div>
            <Navbar/>
            <h1>Home</h1>
        </div>
    )
}

export default Home