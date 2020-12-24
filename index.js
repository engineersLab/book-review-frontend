import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './src/screens/App'
import {Provider as DataProvider} from './src/context/DataContext'
import {Provider as AuthProvider} from './src/context/AuthContext'


ReactDOM.render(
    <AuthProvider>
        <DataProvider>
            <App/>  
        </DataProvider>
    </AuthProvider>
    ,document.getElementById('root')
)