import axios from "axios";


const  Apis = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})
export default Apis;