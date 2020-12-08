import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import ReactDOM from 'react-dom'
import App from './src/screens/App'
// import {Provider as AuthProvider} from './context/DataContext'

ReactDOM.render(
    // <AuthProvider>
        <App/>  
    // </AuthProvider>
    ,document.getElementById('root')
)