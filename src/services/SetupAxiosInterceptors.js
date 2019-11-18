import axios from 'axios';

export default async (store, history) => {
      //does not matter if token is null -- this makes routes that require no token easier
      axios.interceptors.request.use(async request => {
        const token = localStorage.getItem('accessToken');
        request.headers.Authorization = `Bearer ${token}`;
        return request;
      });

      axios.interceptors.response.use(response => response, async error => {
        if(error.config.url === `${process.env.REACT_APP_API_URL}/api/security-management/user/token/refresh`){
          return Promise.resolve();
        }
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
};