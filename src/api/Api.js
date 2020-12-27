import axios from 'axios'

const instance = axios.create({
    // baseURL:"https://guarded-thicket-17286.herokuapp.com/"
    baseURL:"http://localhost:8080/"
})

export default instance