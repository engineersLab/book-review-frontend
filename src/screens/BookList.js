import React, {useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import Navbar from '../components/navbar'
import {useHistory} from 'react-router-dom'


const BookList = () =>{

    const [currentState, setCurrentState] = useState('')
    const [books, setBooks] = useState([])
    const history = useHistory()

    useEffect(()=>{
        const initializePage = () =>{
            setBooks(JSON.parse(localStorage.getItem('allBooks')))
            setCurrentState(JSON.parse(localStorage.getItem('currentState')))
        }
        initializePage()
    },[])

    const goToBook = (currentBook) =>{
        localStorage.setItem('currentBook',JSON.stringify(currentBook))
        setTimeout(() => {
            history.push('/viewBook')
        }, 1000);
    }

    return(
        <div className='cus-background'>
            <Navbar/>
            <div className='cus-margin'>
                <h4 style={{color:'white'}}>{currentState.name}</h4>
                <div>
                    {
                        books!=null
                        ?
                        books.map(book =>{
                            if(currentState.type == 'genre'){
                                return(
                                    <div key={book.id} className='cus-inline-block'>
                                    {
                                        book.genre==currentState.name
                                        ?
                                        <Card className='cus-display-card-list cus-pointer' onClick={()=>goToBook(book)}>
                                            <div className="cus-image-dimension" >
                                                <Card.Img className='cus-image-height' variant="top" src={book.image_url} alt='Image' />
                                            </div>
                                            <Card.Body>
                                                <Card.Title style={{fontSize:17}} >{book.book_name} </Card.Title>
                                                <p style={{padding:0,margin:0,fontSize:15}}>By {book.author}</p>
                                            </Card.Body>
                                        </Card>
                                        :
                                        null
                                    }
                                    </div>
                                )
                            }else if(currentState.type=='author'){
                                return(
                                    <div key={book.id} className='cus-inline-block'>
                                    {
                                        book.author==currentState.name
                                        ?
                                        <Card className='cus-display-card-list cus-pointer' onClick={()=>goToBook(book)}>
                                            <div className="cus-image-dimension" >
                                                <Card.Img className='cus-image-height' variant="top" src={book.image_url} alt='Image' />
                                            </div>
                                            <Card.Body>
                                                <Card.Title style={{fontSize:17}} >{book.book_name} </Card.Title>
                                                <p style={{padding:0,margin:0,fontSize:15}}>By {book.author}</p>
                                            </Card.Body>
                                        </Card>
                                        :
                                        null
                                    }
                                    </div>             
                                )
                            }
                        })
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default BookList