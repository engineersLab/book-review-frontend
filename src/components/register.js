import React,{useState,useContext} from 'react'
import {Form,Button,Toast} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Context as AuthContext} from '../context/AuthContext'


const signinImage = require('../assets/SigninImage.png')

const Register = ({type,bottomtext,callback}) =>{

    const [email,setEmail] = useState('')
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [errMsg,setErrMsg] = useState('')
    const [errorFlag,setErrorFlag] = useState(false)
    const {state:{EmailExists,SigninError}} = useContext(AuthContext)
    
    const submitForm = () =>{
        let mailFormat = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
        
        if(type == 'Sign Up' && username.length == 0){
            setErrorFlag(true)
            setErrMsg("Username cannot be empty")
            setTimeout(() => {
                setErrorFlag(false)
            }, 3000);
            return
        }

        if(password.length==0){
            setErrorFlag(true)
            setErrMsg("Please enter password")
            setTimeout(() => {
                setErrorFlag(false)
            }, 3000);
            return
        }
        
        if(mailFormat.test(email)){
            if(type == 'Sign Up'){
                callback(username,email,password)
            }else{
                callback(email,password)
            }
        }else{
            setErrorFlag(true)
            setErrMsg("Please enter a valid email address")
            setTimeout(() => {
                setErrorFlag(false)
            }, 3000);
        }
        
    }

    return(
        <div className='cus-overflow-x'>
            <div className='row align-items-center'>
                <div className='col-4'>
                    <h3 className='cus-left-margin-3 cus-white'>{type}</h3>
                    <Form className='cus-left-margin-3'>
                        {
                            type=='Sign Up'
                            ?
                            <Form.Group>
                                <Form.Label className='cus-white'>User Name</Form.Label>
                                <Form.Control className='cus-form-input' type="text" placeholder="Enter username" onChange={(val)=>setUsername(val.target.value)} />
                            </Form.Group>
                            :
                            null
                        }
                        <Form.Group>
                            <Form.Label className='cus-white' >Email address</Form.Label>
                            <Form.Control className='cus-form-input' type="email" placeholder="Enter email" onChange={(val)=>setEmail(val.target.value)} />
                            {
                                bottomtext=='old'
                                ?
                                <>
                                <Form.Text className='cus-white' className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                                {
                                    EmailExists
                                    ?
                                    <Form.Text className='cus-red'>
                                        This email address already exists. Click Login
                                    </Form.Text>
                                    :
                                    null
                                }
                                </>
                                :
                                null
                            }                        
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className='cus-white'>Password</Form.Label>
                            <Form.Control className='cus-form-input' type='password' placeholder="Password" onChange={(val)=>setPassword(val.target.value)} />
                        </Form.Group>
                        {
                            SigninError.length>0
                            ?
                            <Form.Text className='cus-red'>
                                {SigninError}
                            </Form.Text>
                            :
                            null
                        }
                        <Form.Group >
                            {
                                bottomtext=='new'
                                ? <Form.Text className='cus-white'>New User? <Link to='/signup'>Click to Register</Link></Form.Text>
                                : <Form.Text className='cus-white'>Already Registered? <Link to='/signin'>Click to Login</Link></Form.Text>
                            }
                        </Form.Group>
                            <Button variant="primary" onClick={submitForm}>
                                Submit
                            </Button>
                    </Form>
                </div>
                <div className='col-8 cus-desktop-header text-center'>
                    <img src={signinImage} className='img-fluid cus-signin-image-size' />
                </div>
            </div>
            {
                errorFlag
                ?
                <Toast className='cus-toast-body'>
                    <Toast.Body className='cus-toast-message'>{errMsg}</Toast.Body>
                </Toast>
                :
                null    
            }
        </div>
    )
}

export default Register