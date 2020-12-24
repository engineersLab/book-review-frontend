import React, {useState, useEffect} from 'react'
import {Card} from 'react-bootstrap'
import Navbar from '../components/navbar'
import {useHistory} from 'react-router-dom'


const BookListType = () =>{

    const [type, setType] = useState('')
    const [books, setBooks] = useState([])
    const [authors, setAuthors] = useState([])
    const [genres, setGenres] = useState([])
    const history = useHistory()

    useEffect(()=>{
        const initializePage = () =>{
            setBooks(JSON.parse(localStorage.getItem('allBooks')))
            setType(localStorage.getItem('currentType'))
            setGenres(JSON.parse(localStorage.getItem('allGenres')))
            setAuthors(JSON.parse(localStorage.getItem('allAuthors')))
        }

        initializePage()
    },[])

    const goToBook = (currentBook) =>{
        localStorage.setItem('currentBook',JSON.stringify(currentBook))
        setTimeout(() => {
            history.push('/viewBook')
        }, 1000);
    }

    const goToGenre = (genreName) =>{
        localStorage.setItem('currentState',JSON.stringify({type:"genre",name:genreName}))
        setTimeout(() => {
            history.push('/book-list')
        }, 1000);
    }

    const goToAuthor = (authorName) =>{
        localStorage.setItem('currentState',JSON.stringify({type:"author",name:authorName}))
        setTimeout(() => {
            history.push('/book-list')
        }, 1000);
    }

    return(
        <div>
            <Navbar/>
          <div className='cus-margin'>
                <h4 className='cus-white cus-bottom-margin'>{type}</h4>
                <div>
                {   
                    type == 'Books'
                    ?
                    books.map(book =>{
                        return(
                            <div key={book.id} className='cus-inline-block'>
                                <Card className='cus-display-card cus-pointer' onClick={()=>goToBook(book)}>
                                    <div className="cus-image-dimension" >
                                        <Card.Img className='cus-image-height' variant="top" src={book.image_url} alt='Image' />
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{fontSize:17}} >{book.book_name} </Card.Title>
                                        <p style={{padding:0,margin:0,fontSize:15}}>By {book.author}</p>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                    :
                    type == 'Genres'
                    ?
                    genres.map(genre=>{
                        return(
                            <div key={genre.id} className='cus-inline-block' >
                                <Card className='cus-display-card-genre cus-pointer' onClick={()=>goToGenre(genre.genre)}>
                                    <div className='cus-image-dimension-genre' >
                                        <Card.Img className='cus-image-height' variant="top" src={genre.image_url} alt='Image' />
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{fontSize:17, marginTop:40}}>{genre.genre} </Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })
                    :
                    type == 'Authors'
                    ?
                    authors.map(author =>{
                        return(
                            <div key={author.id} className='cus-inline-block'>
                            <Card className='cus-display-card-genre cus-pointer' onClick={()=>goToAuthor(author.author)} >
                                <div className='cus-image-dimension-genre' >
                                    <Card.Img className='cus-image-height' variant="top" src={author.image_url} alt='Image' />
                                </div>
                                <Card.Body>
                                    <Card.Title style={{fontSize:17, marginTop:40}}>{author.author} </Card.Title>
                                </Card.Body>
                            </Card>
                            </div>
                        )
                    })
                    :
                    null
                    }
                </div>
            </div>
        </div>
    )
}

export default BookListType