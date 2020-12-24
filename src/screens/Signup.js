import React,{useContext} from 'react'
import Navbar from '../components/navbar'
import Register from '../components/register'
import {Context as AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'


const Signup = () =>{

    const {signup,state:{EmailExists,LoginState}} = useContext(AuthContext)
    const history = useHistory()
    
    if(LoginState.state == "Success"){
        localStorage.setItem('username',LoginState.username)
        localStorage.setItem('email',LoginState.email)
        setTimeout(() => {
            history.push('/')
        }, 1000);
    }

    return(
        <div>
            <Navbar/>
            <Register type='Sign Up' bottomtext='old' callback={(username,email,password)=>signup(username,email,password)}/>
        </div>
    )

}

export default Signup