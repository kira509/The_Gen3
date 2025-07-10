import axios from "axios"

const API = axios.create({
  baseURL: "https://movieflix-backend-ikbt.onrender.com/api",
})

export default API
