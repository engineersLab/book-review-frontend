import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './Home'
// import Dashboard from './Dashboard'


class App extends React.Component{
    render(){
      return(  
          <BrowserRouter>
              <Switch>
                  <Route exact path='/' component={Home}></Route>
                  {/* <Route exact path='/dashboard' component={Dashboard}></Route> */}
              </Switch>
          </BrowserRouter>
      )
    }
}
  
export default App