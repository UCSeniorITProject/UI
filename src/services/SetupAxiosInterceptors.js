import axios from 'axios';

export default {
  setupInterceptors: (store, history) => {
      axios.interceptors.request.use(request => {
        const token = localStorage.getItem('accessToken');
        if(token){
          return request;
        }
        history.push('/auth/login');
      });

      axios.interceptors.response.use(response => response, error => {

      if (error.response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        if(refreshToken){
          try {
            const refreshedTokens = await axios.post(`${process.env.REACT_APP_API_URL}/api/security-management/user/token/refresh`,
              {
                refreshToken,
              }
            );
            localStorage.setItem('accessToken', refreshedTokens.accessToken);
            localStorage.setItem('refreshToken', refreshedTokens.refreshToken);
            error.response.config.headers['Authorization'] = `Bearer ${refreshedTokens.accessToken}`;
            return axios(error.response.config);
          } catch (err) {
            history.push('/auth/login');
            return Promise.reject(error);
          }
        }
      }
    });
  },
};