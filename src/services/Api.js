import axios from 'axios'

export default axios.create({
    baseURL: 'https://api.github.com/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})