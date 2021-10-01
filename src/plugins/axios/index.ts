import axios from "axios"

const _axios = axios.create({
  baseURL: 'http://localhost:5541/api'
})

export default _axios