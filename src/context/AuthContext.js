import createDataContext from './createDataContext'
import {today} from '../components/getToday'
import Api from '../api/Api'

const authReducer = (state, action) =>{

    switch(action.type){
        case 'add_email':
            return {...state, Email:action.payload}
        case 'email_exists':
            return {...state, EmailExists:action.payload}
        case 'revert_error_msg':
            return {...state, EmailExists:action.payload}
        case 'login_state':
            return {...state, LoginState:action.payload}
        case 'signin_error':
            return {...state, SigninError:action.payload}
        case 'set_username':
            return {...state, Username:action.payload}
        case 'add_error':
            return {...state, errorMessage:action.payload}
        default:
            return state
    }
}


const signup = dispatch => async(name,email,password)=>{
    try{
        const res = await Api.post('/signup',{name,email,password})
        if(res.data == "email must be unique"){
            await dispatch({type:'email_exists',payload:true})
            return
        }
        await dispatch({type:'set_username',payload:res.data.username})
        await dispatch({type:'login_state',payload:{state:"Success",username:res.data.username,email:res.data.email}})
        
    }catch(err){
        console.log((err.message))
    }
}

const signin = dispatch => async(email,password)=>{
    try{
        const res = await Api.post('/signin',{email,password})
        console.log(res.data)
        if(res.data == "Password wrong"){
            await dispatch({type:'signin_error', payload:"Incorrect password"})
            return
        }else if(res.data == "No user"){
            // console.log("User does not exist")
            await dispatch({type:'signin_error', payload:"User does not exist"})
            return
        }
        await dispatch({type:'set_username',payload:res.data.username})
        await dispatch({type:'login_state',payload:{state:"Success",username:res.data.username,email:res.data.email,user_type:res.data.user_type}})
        // console.log("Signin success")
        
    }catch(err){
        console.log((err.message))
    }
}

const revertErrorMsg = dispatch => ()=>{
    dispatch({type:'revert_error_msg',payload:false})
}

export const {Context, Provider} = createDataContext(
    authReducer,
    {
        signup,signin,revertErrorMsg
    },
    {
        EmailExists:false,LoginState:'',SigninError:'',
        Username:''
    }
)