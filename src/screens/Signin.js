import React,{useContext} from 'react'
import Navbar from '../components/navbar'
import Register from '../components/register'
import {Context as AuthContext} from '../context/AuthContext'
import {useHistory} from 'react-router-dom'


const Signin = () =>{

    const {signin,state:{LoginState}} = useContext(AuthContext)

    const history = useHistory()
    
    if(LoginState.state == "Success"){
        localStorage.setItem('username',LoginState.username)
        localStorage.setItem('email',LoginState.email)
        localStorage.setItem('user_type',LoginState.user_type)
        setTimeout(() => {
            history.push('/')
        }, 1000);
    }

    return(
        <div className='overflowx'>
            <Navbar/>
            <Register type='Sign In' bottomtext='new' callback={(email,password)=>signin(email,password)}/>
        </div>
    )

}

export default Signin