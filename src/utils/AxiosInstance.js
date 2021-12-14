import axios from 'axios';

export default (BASEURL) => {
    const axiosInstance = axios.create({
        baseURL: BASEURL,
        headers: {
            'Access-Control-Allow-Origin': '*', 
            // Accept: 'application/json',
            // 'Content-Type': 'application/json',
          },
    });
    return axiosInstance;
}