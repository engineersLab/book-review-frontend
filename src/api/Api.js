import axios from 'axios'

const instance = axios.create({
    // baseURL:"http://c598404e60b8.ngrok.io/"
    baseURL:"http://localhost:8080/"
})

export default instance