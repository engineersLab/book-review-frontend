import React, {useState, useEffect, useContext} from 'react'
import {Card} from 'react-bootstrap'
import Navbar from '../components/navbar'
import {Context as DataContext} from '../context/DataContext'
import Footer from '../components/footer'
import {useHistory} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';


const Home = () =>{

    const {getBooks,getAuthors,getGenres,state:{Books,Genres,Authors}} = useContext(DataContext)
    const [loading, setLoading] = useState(true)
    const history = useHistory()
    
    useEffect(()=>{
        initializePage()
    },[])

    const initializePage = async() =>{
        await getBooks()
        await getAuthors()
        await getGenres()
    }

    if(Genres != null && Genres.length>0 && loading){
        setTimeout(() => {
            setLoading(false)
        }, 250);
    }

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

    const goToBooks = () =>{
        localStorage.setItem('currentType',"Books")
        setTimeout(() => {
            history.push('/book-list-type')
        }, 1000);
    }

    const goToGenres = () =>{
        localStorage.setItem('currentType',"Genres")
        setTimeout(() => {
            history.push('/book-list-type')
        }, 1000);
    }

    const goToAuthors = () =>{
        localStorage.setItem('currentType',"Authors")
        setTimeout(() => {
            history.push('/book-list-type')
        }, 1000);
    }

    if(loading){
        return(
            <div className='cus-not-found'>
                <CircularProgress/>
                <h6 className='cus-white cus-left-margin'>Fetching Books...</h6>
            </div>
        ) 
    }

    return(
        <div className='cus-background'>
            <Navbar/>
            <div className='cus-margin'>
                <h4 className='cus-white cus-pointer' onClick={goToBooks}>Trending Books</h4>
                <div className='cus-card-arrangement'>
                    {
                        Books!=null
                        ?
                        Books.slice(0,10).map(book =>{
                            return(
                                <Card key={book.id} className='cus-display-card cus-pointer' onClick={()=>goToBook(book)}>
                                    <div className="cus-image-dimension" >
                                        <Card.Img className='cus-image-height' variant="top" src={book.image_url} alt='Image' />
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{fontSize:17}} >{book.book_name} </Card.Title>
                                        <p style={{padding:0,margin:0,fontSize:15}}>By {book.author}</p>
                                    </Card.Body>
                                </Card>
                            )
                        })
                        :
                        null
                    }
                </div>
            </div>
            <div className='cus-margin'>
                <h4 className='cus-white cus-pointer' onClick={goToGenres} >Genres</h4>
                <div className='cus-card-arrangement'>
                    {
                        Genres!=null
                        ?
                        Genres.slice(0,10).map(genre =>{
                            return(
                                <Card key={genre.id} className='cus-display-card-genre cus-pointer' onClick={()=>goToGenre(genre.genre)}>
                                    <div className='cus-image-dimension-genre' >
                                        <Card.Img className='cus-image-height' variant="top" src={genre.image_url} alt='Image' />
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{fontSize:17, marginTop:40}}>{genre.genre} </Card.Title>
                                    </Card.Body>
                                </Card>
                            )
                        })
                        :
                        null
                    }
                </div>
            </div>
            <div className='cus-margin'>
                <h4 className='cus-white cus-pointer' onClick={goToAuthors}>Authors</h4>
                <div className='cus-card-arrangement'>
                    {
                        Authors!=null
                        ?
                        Authors.slice(0,10).map(author =>{
                            return(
                                <Card key={author.id} className='cus-display-card-genre cus-pointer' onClick={()=>goToAuthor(author.author)} >
                                    <div className='cus-image-dimension-genre' >
                                        <Card.Img className='cus-image-height' variant="top" src={author.image_url} alt='Image' />
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{fontSize:17, marginTop:40}}>{author.author} </Card.Title>
                                    </Card.Body>
                                </Card>
                            )
                        })
                        :
                        null
                    }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Home