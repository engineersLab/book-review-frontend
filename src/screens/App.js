import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Admin from './Admin'
import ViewBook from './ViewBook'
import BookList from './BookList'
import BookListType from './BookListType'
import Signup from './Signup'
import Signin from './Signin'


class App extends React.Component{

    NoMatchPage = () => {
        return (
            <h3 className='cus-not-found'>Error 404 - Requested page not found</h3>
        );
    };
    render(){
      return(  
          <BrowserRouter>
              <Switch>
                  <Route exact path='/' component={Home}></Route>
                  <Route exact path='/admin' component={Admin}></Route>
                  <Route exact path='/viewBook' component={ViewBook}></Route>
                  <Route exact path='/book-list' component={BookList}></Route>
                  <Route exact path='/book-list-type' component={BookListType}></Route>
                  <Route exact path='/signup' component={Signup}></Route>
                  <Route exact path='/signin' component={Signin}></Route>
                  <Route component={this.NoMatchPage}/>
              </Switch>
          </BrowserRouter>
      )
    }
}
  
export default App