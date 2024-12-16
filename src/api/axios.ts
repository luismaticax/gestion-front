import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/' // Base URL for your API
    //,withCredentials: true, // Include cookies in requests
});

export default instance;