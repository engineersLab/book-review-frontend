import createDataContext from './createDataContext'

const authReducer = (state, action) =>{

    switch(action.type){
        case 'add_email':
            console.log(action.payload)
            return {...state, Email:action.payload}
        default:
            return state
    }
}


const signup = dispatch => (email)=>{
    try{
        console.log(email)
        dispatch({type:'add_email',payload:email})
    }catch(err){
        console.log((err.message))
    }
}



export const {Context, Provider} = createDataContext(
    authReducer,
    {signup},
    {Email:null }
)