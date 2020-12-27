import React, {useState, useEffect, useContext} from 'react'
import {Form, Button, Row, Col, Toast} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import Navbar from '../components/navbar'
import {storage} from '../components/firebase'
import Rating from '@material-ui/lab/Rating'
import {Context as DataContext} from '../context/DataContext'
import Api from '../api/Api'
import Book from '../api/Book'


const Admin = () =>{

    const {postBook, getAllGenres,state:{AllGenres}} = useContext(DataContext)
    const [isbn, setISBN] = useState(0)
    const [bookName, setBookName] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [genre, setGenre] = useState('')
    const [description,setDescription] = useState('')
    const [review,setReview] = useState('')
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [flag, setFlag] = useState(false)
    const [isbnFlag, setIsbnFlag] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    const [userType, setUserType] = useState(null)

    useEffect(()=>{
        const initializePage = async() =>{
            await getAllGenres()
            setUserType(localStorage.getItem('user_type'))
        }
        initializePage()
    },[])


    const handleChange = e =>{
        if(e.target.files[0]){
            setImage(e.target.files[0]) 
            setFlag(true)
        }
    }

    const handleUpload = () =>{
        const uploadTask = storage.ref(`book-images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot=>{},
            error =>{
                console.log(error)
            },
            async ()=>{
                await storage.ref("book-images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        setImageUrl(url)
                    })
                    setFlag(false)
            }
        )
    }

    if(image && flag)(
        handleUpload()
    )

    const searchBook = async () =>{
        if(isbn.length==13){
            try{
                const res = await Book.get(`/volumes?q=isbn:${isbn}&key=AIzaSyBD6nbzuD7ALTdBeMgI7dFOtL1n_hpmPhA`)
                if(res.data){
                    setBookName(res.data.items[0].volumeInfo.title)
                    setAuthorName(res.data.items[0].volumeInfo.authors[0])
                    setDescription(res.data.items[0].volumeInfo.description)
                    setImageUrl(res.data.items[0].volumeInfo.imageLinks.thumbnail)

                }                
            }catch(err){
                setIsbnFlag(true)
                setErrMsg("Unable to find book with ISBN")
                setTimeout(() => {
                    setIsbnFlag(false)
                }, 3000);
            }
        }else{
            setIsbnFlag(true)
            setErrMsg("ISBN number should have 13 digits")
            setTimeout(() => {
                setIsbnFlag(false)
            }, 3000);
        }
    }
    if(userType == 'admin'){
        return(
            <div>
                <Navbar/>
                <div className='cus-margin' >
                    <h1 className='cus-blue'>Admin</h1>
                    <div className='row' >
                        <div className='col' >
                            <Form>
                                <Form.Label className='cus-white'>ISBN</Form.Label>
                                <Row className='cus-bottom-margin'>
                                    <Col>
                                        <Form.Control className='cus-form-input' placeholder="Enter ISBN" onChange={(val)=>setISBN(val.target.value)} />
                                    </Col>
                                    <Col>
                                        <Button onClick={searchBook} >Search Book</Button>
                                    </Col>
                                </Row>
                                
                                <Form.Group>
                                    <Form.Label className='cus-white'>Book Name</Form.Label>
                                    <Form.Control className='cus-form-input' type="text" value={bookName} placeholder="Enter book name" onChange={(val)=>setBookName(val.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className='cus-white'>Author</Form.Label>
                                    <Form.Control className='cus-form-input' type="text" value={authorName} placeholder="Enter author name" onChange={(val)=>setAuthorName(val.target.value)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className='cus-white'>Genre</Form.Label>
                                    <Form.Control onChange={(val)=>setGenre(val.target.value)} className='cus-form-input' as="select">
                                        {AllGenres.map(genre=>{
                                            return(
                                                <option key={genre.id} >{genre.genre} </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className='cus-white'>Description</Form.Label>
                                    <Form.Control className='cus-form-input' type="text" value={description} as="textarea" rows={3} placeholder="Description" onChange={(val)=>setDescription(val.target.value)} />
                                </Form.Group>
                            </Form>
                        </div>
                        <div className='col'>
                            <div className='d-flex justify-content-center align-items-center' >
                                {
                                    imageUrl
                                    ?
                                    <img src={imageUrl} style={{width:180, height:250}} className='img-fluid' />
                                    :
                                    <p className='cus-white' >Image preview</p>
                                }
                            </div>
                        </div>
                    </div>
                    <Form>
                            <Form.Group>
                                <Form.Label className='cus-white'>Ak's Review</Form.Label>
                                <Form.Control className='cus-form-input' type="text" value={review} as="textarea" rows={10} placeholder="Aks's Review" onChange={(val)=>setReview(val.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.File className='cus-white' label="Upload custom image" onChange={handleChange} />
                            </Form.Group>
                        </Form>
                        <Button onClick={()=>postBook(bookName, authorName, genre, description,review, imageUrl)} >Submit</Button>
                </div>
                {
                    isbnFlag
                    ?
                    <Toast className='cus-toast-body'>
                        <Toast.Body className='cus-toast-message'>{errMsg} </Toast.Body>
                    </Toast>
                    :
                    null    
                }
            </div>
        )
    }else{
        return(
            <div>
            <h3 className='cus-not-found'>Error 404! Not Found</h3>
        </div>
        )
        
    }
    
}

export default Admin