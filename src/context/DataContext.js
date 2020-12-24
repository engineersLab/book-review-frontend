import createDataContext from './createDataContext'
import {today} from '../components/getToday'
import Api from '../api/Api'

const dataReducer = (state, action) =>{

    switch(action.type){
        case 'add_email':
            console.log(action.payload)
            return {...state, Email:action.payload}
        case 'get_books':
            return {...state, Books:action.payload}
        case 'get_genres':
            return {...state, Genres:action.payload}
        case 'get_authors':
            return {...state, Authors:action.payload}
        case 'get_all_genres':
            return {...state, AllGenres:action.payload}
        case 'set_current_state':
            return {...state, CurrentState:action.payload}
        case 'set_comments':
            return {...state, Comments:action.payload}
        case 'add_error':
            return {...state, errorMessage:action.payload}
        default:
            return state
    }
}

const getBooks = dispatch => async()=>{

    try{
        await Api.post('/getBooks')
        .then(async (res)=>{
            await dispatch({type:'get_books',payload:res.data.result})
            localStorage.setItem('allBooks',JSON.stringify(res.data.result))
        })
        .catch(err=>{
            console.log(err)
        })
        
    }catch(err) {
        // dispatch({type:'add_error', payload:'Something went wrong'})
        console.log("Error",err.message)
    }
}

const getGenres = dispatch => async()=>{
    try{
        await Api.get('/getGenres')
        .then(async (res)=>{
            await dispatch({type:'get_genres',payload:res.data.result})
            localStorage.setItem('allGenres',JSON.stringify(res.data.result))
        })
        .catch(err=>{
            console.log(err)
        })
        
    }catch(err) {
        // dispatch({type:'add_error', payload:'Something went wrong'})
        console.log("Error",err.message)
    }
}

const getAllGenres = dispatch => async()=>{
    try{
        await Api.get('/getAllGenres')
        .then(async (res)=>{
            await dispatch({type:'get_all_genres',payload:res.data.result})
            localStorage.setItem('genresList',JSON.stringify(res.data.result))
        })
        .catch(err=>{
            console.log(err)
        })
        
    }catch(err) {
        // dispatch({type:'add_error', payload:'Something went wrong'})
        console.log("Error",err.message)
    }
}

const getAuthors = dispatch => async()=>{
    try{
        await Api.get('/getAuthors')
        .then(async (res)=>{
            await dispatch({type:'get_authors',payload:res.data.result})
            localStorage.setItem('allAuthors',JSON.stringify(res.data.result))
        })
        .catch(err=>{
            console.log(err)
        })
        
    }catch(err) {
        // dispatch({type:'add_error', payload:'Something went wrong'})
        console.log("Error",err.message)
    }
}

const postBook = dispatch => async (book_name, author, genre, description,review, image_url) =>{
    
    try{
        const res = await Api.post('/postBook',{book_name, author, genre, description, review, image_url})
        console.log(res)
    }catch(err){
        console.log(err.message)
    }
}

const postComment = dispatch => async(bookId,email,username,comment) =>{
    try{
        console.log(bookId,email,comment)
        const res = await Api.post('/postComment',{id:bookId,email,username,comment})
    }catch(err){
        console.log(err.message)
    }
}

const getComments = dispatch => async(bookId) =>{
    try{
        console.log(bookId)
        const res = await Api.post('/getComments',{id:bookId})
        console.log(res.data)
        dispatch({type:'set_comments',payload:res.data.result})
        
    }catch(err){
        console.log(err.message)
    }
}

const setCurrentState = dispatch => async(currentState)=>{
    try{
        await dispatch({type:'set_current_state', payload:currentState})
    }catch(err){
        console.log(err.message)
    }
}

export const {Context, Provider} = createDataContext(
    dataReducer,
    {
        postBook, getBooks, getAuthors, getGenres, setCurrentState,
        getAllGenres, postComment, getComments
    },
    {
        Email:null, errorMessage:null, Books:[], Genres:[], Authors:[],
        AllGenres:[], CurrentState:{}, Comments:[]
    }
)