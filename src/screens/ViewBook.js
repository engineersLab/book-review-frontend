import React, {useState, useEffect, useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import {Context as DataContext} from '../context/DataContext'
import CircularProgress from '@material-ui/core/CircularProgress';



const ViewBook = () =>{

    const {postComment,getComments,state:{Comments}} = useContext(DataContext)
    const [book,setBook] = useState('')
    const [comment, setComment] = useState('')
    const [comments,setComments] = useState([])
    const email = localStorage.getItem("email")
    const user = localStorage.getItem("username")

    const [flag, setFlag] = useState(true)
    const [commentFlag, setCommentFlag] = useState(true)
    
    useEffect(()=>{
        const initializePage = async () =>{
            setBook(JSON.parse(localStorage.getItem('currentBook')))
        }
        initializePage()
    },[comments,Comments])

    if(book.id != undefined && flag){
        getComments(book.id)
        setFlag(false)
    }

    if(Comments != 'No comments yet' && commentFlag && Comments.length>0){
        setComments(JSON.parse(Comments))
        setCommentFlag(false)
    }

    const postUserComment = () =>{
        comments.push({email,user,comment}) 
        postComment(book.id,email,user,comment)
        setTimeout(() => {
            window.location.reload()
        }, 1000);
    }
    
    if(book){
        return(
            <div className='cus-background'>
                <Navbar/>
                <div className='cus-margin row' >
                    <div className='col'>
                        <h2 className='cus-top-margin-3' >{book.book_name}</h2>
                        <p className='cus-white'><b>Author:</b> {book.author} </p>
                        <p className='cus-white'><b>Genre:</b> {book.genre} </p>
                        <p className='cus-white'><b>Description:</b> {book.description} </p>
                    </div>
                    <div className='col d-flex align-items-center justify-content-center'>
                        <div className='text-center cus-top-margin' >
                            <img src={book.image_url} height={250} width={180} />
                            <p className='cus-white cus-top-margin'>{book.book_name} </p>
                        </div>
                    </div>
                </div>
                <div className='cus-margin'>
                    <h4 className='cus-top-margin-3'>Ak's Review</h4>
                    <p  className='cus-white' dangerouslySetInnerHTML={{__html: book.review}} />
                </div>
                <div className='cus-margin'>
                    <h6 className='cus-top-margin-3'>Add your views on this book</h6>
                    {
                        user
                        ?
                        <div>
                            <Form.Group>
                                <Form.Control 
                                    className='cus-form-input' 
                                    type="text" 
                                    placeholder='Comment here' as="textarea" rows={2} 
                                    onChange={(val)=>setComment(val.target.value)} />
                            </Form.Group>
                            <Button onClick={postUserComment}>Submit</Button>
                        </div>
                        :
                        <div>
                            <p className='cus-white cus-left-margin'><Link to='/signin'>Login</Link> to post your comments </p>
                        </div>
                    }
                    
                </div>
                <div className='cus-margin'> 
                    <h6 className='cus-top-margin-3'>Comments</h6>
                        {
                            Comments.length>0 && Comments == 'No comments yet'
                            ?
                            <p className='text-center cus-white' >Be the first one to comment</p>
                            :
                            comments.map((comment,id) =>{
                                return(
                                    <div className='cus-left-margin cus-top-margin' key={id}>
                                        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                                            <div >
                                                <Avatar className='cus-no-margin'>{comment.username.charAt(0)}</Avatar>
                                            </div>
                                            <div className=' cus-left-margin'>
                                                <div>
                                                        <p className='cus-white cus-no-margin'>{comment.username} </p>
                                                    <p className='cus-white cus-no-margin' style={{fontSize:14}}>{comment.comment} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
                <Footer/>
            </div>
        )
    }else{
        return(
            <div className='cus-not-found'>
                <CircularProgress/>
            </div>
        ) 
    }
    
}

export default ViewBook