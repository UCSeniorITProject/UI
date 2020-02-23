import axios from 'axios';

export default async (store, history) => {
      //does not matter if token is null -- this makes routes that require no token easier
      axios.interceptors.request.use(async request => {
        const token = localStorage.getItem('accessToken');
        request.headers.Authorization = `Bearer ${token}`;
        return request;
      });

      axios.interceptors.response.use(response => response, async error => {
        if(error.response.status === 401){
          history.push('/auth/login');
        }
        return error;
    });
};